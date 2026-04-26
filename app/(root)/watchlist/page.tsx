"use client";

import Link from "next/link";
import { useMemo, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import TradingViewWidget from "@/components/TradingViewWidget";
import { DASHBOARD_STOCKS_BY_SYMBOL, type DashboardStock } from "@/lib/constants";
import { Star, Trash2, TrendingUp } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useWatchlist } from "@/hooks/useWatchlist";
import { formatINRCurrency } from "@/lib/utils";

const scriptBase = "https://s3.tradingview.com/external-embedding/embed-widget-";
type WatchlistSortMode = "manual" | "gainers" | "losers" | "market-cap";

const WatchlistPage = () => {
  const [sortMode, setSortMode] = useState<WatchlistSortMode>("manual");
  const [dashboardStocks, setDashboardStocks] = useState<DashboardStock[]>([]);
  const { watchlistSymbols, removeWatchlistSymbol, clearWatchlist } = useWatchlist();

  useEffect(() => {
    if (!watchlistSymbols.length) {
      setDashboardStocks([]);
      return;
    }

    const endpoint = `/api/stocks?symbols=${encodeURIComponent(watchlistSymbols.join(","))}`;
    
    fetch(endpoint)
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data) {
          setDashboardStocks(data.data);
        }
      })
      .catch((err) => console.error("Error fetching live stocks:", err));
  }, [watchlistSymbols]);


  const watchlistStocks = useMemo(() => {
    if (!dashboardStocks.length) return [];
    const stockMap = new Map(dashboardStocks.map(stock => [stock.symbol, stock]));
    return watchlistSymbols
      .map((symbol) => stockMap.get(symbol))
      .filter((stock): stock is DashboardStock => !!stock);
  }, [watchlistSymbols, dashboardStocks]);

  const averageMove = useMemo(() => {
    if (!watchlistStocks.length) return 0;
    const total = watchlistStocks.reduce((sum, stock) => sum + stock.changePercent, 0);
    return total / watchlistStocks.length;
  }, [watchlistStocks]);

  const combinedMarketCap = useMemo(() => {
    const total = watchlistStocks.reduce((sum, stock) => sum + stock.marketCapValue, 0);
    return `${total.toFixed(2)}T`;
  }, [watchlistStocks]);

  const bestPerformer = useMemo(() => {
    if (!watchlistStocks.length) return null;

    return watchlistStocks.reduce((winner, stock) =>
      stock.changePercent > winner.changePercent ? stock : winner,
    );
  }, [watchlistStocks]);

  const worstPerformer = useMemo(() => {
    if (!watchlistStocks.length) return null;

    return watchlistStocks.reduce((loser, stock) =>
      stock.changePercent < loser.changePercent ? stock : loser,
    );
  }, [watchlistStocks]);

  const displayedWatchlistStocks = useMemo(() => {
    if (sortMode === "gainers") {
      return [...watchlistStocks].sort((a, b) => b.changePercent - a.changePercent);
    }

    if (sortMode === "losers") {
      return [...watchlistStocks].sort((a, b) => a.changePercent - b.changePercent);
    }

    if (sortMode === "market-cap") {
      return [...watchlistStocks].sort((a, b) => b.marketCapValue - a.marketCapValue);
    }

    return watchlistStocks;
  }, [watchlistStocks, sortMode]);

  const tickerTapeConfig = useMemo(
    () => ({
      symbols: displayedWatchlistStocks.map((stock) => {
        const cleanSymbol = stock.symbol.replace('.NS', '').replace('.BO', '');
        const proName = `BSE:${cleanSymbol}`;
        return {
          proName,
          title: cleanSymbol,
        };
      }),
      showSymbolLogo: true,
      isTransparent: true,
      displayMode: "adaptive",
      colorTheme: "dark",
      locale: "en",
    }),
    [displayedWatchlistStocks],
  );

  return (
    <div className="space-y-5 pb-8">
      {/* Hero Header */}
      <section className="relative overflow-hidden rounded-2xl border border-gray-800/60 bg-[#090909] px-6 py-6 shadow-xl">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(88,98,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(88,98,255,0.03)_1px,transparent_1px)] bg-[size:32px_32px]" />
        <div className="pointer-events-none absolute top-0 right-0 h-full w-1/3 bg-[radial-gradient(ellipse_at_top_right,rgba(88,98,255,0.08),transparent_70%)]" />

        <div className="relative flex flex-col gap-6 xl:flex-row xl:items-center xl:justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-yellow-500/30 bg-yellow-500/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-yellow-400">
                <Star className="h-3 w-3 fill-yellow-400" />
                Personalized Monitoring
              </span>
            </div>
            <h1 className="text-3xl font-extrabold text-gray-50 tracking-tight md:text-4xl">My Watchlist</h1>
            <p className="mt-2 text-sm text-gray-500 max-w-lg">
              Track your highest-conviction positions. Changes are saved automatically in your browser.
            </p>
          </div>

          {/* Stat Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 xl:w-auto">
            {/* Holdings */}
            <div className="rounded-xl border border-gray-800/60 bg-[#0d0d0d] p-3.5">
              <p className="text-[10px] font-bold uppercase tracking-wider text-gray-600 mb-2">Holdings</p>
              <p className="text-2xl font-extrabold text-gray-100">{watchlistStocks.length}</p>
            </div>
            {/* Combined Cap */}
            <div className="rounded-xl border border-gray-800/60 bg-[#0d0d0d] p-3.5">
              <p className="text-[10px] font-bold uppercase tracking-wider text-gray-600 mb-2">Combined Cap</p>
              <p className="text-xl font-extrabold text-gray-100">{combinedMarketCap}</p>
            </div>
            {/* Avg Move */}
            <div className="rounded-xl border border-gray-800/60 bg-[#0d0d0d] p-3.5">
              <p className="text-[10px] font-bold uppercase tracking-wider text-gray-600 mb-2">Avg Move</p>
              <p className={`text-xl font-extrabold tabular-nums ${averageMove >= 0 ? "text-teal-400" : "text-red-400"}`}>
                {averageMove >= 0 ? "+" : ""}{averageMove.toFixed(2)}%
              </p>
            </div>
            {/* Top Gainer */}
            <div className="rounded-xl border border-teal-500/10 bg-teal-500/5 p-3.5 min-w-0">
              <p className="text-[10px] font-bold uppercase tracking-wider text-teal-600 mb-2 truncate">Top Gainer</p>
              <p className="text-base font-extrabold text-teal-400 truncate">
                {bestPerformer ? bestPerformer.symbol.replace('.NS', '').replace('.BO', '') : "—"}
              </p>
              <p className="text-[11px] font-semibold text-teal-500 truncate">
                {bestPerformer ? `+${bestPerformer.changePercent.toFixed(2)}%` : ""}
              </p>
            </div>
            {/* Top Loser */}
            <div className="rounded-xl border border-red-500/10 bg-red-500/5 p-3.5 min-w-0">
              <p className="text-[10px] font-bold uppercase tracking-wider text-red-600 mb-2 truncate">Top Loser</p>
              <p className="text-base font-extrabold text-red-400 truncate">
                {worstPerformer ? worstPerformer.symbol.replace('.NS', '').replace('.BO', '') : "—"}
              </p>
              <p className="text-[11px] font-semibold text-red-500 truncate">
                {worstPerformer ? `${worstPerformer.changePercent.toFixed(2)}%` : ""}
              </p>
            </div>
          </div>
        </div>
      </section>

      {watchlistStocks.length ? (
        <>
          {/* Ticker tape for watchlist stocks */}
          <section className="rounded-2xl border border-gray-800/60 bg-[#090909] p-3 shadow-xl overflow-hidden">
            <TradingViewWidget
              scriptUrl={`${scriptBase}ticker-tape.js`}
              config={tickerTapeConfig}
              height={60}
            />
          </section>

          {/* Tracked stocks table */}
          <section className="rounded-2xl border border-gray-800/60 bg-[#090909] p-5 shadow-xl">
            <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <h2 className="text-lg font-bold text-gray-100">Tracked Stocks</h2>
              <div className="flex items-center gap-2 flex-wrap">
                <Select value={sortMode} onValueChange={(value) => setSortMode(value as WatchlistSortMode)}>
                  <SelectTrigger className="h-9 w-[180px] border-gray-700/60 bg-[#0d0d0d] text-gray-200 text-sm">
                    <SelectValue placeholder="Sort watchlist" />
                  </SelectTrigger>
                  <SelectContent className="border-gray-700 bg-[#0d0d0d] text-gray-100">
                    <SelectItem value="manual">Saved Order</SelectItem>
                    <SelectItem value="gainers">Top Gainers</SelectItem>
                    <SelectItem value="losers">Top Losers</SelectItem>
                    <SelectItem value="market-cap">Largest Market Cap</SelectItem>
                  </SelectContent>
                </Select>
                <Link href="/search">
                  <Button variant="outline" className="h-9 cursor-pointer border-gray-700/60 bg-[#0d0d0d] text-gray-200 hover:bg-gray-800 text-sm">
                    + Add More
                  </Button>
                </Link>
                <Button
                  type="button"
                  onClick={clearWatchlist}
                  variant="outline"
                  className="h-9 cursor-pointer border-red-500/20 bg-red-500/5 text-red-400 hover:bg-red-500/15 text-sm"
                >
                  <Trash2 className="mr-2 h-3.5 w-3.5" />
                  Clear All
                </Button>
              </div>
            </div>

            <div className="overflow-x-auto rounded-xl border border-gray-800/60">
              <table className="min-w-full divide-y divide-gray-800/60">
                <thead className="bg-[#0d0d0d] text-left">
                  <tr>
                    {["Symbol", "Company", "Price", "Change %", "Sector", "Action"].map((h) => (
                      <th key={h} className="px-4 py-3 text-[10px] font-bold uppercase tracking-widest text-gray-600">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800/40 bg-[#060606]">
                  {displayedWatchlistStocks.map((stock) => {
                    const up = stock.changePercent >= 0;
                    return (
                      <tr key={stock.symbol} className="text-sm text-gray-300 hover:bg-[#0f0f0f] transition-colors group">
                        <td className="px-4 py-3.5 font-bold">
                          <Link href={`/stock/${encodeURIComponent(stock.symbol)}`} className="text-gray-100 hover:text-teal-400 transition-colors">
                            {stock.symbol.replace('.NS', '').replace('.BO', '')}
                          </Link>
                        </td>
                        <td className="px-4 py-3.5 text-gray-400 max-w-[200px] truncate">{stock.company}</td>
                        <td className="px-4 py-3.5 font-semibold text-gray-200 tabular-nums">{formatINRCurrency(stock.price)}</td>
                        <td className="px-4 py-3.5">
                          <span className={`inline-flex items-center gap-0.5 px-2 py-0.5 rounded-lg text-xs font-bold tabular-nums ${
                            up ? "bg-teal-500/10 text-teal-400" : "bg-red-500/10 text-red-400"
                          }`}>
                            {up ? "+" : ""}{stock.changePercent.toFixed(2)}%
                          </span>
                        </td>
                        <td className="px-4 py-3.5 text-gray-500 text-xs">{stock.sector}</td>
                        <td className="px-4 py-3.5">
                          <Button
                            type="button"
                            onClick={() => removeWatchlistSymbol(stock.symbol)}
                            variant="ghost"
                            className="h-7 px-2 text-gray-600 hover:bg-red-500/10 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </section>
        </>
      ) : (
        <section className="rounded-2xl border border-dashed border-gray-800 bg-[#090909] py-16 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-yellow-500/20 bg-yellow-500/10">
            <Star className="h-8 w-8 text-yellow-400" />
          </div>
          <h2 className="mt-5 text-2xl font-bold text-gray-100">Your watchlist is empty</h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-gray-500">
            Use the search page to discover stocks and save them here for daily tracking.
          </p>
          <div className="mt-6 flex items-center justify-center gap-3">
            <Link href="/search">
              <Button className="h-10 cursor-pointer bg-teal-500 text-gray-950 hover:bg-teal-400 font-bold">
                Explore Stocks
              </Button>
            </Link>
            <Link href="/">
              <Button variant="outline" className="h-10 cursor-pointer border-gray-700 bg-[#0d0d0d] text-gray-300 hover:bg-gray-800">
                <TrendingUp className="mr-2 h-4 w-4" />
                Dashboard
              </Button>
            </Link>
          </div>
        </section>
      )}
    </div>
  );
};

export default WatchlistPage;
