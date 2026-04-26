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
  FOREX_CROSS_RATES_CONFIG,
  TECHNICAL_ANALYSIS_CONFIG,
} from "@/lib/constants";
import {
  TrendingUp, TrendingDown, Search, Star,
  BarChart3, Globe, Calendar, Newspaper,
  Activity, ArrowUpRight, ArrowDownRight
} from "lucide-react";
import { fetchMarketIndices } from "@/lib/yahoo-finance";
import { formatINRCurrency } from "@/lib/utils";

const Home = async () => {
  const scriptUrl = `https://s3.tradingview.com/external-embedding/embed-widget-`;
  const marketIndices = await fetchMarketIndices();

  const panelClass = "rounded-2xl border border-gray-800/60 bg-[#090909] shadow-xl overflow-hidden";
  const sectionLabelClass = "flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-gray-500 mb-3";

  // Determine market status based on IST time
  const now = new Date();
  const istOffset = 5.5 * 60 * 60 * 1000;
  const ist = new Date(now.getTime() + istOffset);
  const hours = ist.getUTCHours();
  const minutes = ist.getUTCMinutes();
  const totalMins = hours * 60 + minutes;
  const isMarketOpen = ist.getUTCDay() >= 1 && ist.getUTCDay() <= 5 && totalMins >= 555 && totalMins < 930; // 9:15 to 15:30

  return (
    <div className="flex w-full min-h-screen flex-col gap-5 pb-10 bg-[#020202] px-4 md:px-6 lg:px-8 pt-5 relative">
      {/* Ambient background glow */}
      <div className="pointer-events-none fixed top-0 left-0 right-0 h-[600px] bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(15,237,190,0.08),transparent)] -z-10" />

      {/* ═══ 1. TICKER TAPE ═══ */}
      <section className="w-full rounded-2xl border border-gray-800/60 bg-[#090909] overflow-hidden shadow-xl">
        <TradingViewWidget
          scriptUrl={`${scriptUrl}ticker-tape.js`}
          config={TICKER_TAPE_WIDGET_CONFIG}
          height={50}
        />
      </section>

      {/* ═══ 2. HERO HEADER ═══ */}
      <section className="relative overflow-hidden rounded-2xl border border-gray-800/60 bg-[#090909] px-6 py-5 shadow-xl">
        {/* Decorative grid */}
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(15,237,190,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(15,237,190,0.03)_1px,transparent_1px)] bg-[size:32px_32px]" />
        <div className="pointer-events-none absolute top-0 right-0 h-full w-1/2 bg-[radial-gradient(ellipse_at_top_right,rgba(15,237,190,0.07),transparent_60%)]" />

        <div className="relative flex flex-col xl:flex-row xl:items-center justify-between gap-5">
          {/* Left: Branding + Status + Nav */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-5">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h1 className="text-2xl font-extrabold text-gray-50 tracking-tight">
                  Equitex
                </h1>
                <div className={`flex items-center gap-1.5 px-2 py-0.5 rounded-full border text-[10px] font-bold uppercase tracking-wider ${isMarketOpen
                    ? "border-teal-500/30 bg-teal-500/10 text-teal-400"
                    : "border-gray-700 bg-gray-800/50 text-gray-500"
                  }`}>
                  <span className={`h-1.5 w-1.5 rounded-full ${isMarketOpen ? "bg-teal-400 animate-pulse" : "bg-gray-600"}`} />
                  {isMarketOpen ? "Market Open" : "Market Closed"}
                </div>
              </div>
              <p className="text-xs text-gray-600">Indian Equity Terminal · NSE & BSE Real-time Data</p>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <Link
                href="/search"
                className="inline-flex h-9 items-center gap-2 rounded-xl bg-teal-500 px-4 text-sm font-bold text-gray-950 hover:bg-teal-400 transition-all hover:scale-105 shadow-lg shadow-teal-500/20"
              >
                <Search className="h-3.5 w-3.5" />
                Search Stocks
              </Link>
              <Link
                href="/watchlist"
                className="inline-flex h-9 items-center gap-2 rounded-xl bg-gray-800 px-4 text-sm font-semibold text-gray-300 hover:bg-gray-700 hover:text-gray-100 transition-all border border-gray-700/50"
              >
                <Star className="h-3.5 w-3.5 text-yellow-400" />
                My Watchlist
              </Link>
            </div>
          </div>

          {/* Right: Index Cards */}
          <div className="grid grid-cols-2 xl:flex xl:flex-nowrap gap-2">
            {marketIndices.map((idx) => {
              const up = idx.change >= 0;
              return (
                <div
                  key={idx.symbol}
                  className="relative rounded-xl border border-gray-800/60 bg-[#0d0d0d] hover:bg-[#111] hover:border-gray-700 transition-all duration-200 px-4 py-3 min-w-[148px] cursor-default group"
                >
                  <div className={`absolute top-0 left-0 right-0 h-[2px] rounded-t-xl ${up ? "bg-gradient-to-r from-teal-500/0 via-teal-500/60 to-teal-500/0" : "bg-gradient-to-r from-red-500/0 via-red-500/60 to-red-500/0"}`} />
                  <p className="text-[10px] font-bold uppercase tracking-wider text-gray-600 mb-2">{idx.name}</p>
                  <p className="text-[15px] font-bold text-gray-100 tabular-nums leading-none mb-1.5">
                    {idx.price ? formatINRCurrency(idx.price) : "---"}
                  </p>
                  <div className="flex items-center gap-1">
                    {up ? <ArrowUpRight className="h-3 w-3 text-teal-400" /> : <ArrowDownRight className="h-3 w-3 text-red-400" />}
                    <span className={`text-[11px] font-bold tabular-nums ${up ? "text-teal-400" : "text-red-400"}`}>
                      {up ? "+" : ""}{idx.change.toFixed(1)} ({up ? "+" : ""}{idx.changePercent.toFixed(2)}%)
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══ 3. MAIN ANALYSIS GRID: Chart (3/4) + Movers (1/4) ═══ */}
      <section className="grid w-full gap-4 xl:grid-cols-4">
        <div className={`${panelClass} xl:col-span-3`}>
          <div className="px-4 pt-4 pb-0">
            <div className={sectionLabelClass}>
              <BarChart3 className="h-3.5 w-3.5 text-teal-500" />
              Advanced Charting · SENSEX
            </div>
          </div>
          <TradingViewAdvancedChart symbol="BSE:SENSEX" height={530} />
        </div>
        <div className={`${panelClass} xl:col-span-1`}>
          <div className="px-4 pt-4 pb-0">
            <div className={sectionLabelClass}>
              <Activity className="h-3.5 w-3.5 text-teal-500" />
              Market Movers
            </div>
          </div>
          <TradingViewWidget
            scriptUrl={`${scriptUrl}hotlists.js`}
            config={HOTLISTS_WIDGET_CONFIG}
            height={530}
          />
        </div>
      </section>

      {/* ═══ 4. TECHNICAL INDICATORS ROW ═══ */}
      <section className="grid w-full gap-4 lg:grid-cols-2 xl:grid-cols-3">
        <div className={panelClass}>
          <div className="px-4 pt-4 pb-0">
            <div className={sectionLabelClass}>
              <Activity className="h-3.5 w-3.5 text-blue-400" />
              Technical Gauges · SENSEX
            </div>
          </div>
          <TradingViewWidget
            scriptUrl={`${scriptUrl}technical-analysis.js`}
            config={TECHNICAL_ANALYSIS_CONFIG}
            height={440}
          />
        </div>
        <div className={panelClass}>
          <div className="px-4 pt-4 pb-0">
            <div className={sectionLabelClass}>
              <Globe className="h-3.5 w-3.5 text-purple-400" />
              FX Cross Rates
            </div>
          </div>
          <TradingViewWidget
            scriptUrl={`${scriptUrl}forex-cross-rates.js`}
            config={FOREX_CROSS_RATES_CONFIG}
            height={440}
          />
        </div>
        <div className={`${panelClass} lg:col-span-2 xl:col-span-1`}>
          <div className="px-4 pt-4 pb-0">
            <div className={sectionLabelClass}>
              <Calendar className="h-3.5 w-3.5 text-orange-400" />
              Economic Calendar
            </div>
          </div>
          <TradingViewWidget
            scriptUrl={`${scriptUrl}events.js`}
            config={EVENTS_WIDGET_CONFIG}
            height={440}
          />
        </div>
      </section>

      {/* ═══ 5. HEATMAP + NEWS ═══ */}
      <section className="grid w-full gap-4 xl:grid-cols-3">
        <div className={`${panelClass} xl:col-span-2`}>
          <div className="px-4 pt-4 pb-0">
            <div className={sectionLabelClass}>
              <TrendingUp className="h-3.5 w-3.5 text-teal-500" />
              Sector Performance Heatmap
            </div>
          </div>
          <TradingViewWidget
            scriptUrl={`${scriptUrl}stock-heatmap.js`}
            config={HEATMAP_WIDGET_CONFIG}
            height={560}
          />
        </div>
        <div className={panelClass}>
          <div className="px-4 pt-4 pb-0">
            <div className={sectionLabelClass}>
              <Newspaper className="h-3.5 w-3.5 text-sky-400" />
              Market News Feed
            </div>
          </div>
          <TradingViewWidget
            scriptUrl={`${scriptUrl}timeline.js`}
            config={TIMELINE_WIDGET_CONFIG}
            height={560}
          />
        </div>
      </section>

      {/* ═══ 6. GLOBAL SCREENER ═══ */}
      <section className={panelClass}>
        <div className="px-4 pt-4 pb-0">
          <div className="flex items-center justify-between mb-3">
            <div className={sectionLabelClass}>
              <BarChart3 className="h-3.5 w-3.5 text-teal-500" />
              Global Stock Screener · India
            </div>
            <div className="flex items-center gap-1.5 text-[10px] font-semibold text-gray-600 uppercase tracking-wider">
              <span className="h-1.5 w-1.5 rounded-full bg-teal-500 animate-pulse" />
              Live
            </div>
          </div>
        </div>
        <TradingViewWidget
          scriptUrl={`${scriptUrl}screener.js`}
          config={SCREENER_WIDGET_CONFIG}
          height={1000}
        />
      </section>
    </div>
  );
};

export default Home;
