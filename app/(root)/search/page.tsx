"use client";

import Link from "next/link";
import { useEffect, useMemo, useState, useCallback } from "react";
import { SearchIcon, SlidersHorizontal, Star, StarOff, X, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DASHBOARD_STOCKS, STOCK_SECTORS, DashboardStock } from "@/lib/constants";
import { useWatchlist } from "@/hooks/useWatchlist";
import { formatINRCurrency } from "@/lib/utils";

type SortMode = "relevance" | "gainers" | "losers" | "market-cap";
type SectorFilter = (typeof STOCK_SECTORS)[number];
type SearchFilters = {
  query: string;
  sector: SectorFilter;
  sortMode: SortMode;
  watchlistOnly: boolean;
};

const DEFAULT_FILTERS: SearchFilters = {
  query: "",
  sector: "All",
  sortMode: "relevance",
  watchlistOnly: false,
};

const SORT_MODES: SortMode[] = ["relevance", "gainers", "losers", "market-cap"];

const isValidSectorFilter = (value: string | null): value is SectorFilter =>
  !!value && STOCK_SECTORS.includes(value as SectorFilter);

const isValidSortMode = (value: string | null): value is SortMode =>
  !!value && SORT_MODES.includes(value as SortMode);

const getInitialFilters = (): SearchFilters => {
  if (typeof window === "undefined") return DEFAULT_FILTERS;

  const searchParams = new URLSearchParams(window.location.search);
  const urlQuery = searchParams.get("q")?.trim() ?? "";
  const urlSector = searchParams.get("sector");
  const urlSortMode = searchParams.get("sort");

  return {
    query: urlQuery,
    sector: isValidSectorFilter(urlSector) ? urlSector : "All",
    sortMode: isValidSortMode(urlSortMode) ? urlSortMode : "relevance",
    watchlistOnly: searchParams.get("watchlist") === "1",
  };
};

const SearchPage = () => {
  const [filters, setFilters] = useState<SearchFilters>(getInitialFilters);
  const [dashboardStocks, setDashboardStocks] = useState<DashboardStock[]>(DASHBOARD_STOCKS);
  const [isSearching, setIsSearching] = useState(false);
  const { watchlistSymbols, watchlistSet, toggleWatchlistSymbol } = useWatchlist();

  const { query, sector, sortMode, watchlistOnly } = filters;

  // Debounce logic for the dynamic search
  const [debouncedQuery, setDebouncedQuery] = useState(query);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedQuery(query), 500);
    return () => clearTimeout(timer);
  }, [query]);

  // Fetch stocks based on the debounced query
  useEffect(() => {
    const fetchStocks = async () => {
      setIsSearching(true);
      try {
        let endpoint = "/api/stocks"; // Default market overview
        if (debouncedQuery.trim()) {
          endpoint = `/api/search?q=${encodeURIComponent(debouncedQuery.trim())}`;
        }
        
        const res = await fetch(endpoint);
        const data = await res.json();
        
        if (data.success && data.data) {
          setDashboardStocks(data.data);
        }
      } catch (err) {
        console.error("Error fetching live stocks:", err);
      } finally {
        setIsSearching(false);
      }
    };

    fetchStocks();
  }, [debouncedQuery]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    if (query.trim()) {
      params.set("q", query.trim());
    } else {
      params.delete("q");
    }

    if (sector !== "All") {
      params.set("sector", sector);
    } else {
      params.delete("sector");
    }

    if (sortMode !== "relevance") {
      params.set("sort", sortMode);
    } else {
      params.delete("sort");
    }

    if (watchlistOnly) {
      params.set("watchlist", "1");
    } else {
      params.delete("watchlist");
    }

    const queryString = params.toString();
    const nextUrl = queryString
      ? `${window.location.pathname}?${queryString}`
      : window.location.pathname;

    window.history.replaceState(null, "", nextUrl);
  }, [query, sector, sortMode, watchlistOnly]);

  const updateFilters = (updates: Partial<SearchFilters>) => {
    setFilters((previousFilters) => ({
      ...previousFilters,
      ...updates,
    }));
  };

  const resetFilters = () => {
    setFilters(DEFAULT_FILTERS);
  };

  const hasActiveFilters =
    query.length > 0 ||
    sector !== "All" ||
    sortMode !== "relevance" ||
    watchlistOnly;

  const filteredStocks = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    const matchingStocks = dashboardStocks.filter((stock) => {
      const sectorMatched = sector === "All" || stock.sector === sector || !stock.sector;
      const watchlistMatched = !watchlistOnly || watchlistSet.has(stock.symbol);
      
      // Dynamic search handles query matching on the backend for non-watchlist stocks.
      // But if we are in watchlist-only mode, we might need to filter client-side.
      const queryMatched = 
        !normalizedQuery || 
        stock.symbol.toLowerCase().includes(normalizedQuery) ||
        stock.company.toLowerCase().includes(normalizedQuery);

      return sectorMatched && watchlistMatched && queryMatched;
    });

    if (sortMode === "gainers") {
      return [...matchingStocks].sort((a, b) => b.changePercent - a.changePercent);
    }

    if (sortMode === "losers") {
      return [...matchingStocks].sort((a, b) => a.changePercent - b.changePercent);
    }

    if (sortMode === "market-cap") {
      return [...matchingStocks].sort((a, b) => b.marketCapValue - a.marketCapValue);
    }

    if (!normalizedQuery) {
      return matchingStocks;
    }

    return [...matchingStocks].sort((a, b) => {
      const aStartsWith = a.symbol.toLowerCase().startsWith(normalizedQuery) ? 1 : 0;
      const bStartsWith = b.symbol.toLowerCase().startsWith(normalizedQuery) ? 1 : 0;
      return bStartsWith - aStartsWith;
    });
  }, [query, sector, sortMode, watchlistOnly, watchlistSet, dashboardStocks]);

  const averageMove = useMemo(() => {
    if (!filteredStocks.length) return 0;
    const total = filteredStocks.reduce((sum, stock) => sum + stock.changePercent, 0);
    return total / filteredStocks.length;
  }, [filteredStocks]);

  const watchlistHits = useMemo(
    () => filteredStocks.filter((stock) => watchlistSet.has(stock.symbol)).length,
    [filteredStocks, watchlistSet],
  );

  return (
    <div className="space-y-8 pb-8">
      <section className="relative overflow-hidden rounded-3xl border border-gray-700/50 bg-[#0a0a0a] p-6 md:p-8">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(15,237,190,0.2),transparent_45%)]" />
        <div className="pointer-events-none absolute -bottom-24 -left-10 h-48 w-48 rounded-full bg-yellow-500/10 blur-3xl" />

        <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-3">
            <p className="inline-flex items-center gap-2 rounded-full border border-teal-500/30 bg-teal-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-teal-300">
              Discover Opportunities
            </p>
            <h1 className="text-3xl font-bold text-gray-100 md:text-4xl">
              Stock Search
            </h1>
            <p className="max-w-2xl text-sm text-gray-400 md:text-base">
              Filter the most active Indian equities by sector, momentum, and market cap.
              Add promising names directly to your watchlist.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-3 lg:w-[540px]">
            <div className="rounded-xl border border-gray-700/60 bg-gray-800/60 p-4">
              <p className="text-xs uppercase tracking-[0.18em] text-gray-500">Results</p>
              <p className="mt-1 text-2xl font-semibold text-gray-100">{filteredStocks.length}</p>
            </div>
            <div className="rounded-xl border border-gray-700/60 bg-gray-800/60 p-4">
              <p className="text-xs uppercase tracking-[0.18em] text-gray-500">Avg Move</p>
              <p
                className={`mt-1 text-2xl font-semibold ${
                  averageMove >= 0 ? "text-teal-400" : "text-red-400"
                }`}
              >
                {averageMove >= 0 ? "+" : ""}
                {averageMove.toFixed(2)}%
              </p>
            </div>
            <div className="rounded-xl border border-gray-700/60 bg-gray-800/60 p-4">
              <p className="text-xs uppercase tracking-[0.18em] text-gray-500">Saved Hits</p>
              <p className="mt-1 text-2xl font-semibold text-gray-100">{watchlistHits}</p>
              <p className="mt-1 text-xs text-gray-500">Matches in your watchlist</p>
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-gray-700/50 bg-[#0a0a0a] p-4 md:p-5">
        <div className="grid gap-4 lg:grid-cols-[1.4fr_0.8fr_0.8fr]">
          <label className="relative block">
            <span className="sr-only">Search stocks</span>
            <div className="relative">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
              <Input
                type="text"
                placeholder="Search companies, symbols, or indices..."
                value={query}
                onChange={(e) => updateFilters({ query: e.target.value })}
                className="h-12 w-full rounded-full border-gray-700 bg-gray-800/80 pl-12 pr-4 text-gray-100 placeholder:text-gray-500 focus-visible:ring-1 focus-visible:ring-teal-500"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => updateFilters({ query: "" })}
                  className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full p-1 text-gray-400 hover:bg-gray-700 hover:text-gray-200"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          </label>

          <Select
            value={sector}
            onValueChange={(value) => updateFilters({ sector: value as SectorFilter })}
          >
            <SelectTrigger className="h-11 w-full border-gray-700/70 bg-gray-800/70 text-gray-100">
              <SelectValue placeholder="Filter by sector" />
            </SelectTrigger>
            <SelectContent className="border-gray-700/70 bg-gray-800 text-gray-100">
              {STOCK_SECTORS.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={sortMode} onValueChange={(value) => updateFilters({ sortMode: value as SortMode })}>
            <SelectTrigger className="h-11 w-full border-gray-700/70 bg-gray-800/70 text-gray-100">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="h-4 w-4 text-gray-400" />
                <SelectValue placeholder="Sort" />
              </div>
            </SelectTrigger>
            <SelectContent className="border-gray-700/70 bg-gray-800 text-gray-100">
              <SelectItem value="relevance">Relevance</SelectItem>
              <SelectItem value="gainers">Top Gainers</SelectItem>
              <SelectItem value="losers">Top Losers</SelectItem>
              <SelectItem value="market-cap">Largest Market Cap</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <Button
            type="button"
            variant={watchlistOnly ? "secondary" : "outline"}
            onClick={() => updateFilters({ watchlistOnly: !watchlistOnly })}
            className={`h-9 cursor-pointer border-gray-700 text-sm ${
              watchlistOnly
                ? "bg-teal-500/10 text-teal-300 hover:bg-teal-500/20"
                : "bg-gray-800 text-gray-200 hover:bg-gray-700"
            }`}
          >
            <Star className="mr-2 h-4 w-4" />
            {watchlistOnly ? "Showing Saved Only" : "Saved Stocks Only"}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={resetFilters}
            disabled={!hasActiveFilters}
            className="h-9 cursor-pointer border-gray-700 bg-gray-800 text-gray-200 hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            Reset Filters
          </Button>
        </div>
      </section>

      {isSearching ? (
        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-64 rounded-2xl border border-gray-700/50 bg-[#0a0a0a] p-5 shadow-xl animate-pulse">
              <div className="h-4 w-12 bg-gray-800 rounded mb-4"></div>
              <div className="h-6 w-3/4 bg-gray-800 rounded mb-2"></div>
              <div className="h-4 w-1/2 bg-gray-800 rounded mb-8"></div>
              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="h-16 bg-gray-800 rounded-xl"></div>
                <div className="h-16 bg-gray-800 rounded-xl"></div>
              </div>
              <div className="h-10 bg-gray-800 rounded-lg w-full"></div>
            </div>
          ))}
        </section>
      ) : filteredStocks.length ? (
        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filteredStocks.map((stock) => {
            const isInWatchlist = watchlistSet.has(stock.symbol);
            const changeClass = stock.changePercent >= 0 ? "text-teal-400" : "text-red-400";

            return (
              <article
                key={stock.symbol}
                className="group rounded-2xl border border-gray-700/50 bg-[#0a0a0a] shadow-xl transition-all hover:border-teal-500/40 hover:-translate-y-1 relative"
              >
                <Link href={`/stock/${encodeURIComponent(stock.symbol)}`} className="absolute inset-0 z-0" />
                <div className="p-5 relative z-10 flex flex-col h-full pointer-events-none">
                  <div className="flex items-start justify-between gap-3 pointer-events-auto">
                    <Link href={`/stock/${encodeURIComponent(stock.symbol)}`} className="flex-1">
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">
                        {stock.exchange}
                      </p>
                      <h2 className="mt-1 text-xl font-semibold text-gray-100 group-hover:text-teal-400 transition-colors">{stock.symbol}</h2>
                      <p className="mt-1 text-sm text-gray-400 line-clamp-1">{stock.company}</p>
                    </Link>

                    <span className="rounded-full border border-gray-700/70 bg-gray-800 px-2.5 py-1 text-xs text-gray-300">
                      {stock.sector}
                    </span>
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-3 pointer-events-none">
                    <div className="rounded-xl bg-gray-800/70 p-3">
                      <p className="text-xs uppercase tracking-[0.16em] text-gray-500">Price</p>
                      <p className="mt-1 text-lg font-semibold text-gray-100">
                        {formatINRCurrency(stock.price)}
                      </p>
                    </div>
                    <div className="rounded-xl bg-gray-800/70 p-3">
                      <p className="text-xs uppercase tracking-[0.16em] text-gray-500">Daily Change</p>
                      <p className={`mt-1 text-lg font-semibold ${changeClass}`}>
                        {stock.changePercent >= 0 ? "+" : ""}
                        {stock.changePercent.toFixed(2)}%
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-between text-sm text-gray-400 pointer-events-none">
                    <span>Market Cap {stock.marketCapLabel}</span>
                    <span>P/E {stock.peRatio}</span>
                  </div>

                  <Button
                    type="button"
                    onClick={() => toggleWatchlistSymbol(stock.symbol)}
                    variant={isInWatchlist ? "secondary" : "outline"}
                    className={`mt-4 h-10 w-full cursor-pointer pointer-events-auto border-gray-700 text-sm font-medium ${
                      isInWatchlist
                        ? "bg-teal-500/10 text-teal-300 hover:bg-teal-500/20"
                        : "bg-gray-800 text-gray-200 hover:bg-gray-700"
                    }`}
                  >
                    {isInWatchlist ? (
                      <StarOff className="mr-2 h-4 w-4" />
                    ) : (
                      <Star className="mr-2 h-4 w-4" />
                    )}
                    {isInWatchlist ? "Remove from Watchlist" : "Add to Watchlist"}
                  </Button>
                </div>
              </article>
            );
          })}
        </section>
      ) : (
        <section className="rounded-2xl border border-gray-700/50 bg-[#0a0a0a] p-10 text-center">
          <h3 className="text-xl font-semibold text-gray-100">No matching stocks found</h3>
          <p className="mt-2 text-gray-400">
            Try a different symbol, company name, or sector filter.
          </p>
        </section>
      )}

      <section className="rounded-2xl border border-gray-700/50 bg-[#0a0a0a] p-5 md:p-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-100">Review Saved Picks</h3>
            <p className="text-sm text-gray-400">
              {watchlistSymbols.length} stocks currently saved to your watchlist.
            </p>
          </div>
          <Link href="/watchlist">
            <Button className="h-10 cursor-pointer bg-teal-500 text-gray-950 hover:bg-teal-400">
              Open Watchlist
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default SearchPage;
