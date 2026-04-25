import Link from "next/link";
import TradingViewWidget from "@/components/TradingViewWidget";
import TradingViewAdvancedChart from "@/components/TradingViewAdvancedChart";
import {
  HEATMAP_WIDGET_CONFIG,
  HOTLISTS_WIDGET_CONFIG,
  TICKER_TAPE_WIDGET_CONFIG,
  SCREENER_WIDGET_CONFIG,
  TIMELINE_WIDGET_CONFIG,
  EVENTS_WIDGET_CONFIG,
} from "@/lib/constants";
import { ArrowRight, TrendingUp, TrendingDown, LayoutDashboard } from "lucide-react";
import { fetchMarketIndices } from "@/lib/yahoo-finance";
import { formatINRCurrency } from "@/lib/utils";

const Home = async () => {
  const scriptUrl = `https://s3.tradingview.com/external-embedding/embed-widget-`;

  // Fetch true market indices instead of arbitrary mock stocks
  const marketIndices = await fetchMarketIndices();

  const panelClass =
    "rounded-2xl border border-gray-700/50 bg-[#0a0a0a] p-4 shadow-xl overflow-hidden";

  return (
    <div className="flex w-full min-h-screen flex-col gap-6 pb-8">
      
      {/* 1. Global Ticker Tape */}
      <section className="w-full rounded-2xl border border-gray-700/50 bg-[#0a0a0a] p-2 pt-3 shadow-xl">
        <TradingViewWidget
          scriptUrl={`${scriptUrl}ticker-tape.js`}
          config={TICKER_TAPE_WIDGET_CONFIG}
          height={70}
        />
      </section>

      {/* 2. Markets at a Glance Header */}
      <section className="relative overflow-hidden rounded-3xl border border-gray-700/50 bg-[#0a0a0a] px-6 py-6 md:px-8">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(15,237,190,0.15),transparent_40%)]" />
        <div className="pointer-events-none absolute -left-16 top-1/3 h-44 w-44 rounded-full bg-blue-500/10 blur-3xl" />

        <div className="relative flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3">
            <h1 className="text-2xl font-bold text-gray-100 flex items-center gap-2">
              <LayoutDashboard className="h-6 w-6 text-teal-400" /> Markets at a Glance
            </h1>
            <p className="max-w-xl text-sm text-gray-400">
              Real-time index performance and top market movers. Analyze any listed Indian equity using the full-market screener below.
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                href="/search"
                className="inline-flex h-9 items-center gap-2 rounded-lg bg-teal-500 px-4 text-sm font-semibold text-gray-950 transition-colors hover:bg-teal-400"
              >
                Search Stocks
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="grid gap-3 grid-cols-2 lg:grid-cols-4 w-full lg:w-auto">
            {marketIndices.map((idx) => {
              const isPositive = idx.change >= 0;
              return (
                <div key={idx.symbol} className="rounded-xl border border-gray-700/60 bg-gray-800/40 p-4 backdrop-blur-sm transition-colors hover:bg-gray-800/60">
                  <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">{idx.name}</p>
                  <p className="mt-1.5 text-xl font-bold text-gray-100">
                    {idx.price ? formatINRCurrency(idx.price) : "---"}
                  </p>
                  <p className={`mt-1 flex items-center text-sm font-medium ${isPositive ? "text-teal-400" : "text-red-400"}`}>
                    {isPositive ? <TrendingUp className="mr-1 h-3.5 w-3.5" /> : <TrendingDown className="mr-1 h-3.5 w-3.5" />}
                    {isPositive ? "+" : ""}{idx.change.toFixed(2)} ({isPositive ? "+" : ""}{idx.changePercent.toFixed(2)}%)
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. Main Analysis Grid */}
      <section className="grid w-full gap-6 xl:grid-cols-3">
        <div className={`${panelClass} xl:col-span-2`}>
          <h2 className="text-lg font-semibold text-gray-200 mb-3 ml-2">Market Analysis (SENSEX)</h2>
          <TradingViewAdvancedChart 
            symbol="BSE:SENSEX"
            height={520}
          />
        </div>
        <div className={`${panelClass} xl:col-span-1`}>
          <TradingViewWidget
            title="Market Movers"
            scriptUrl={`${scriptUrl}hotlists.js`}
            config={HOTLISTS_WIDGET_CONFIG}
            height={550}
          />
        </div>
      </section>

      {/* 4. Macro Economic & News Events */}
      <section className="grid w-full gap-6 xl:grid-cols-2">
        <div className={`${panelClass}`}>
          <h2 className="text-lg font-semibold text-gray-200 mb-3 ml-2">Economic Calendar</h2>
          <TradingViewWidget
            scriptUrl={`${scriptUrl}events.js`}
            config={EVENTS_WIDGET_CONFIG}
            height={550}
          />
        </div>
        <div className={`${panelClass}`}>
          <h2 className="text-lg font-semibold text-gray-200 mb-3 ml-2">Top Market Stories</h2>
          <TradingViewWidget
            scriptUrl={`${scriptUrl}timeline.js`}
            config={TIMELINE_WIDGET_CONFIG}
            height={550}
          />
        </div>
      </section>

      {/* 5. Sector Performance Heatmap (Full Market) */}
      <section className={`${panelClass}`}>
        <TradingViewWidget
          title="Indian Market Heatmap"
          scriptUrl={`${scriptUrl}stock-heatmap.js`}
          config={HEATMAP_WIDGET_CONFIG}
          height={600}
        />
      </section>

      {/* 6. Global Market Screener (Shows ALL stocks) */}
      <section className={`${panelClass}`}>
        <h2 className="text-lg font-semibold text-gray-200 mb-3 ml-2">Global Stock Screener</h2>
        <TradingViewWidget
          scriptUrl={`${scriptUrl}screener.js`}
          config={SCREENER_WIDGET_CONFIG}
          height={700}
        />
      </section>

    </div>
  );
};

export default Home;
