import { notFound } from "next/navigation";
import YahooFinance from "yahoo-finance2";
import TradingViewWidget from "@/components/TradingViewWidget";
import TradingViewAdvancedChart from "@/components/TradingViewAdvancedChart";
import { formatINRCurrency } from "@/lib/utils";
import {
  ArrowLeft, TrendingUp, TrendingDown, Activity, Briefcase,
  BarChart3, Star, ArrowUpRight, ArrowDownRight, Clock, Building2,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import WatchlistToggle from "@/components/WatchlistToggle";

const yahooFinance = new YahooFinance();

interface PageProps {
  params: Promise<{ symbol: string }>;
}

// Always use BSE prefix — NSE symbols are blocked on TradingView free embed
function toBSESymbol(symbol: string): string {
  const clean = symbol.replace(".NS", "").replace(".BO", "").replace(".BSE", "");
  return `BSE:${clean}`;
}

export async function generateMetadata({ params }: PageProps) {
  const { symbol } = await params;
  const decoded = decodeURIComponent(symbol);
  try {
    const q = await yahooFinance.quote(decoded);
    return {
      title: `${q.shortName || decoded} — Equitex`,
      description: `Live price, chart, and fundamentals for ${q.longName || decoded} on Equitex.`,
    };
  } catch {
    return { title: `${decoded} — Equitex` };
  }
}

export default async function StockDetailPage({ params }: PageProps) {
  const { symbol } = await params;
  const decodedSymbol = decodeURIComponent(symbol);

  let quote: Awaited<ReturnType<typeof yahooFinance.quote>>;
  try {
    quote = await yahooFinance.quote(decodedSymbol);
  } catch (error) {
    console.error("Failed to fetch stock detail:", error);
    notFound();
  }

  if (!quote) notFound();

  const isPositive = (quote.regularMarketChangePercent ?? 0) >= 0;

  // Always BSE for free-tier TradingView embed
  const tvSymbol = toBSESymbol(decodedSymbol);

  // Technical Analysis widget config for this specific stock
  const techAnalysisConfig = {
    interval: "1D",
    width: "100%",
    isTransparent: true,
    height: 400,
    symbol: tvSymbol,
    showIntervalTabs: true,
    locale: "en",
    colorTheme: "dark",
  };

  // 52-week position (percentage from low)
  const low52 = quote.fiftyTwoWeekLow ?? 0;
  const high52 = quote.fiftyTwoWeekHigh ?? 0;
  const price = quote.regularMarketPrice ?? 0;
  const weekRange52Pct = high52 > low52 ? ((price - low52) / (high52 - low52)) * 100 : 50;

  const cleanSymbol = decodedSymbol.replace(".NS", "").replace(".BO", "");

  return (
    <div className="pb-12 bg-[#020202] min-h-screen -mx-4 md:-mx-6 lg:-mx-8 px-4 md:px-6 lg:px-8 pt-4">
      {/* Ambient glow */}
      <div className="pointer-events-none fixed top-0 left-0 right-0 h-[400px] bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(15,237,190,0.06),transparent)] -z-10" />

      {/* ── Back nav ── */}
      <div className="flex items-center gap-3 mb-6">
        <Link href="/">
          <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl border border-gray-800 bg-[#090909] text-gray-400 hover:bg-gray-800 hover:text-gray-100">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Link href="/" className="hover:text-gray-400 transition-colors">Dashboard</Link>
          <span>/</span>
          <Link href="/search" className="hover:text-gray-400 transition-colors">Search</Link>
          <span>/</span>
          <span className="text-gray-400 font-medium">{cleanSymbol}</span>
        </div>
      </div>

      {/* ── Hero: Name + Price + Actions ── */}
      <section className="relative overflow-hidden rounded-2xl border border-gray-800/60 bg-[#090909] px-6 py-6 mb-5 shadow-xl">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(15,237,190,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(15,237,190,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />
        <div className={`pointer-events-none absolute top-0 right-0 h-full w-1/3 ${isPositive ? "bg-[radial-gradient(ellipse_at_top_right,rgba(15,237,190,0.07),transparent_70%)]" : "bg-[radial-gradient(ellipse_at_top_right,rgba(239,68,68,0.07),transparent_70%)]"}`} />

        <div className="relative flex flex-col xl:flex-row xl:items-center justify-between gap-5">
          <div>
            <div className="flex items-center gap-3 mb-2 flex-wrap">
              <span className="px-2.5 py-1 rounded-lg bg-gray-800 border border-gray-700/50 text-xs font-bold text-gray-400 tracking-wider">
                {quote.symbol}
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-gray-800 border border-gray-700/50 text-xs font-medium text-gray-500">
                {quote.fullExchangeName}
              </span>
              {quote.sector && (
                <span className="px-2.5 py-1 rounded-lg bg-teal-500/10 border border-teal-500/20 text-xs font-medium text-teal-400">
                  {quote.sector}
                </span>
              )}
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-gray-50 tracking-tight mb-1">
              {quote.longName || quote.shortName || cleanSymbol}
            </h1>
            {quote.industry && (
              <p className="text-sm text-gray-600 flex items-center gap-1.5">
                <Building2 className="h-3.5 w-3.5" />
                {quote.industry}
              </p>
            )}
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
            {/* Price block */}
            <div className="text-right">
              <p className="text-4xl font-extrabold text-gray-50 tabular-nums leading-none">
                {formatINRCurrency(price)}
              </p>
              <div className={`mt-2 flex items-center justify-end gap-1.5 ${isPositive ? "text-teal-400" : "text-red-400"}`}>
                {isPositive ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />}
                <span className="text-base font-bold tabular-nums">
                  {isPositive ? "+" : ""}{(quote.regularMarketChange ?? 0).toFixed(2)}
                </span>
                <span className={`text-sm font-bold px-2 py-0.5 rounded-lg ${isPositive ? "bg-teal-500/10" : "bg-red-500/10"}`}>
                  {isPositive ? "+" : ""}{(quote.regularMarketChangePercent ?? 0).toFixed(2)}%
                </span>
              </div>
              <p className="text-xs text-gray-700 mt-1 flex items-center justify-end gap-1">
                <Clock className="h-3 w-3" />
                {quote.regularMarketTime ? new Date(quote.regularMarketTime).toLocaleTimeString("en-IN") : "Delayed"}
              </p>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col gap-2">
              <WatchlistToggle symbol={decodedSymbol} />
              <Link href="/watchlist">
                <Button variant="outline" className="w-full h-9 border-gray-700 bg-[#0d0d0d] text-gray-300 hover:bg-gray-800 text-sm">
                  View Watchlist
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Main Grid: Chart (2/3) + Stats (1/3) ── */}
      <div className="grid gap-4 xl:grid-cols-3 mb-4">

        {/* Chart */}
        <div className="xl:col-span-2 rounded-2xl border border-gray-800/60 bg-[#090909] overflow-hidden shadow-xl">
          <div className="px-4 pt-4 pb-0">
            <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-gray-600 mb-3">
              <BarChart3 className="h-3.5 w-3.5 text-teal-500" />
              Advanced Chart · {cleanSymbol}
            </p>
          </div>
          <TradingViewAdvancedChart symbol={tvSymbol} height={500} />
        </div>

        {/* Stats Sidebar */}
        <div className="flex flex-col gap-4">
          {/* Key Statistics */}
          <div className="rounded-2xl border border-gray-800/60 bg-[#090909] p-5 shadow-xl flex-1">
            <h3 className="text-sm font-bold text-gray-300 uppercase tracking-widest mb-4 flex items-center gap-2">
              <Activity className="h-3.5 w-3.5 text-teal-500" />
              Key Statistics
            </h3>
            <div className="space-y-0 divide-y divide-gray-800/60">
              <StatRow label="Prev. Close" value={formatINRCurrency(quote.regularMarketPreviousClose ?? 0)} />
              <StatRow label="Open" value={formatINRCurrency(quote.regularMarketOpen ?? 0)} />
              <StatRow label="Day Range" value={`${formatINRCurrency(quote.regularMarketDayLow ?? 0)} – ${formatINRCurrency(quote.regularMarketDayHigh ?? 0)}`} />
              <StatRow label="Volume" value={(quote.regularMarketVolume ?? 0).toLocaleString("en-IN")} />
              <StatRow label="Avg Vol (10d)" value={(quote.averageDailyVolume10Day ?? 0).toLocaleString("en-IN")} />
            </div>
          </div>

          {/* Fundamentals */}
          <div className="rounded-2xl border border-gray-800/60 bg-[#090909] p-5 shadow-xl flex-1">
            <h3 className="text-sm font-bold text-gray-300 uppercase tracking-widest mb-4 flex items-center gap-2">
              <Briefcase className="h-3.5 w-3.5 text-yellow-400" />
              Fundamentals
            </h3>
            <div className="space-y-0 divide-y divide-gray-800/60">
              <StatRow label="Market Cap" value={quote.marketCap ? `₹${(quote.marketCap / 1e12).toFixed(2)}T` : "N/A"} />
              <StatRow label="P/E Ratio (TTM)" value={quote.trailingPE?.toFixed(2) ?? "N/A"} />
              <StatRow label="Forward P/E" value={quote.forwardPE?.toFixed(2) ?? "N/A"} />
              <StatRow label="EPS (TTM)" value={quote.epsTrailingTwelveMonths ? `₹${quote.epsTrailingTwelveMonths.toFixed(2)}` : "N/A"} />
              <StatRow label="Dividend Yield" value={quote.trailingAnnualDividendYield ? `${(quote.trailingAnnualDividendYield * 100).toFixed(2)}%` : "N/A"} />
              <StatRow label="Beta" value={quote.beta?.toFixed(2) ?? "N/A"} />
            </div>
          </div>
        </div>
      </div>

      {/* ── 52-week range bar ── */}
      <section className="rounded-2xl border border-gray-800/60 bg-[#090909] p-5 mb-4 shadow-xl">
        <p className="text-xs font-bold uppercase tracking-widest text-gray-600 mb-4">52-Week Price Range</p>
        <div className="flex items-center gap-4">
          <span className="text-sm font-bold text-red-400 tabular-nums min-w-[70px]">{formatINRCurrency(low52)}</span>
          <div className="relative flex-1 h-2 bg-gray-800 rounded-full overflow-hidden">
            <div
              className="absolute left-0 top-0 h-full bg-gradient-to-r from-red-500 via-yellow-500 to-teal-500 rounded-full"
              style={{ width: "100%" }}
            />
            <div
              className="absolute top-1/2 -translate-y-1/2 h-4 w-4 rounded-full bg-white border-2 border-gray-900 shadow-lg z-10"
              style={{ left: `calc(${Math.min(Math.max(weekRange52Pct, 0), 100)}% - 8px)` }}
            />
          </div>
          <span className="text-sm font-bold text-teal-400 tabular-nums min-w-[70px] text-right">{formatINRCurrency(high52)}</span>
        </div>
        <div className="flex justify-between mt-2 text-[10px] text-gray-700 uppercase tracking-widest">
          <span>52W Low</span>
          <span className="font-semibold text-gray-400">Current: {weekRange52Pct.toFixed(1)}%</span>
          <span>52W High</span>
        </div>
      </section>

      {/* ── Technical Analysis Widget ── */}
      <section className="rounded-2xl border border-gray-800/60 bg-[#090909] overflow-hidden shadow-xl mb-4">
        <div className="px-4 pt-4 pb-0">
          <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-gray-600 mb-3">
            <Activity className="h-3.5 w-3.5 text-blue-400" />
            Technical Analysis Gauges · {cleanSymbol}
          </p>
        </div>
        <TradingViewWidget
          scriptUrl="https://s3.tradingview.com/external-embedding/embed-widget-technical-analysis.js"
          config={techAnalysisConfig}
          height={400}
        />
      </section>
    </div>
  );
}

function StatRow({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="flex items-center justify-between py-2.5">
      <span className="text-xs text-gray-600 uppercase tracking-wider">{label}</span>
      <span className="text-sm font-bold text-gray-200 tabular-nums">{value}</span>
    </div>
  );
}
