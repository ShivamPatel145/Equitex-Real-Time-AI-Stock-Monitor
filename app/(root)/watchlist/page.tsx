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
      symbols: displayedWatchlistStocks.slice(0, 12).map((stock) => ({
        proName: stock.tradingViewSymbol,
        title: stock.symbol,
      })),
      showSymbolLogo: true,
      isTransparent: true,
      displayMode: "adaptive",
      colorTheme: "dark",
      locale: "en",
    }),
    [displayedWatchlistStocks],
  );

  return (
    <div className="space-y-8 pb-8">
      <section className="relative overflow-hidden rounded-3xl border border-gray-700/50 bg-[#0a0a0a] p-6 md:p-8">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(88,98,255,0.2),transparent_40%)]" />
        <div className="pointer-events-none absolute -bottom-20 -right-10 h-48 w-48 rounded-full bg-teal-500/15 blur-3xl" />

        <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-3">
            <p className="inline-flex items-center gap-2 rounded-full border border-yellow-500/40 bg-yellow-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-yellow-400">
              Personalized Monitoring
            </p>
            <h1 className="text-3xl font-bold text-gray-100 md:text-4xl">My Watchlist</h1>
            <p className="max-w-2xl text-sm text-gray-400 md:text-base">
              Track your highest-conviction positions in one place. Changes are saved
              automatically in your browser.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5 lg:w-[780px]">
            <div className="rounded-xl border border-gray-700/60 bg-gray-800/60 p-4">
              <p className="text-xs uppercase tracking-[0.18em] text-gray-500">Holdings</p>
              <p className="mt-1 text-2xl font-semibold text-gray-100">{watchlistStocks.length}</p>
            </div>
            <div className="rounded-xl border border-gray-700/60 bg-gray-800/60 p-4">
              <p className="text-xs uppercase tracking-[0.18em] text-gray-500">Combined Cap</p>
              <p className="mt-1 text-2xl font-semibold text-gray-100">{combinedMarketCap}</p>
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
              <p className="text-xs uppercase tracking-[0.18em] text-gray-500">Top Gainer</p>
              <p className="mt-1 text-xl font-semibold text-teal-400">
                {bestPerformer ? `${bestPerformer.symbol}` : "-"}
              </p>
              <p className="mt-1 text-xs text-teal-400">
                {bestPerformer ? `+${bestPerformer.changePercent.toFixed(2)}%` : "--"}
              </p>
            </div>
            <div className="rounded-xl border border-gray-700/60 bg-gray-800/60 p-4">
              <p className="text-xs uppercase tracking-[0.18em] text-gray-500">Top Loser</p>
              <p className="mt-1 text-xl font-semibold text-red-400">
                {worstPerformer ? `${worstPerformer.symbol}` : "-"}
              </p>
              <p className="mt-1 text-xs text-red-400">
                {worstPerformer ? `${worstPerformer.changePercent.toFixed(2)}%` : "--"}
              </p>
            </div>
          </div>
        </div>
      </section>

      {watchlistStocks.length ? (
        <>
          <section className="rounded-2xl border border-gray-700/50 bg-[#0a0a0a] p-4">
            <TradingViewWidget
              scriptUrl={`${scriptBase}ticker-tape.js`}
              config={tickerTapeConfig}
              height={74}
            />
          </section>

          <section className="rounded-2xl border border-gray-700/50 bg-[#0a0a0a] p-4 md:p-5">
            <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <h2 className="text-xl font-semibold text-gray-100">Tracked Stocks</h2>
              <div className="flex items-center gap-2">
                <Select value={sortMode} onValueChange={(value) => setSortMode(value as WatchlistSortMode)}>
                  <SelectTrigger className="h-9 w-[180px] border-gray-700 bg-gray-800 text-gray-100">
                    <SelectValue placeholder="Sort watchlist" />
                  </SelectTrigger>
                  <SelectContent className="border-gray-700 bg-gray-800 text-gray-100">
                    <SelectItem value="manual">Saved Order</SelectItem>
                    <SelectItem value="gainers">Top Gainers</SelectItem>
                    <SelectItem value="losers">Top Losers</SelectItem>
                    <SelectItem value="market-cap">Largest Market Cap</SelectItem>
                  </SelectContent>
                </Select>
                <Link href="/search">
                  <Button
                    variant="outline"
                    className="h-9 cursor-pointer border-gray-700 bg-gray-800 text-gray-200 hover:bg-gray-700"
                  >
                    Add More
                  </Button>
                </Link>
                <Button
                  type="button"
                  onClick={clearWatchlist}
                  variant="outline"
                  className="h-9 cursor-pointer border-red-500/30 bg-red-500/10 text-red-300 hover:bg-red-500/20"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Clear
                </Button>
              </div>
            </div>

            <div className="overflow-x-auto rounded-xl border border-gray-700/60">
              <table className="min-w-full divide-y divide-gray-700/60">
                <thead className="bg-gray-800/70 text-left text-xs uppercase tracking-[0.16em] text-gray-400">
                  <tr>
                    <th className="px-4 py-3">Symbol</th>
                    <th className="px-4 py-3">Company</th>
                    <th className="px-4 py-3">Price</th>
                    <th className="px-4 py-3">Change</th>
                    <th className="px-4 py-3">Sector</th>
                    <th className="px-4 py-3">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700/40 bg-[#0d0d0d]">
                  {displayedWatchlistStocks.map((stock) => {
                    const positive = stock.changePercent >= 0;

                    return (
                      <tr key={stock.symbol} className="text-sm text-gray-300 hover:bg-gray-800/40 transition-colors">
                        <td className="px-4 py-3 font-semibold text-gray-100">
                          <Link href={`/stock/${encodeURIComponent(stock.symbol)}`} className="hover:text-teal-400 transition-colors">
                            {stock.symbol}
                          </Link>
                        </td>
                        <td className="px-4 py-3">{stock.company}</td>
                        <td className="px-4 py-3">{formatINRCurrency(stock.price)}</td>
                        <td
                          className={`px-4 py-3 font-semibold ${
                            positive ? "text-teal-400" : "text-red-400"
                          }`}
                        >
                          {positive ? "+" : ""}
                          {stock.changePercent.toFixed(2)}%
                        </td>
                        <td className="px-4 py-3">{stock.sector}</td>
                        <td className="px-4 py-3">
                          <Button
                            type="button"
                            onClick={() => removeWatchlistSymbol(stock.symbol)}
                            variant="ghost"
                            className="h-8 cursor-pointer px-2 text-gray-400 hover:bg-red-500/15 hover:text-red-300"
                          >
                            <Trash2 className="h-4 w-4" />
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
        <section className="rounded-2xl border border-dashed border-gray-700/60 bg-[#0a0a0a] p-10 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gray-800 text-yellow-400">
            <Star className="h-6 w-6" />
          </div>
          <h2 className="mt-4 text-2xl font-semibold text-gray-100">Your watchlist is empty</h2>
          <p className="mx-auto mt-2 max-w-xl text-gray-400">
            Use the search page to discover stocks and save them here for daily tracking.
          </p>
          <div className="mt-6 flex items-center justify-center gap-3">
            <Link href="/search">
              <Button className="h-10 cursor-pointer bg-teal-500 text-gray-950 hover:bg-teal-400">
                Explore Stocks
              </Button>
            </Link>
            <Link href="/">
              <Button
                variant="outline"
                className="h-10 cursor-pointer border-gray-700 bg-gray-800 text-gray-200 hover:bg-gray-700"
              >
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
