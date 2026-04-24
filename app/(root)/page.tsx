import Link from "next/link";
import TradingViewWidget from "@/components/TradingViewWidget";
import {
  DASHBOARD_STOCKS,
  HEATMAP_WIDGET_CONFIG,
  MARKET_DATA_WIDGET_CONFIG,
  MARKET_OVERVIEW_WIDGET_CONFIG,
  HOTLISTS_WIDGET_CONFIG,
  TICKER_TAPE_WIDGET_CONFIG,
  SCREENER_WIDGET_CONFIG,
} from "@/lib/constants";
import { ArrowRight, TrendingUp } from "lucide-react";
import { fetchLiveStockData } from "@/lib/yahoo-finance";

const Home = async () => {
  const scriptUrl = `https://s3.tradingview.com/external-embedding/embed-widget-`;

  const dashboardStocks = await fetchLiveStockData();

  const averageMove =
    dashboardStocks.reduce((sum, stock) => sum + stock.changePercent, 0) /
    dashboardStocks.length;
  const gainers = dashboardStocks.filter((stock) => stock.changePercent >= 0).length;
  const combinedMarketCap = dashboardStocks.reduce(
    (sum, stock) => sum + stock.marketCapValue,
    0,
  );
  const topGainer = dashboardStocks.reduce((winner, stock) =>
    stock.changePercent > winner.changePercent ? stock : winner,
  );

  const panelClass =
    "rounded-2xl border border-gray-700/50 bg-[#0a0a0a] p-4 shadow-xl overflow-hidden";

  return (
    <div className="flex w-full min-h-screen flex-col gap-8 pb-8">
      <section className="relative overflow-hidden rounded-3xl border border-gray-700/50 bg-[#0a0a0a] px-6 py-8 md:px-8">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(15,237,190,0.22),transparent_45%)]" />
        <div className="pointer-events-none absolute -left-16 top-1/3 h-44 w-44 rounded-full bg-blue-500/15 blur-3xl" />

        <div className="relative grid gap-6 lg:grid-cols-[1.4fr_1fr] lg:items-end">
          <div className="space-y-4">
            <p className="inline-flex items-center gap-2 rounded-full border border-teal-500/35 bg-teal-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-teal-300">
              Live Indian Markets
            </p>
            <h1 className="text-3xl font-bold text-gray-100 md:text-4xl">
              Equitex Market Dashboard
            </h1>
            <p className="max-w-2xl text-sm text-gray-400 md:text-base">
              Track market breadth, compare sectors, and monitor your watchlist from a
              single high-signal workspace built for active investors.
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                href="/search"
                className="inline-flex h-10 items-center gap-2 rounded-lg bg-teal-500 px-4 text-sm font-semibold text-gray-950 transition-colors hover:bg-teal-400"
              >
                Search Stocks
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/watchlist"
                className="inline-flex h-10 items-center gap-2 rounded-lg border border-gray-700 bg-gray-800 px-4 text-sm font-medium text-gray-200 transition-colors hover:bg-gray-700"
              >
                Open Watchlist
                <TrendingUp className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-xl border border-gray-700/60 bg-gray-800/60 p-4">
              <p className="text-xs uppercase tracking-[0.18em] text-gray-500">Tracked</p>
              <p className="mt-1 text-2xl font-semibold text-gray-100">{dashboardStocks.length}</p>
              <p className="mt-1 text-xs text-gray-500">{gainers} gainers today</p>
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
              <p className="mt-1 text-xs text-gray-500">Across curated symbols</p>
            </div>
            <div className="rounded-xl border border-gray-700/60 bg-gray-800/60 p-4">
              <p className="text-xs uppercase tracking-[0.18em] text-gray-500">Top Gainer</p>
              <Link href={`/stock/${encodeURIComponent(topGainer.symbol)}`} className="mt-1 block text-2xl font-semibold text-gray-100 hover:text-teal-400 transition-colors">
                {topGainer.symbol}
              </Link>
              <p className="mt-1 text-xs text-teal-400">+{topGainer.changePercent.toFixed(2)}%</p>
            </div>
            <div className="rounded-xl border border-gray-700/60 bg-gray-800/60 p-4">
              <p className="text-xs uppercase tracking-[0.18em] text-gray-500">Combined Cap</p>
              <p className="mt-1 text-2xl font-semibold text-gray-100">{combinedMarketCap.toFixed(1)}T</p>
              <p className="mt-1 text-xs text-gray-500">Tracked universe</p>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full rounded-2xl border border-gray-700/50 bg-[#0a0a0a] p-2 pt-3 shadow-xl">
        <TradingViewWidget
          scriptUrl={`${scriptUrl}ticker-tape.js`}
          config={TICKER_TAPE_WIDGET_CONFIG}
          height={70}
        />
      </section>

      <section className="grid w-full gap-6 xl:grid-cols-3">
        <div className={`${panelClass} xl:col-span-1`}>
          <TradingViewWidget
            title="Market Overview"
            scriptUrl={`${scriptUrl}market-overview.js`}
            config={MARKET_OVERVIEW_WIDGET_CONFIG}
            className="custom-chart"
            height={580}
          />
        </div>
        <div className={`${panelClass} xl:col-span-2`}>
          <TradingViewWidget
            title="Stock Heatmap"
            scriptUrl={`${scriptUrl}stock-heatmap.js`}
            config={HEATMAP_WIDGET_CONFIG}
            height={580}
          />
        </div>
      </section>

      <section className="grid w-full gap-6 xl:grid-cols-3">
        <div className={`${panelClass} xl:col-span-1`}>
          <TradingViewWidget
            title="Market Movers"
            scriptUrl={`${scriptUrl}hotlists.js`}
            config={HOTLISTS_WIDGET_CONFIG}
            height={580}
          />
        </div>
        <div className={`${panelClass} xl:col-span-2`}>
          <TradingViewWidget
            title="Top Stocks by Sector"
            scriptUrl={`${scriptUrl}market-quotes.js`}
            config={MARKET_DATA_WIDGET_CONFIG}
            height={580}
          />
        </div>
      </section>

      <section className={`${panelClass} mt-1`}>
        <TradingViewWidget
          title="Stock Screener"
          scriptUrl={`${scriptUrl}screener.js`}
          config={SCREENER_WIDGET_CONFIG}
          height={700}
        />
      </section>
    </div>
  );
};

export default Home;
