import { notFound } from "next/navigation";
import YahooFinance from "yahoo-finance2";
import TradingViewWidget from "@/components/TradingViewWidget";
import { formatINRCurrency } from "@/lib/utils";
import { ArrowLeft, TrendingUp, TrendingDown, Activity, DollarSign, Briefcase } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const yahooFinance = new YahooFinance();

interface PageProps {
  params: Promise<{ symbol: string }>;
}

export default async function StockDetailPage({ params }: PageProps) {
  const { symbol } = await params;
  const decodedSymbol = decodeURIComponent(symbol);

  let quote;
  try {
    quote = await yahooFinance.quote(decodedSymbol);
  } catch (error) {
    console.error("Failed to fetch stock detail:", error);
    notFound();
  }

  if (!quote) notFound();

  const isPositive = (quote.regularMarketChangePercent ?? 0) >= 0;
  const tradingViewSymbol = quote.exchange === "BSE" 
    ? `BSE:${quote.symbol.replace('.BO', '')}` 
    : `NSE:${quote.symbol.replace('.NS', '')}`;

  const chartConfig = {
    symbol: tradingViewSymbol,
    theme: "dark",
    style: "1",
    locale: "en",
    enable_publishing: false,
    backgroundColor: "#0a0a0a",
    gridColor: "#1f2937",
    hide_top_toolbar: false,
    hide_legend: false,
    save_image: false,
    container_id: "tradingview_widget",
    allow_symbol_change: true,
  };

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-500">
      <div className="flex items-center gap-4">
        <Link href="/">
          <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full border border-gray-700/50 bg-gray-800/50 text-gray-400 hover:bg-gray-700 hover:text-gray-100 backdrop-blur-md">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-100 md:text-3xl">
            {quote.longName || quote.shortName || quote.symbol}
          </h1>
          <p className="text-sm text-gray-400 tracking-wider uppercase">
            {quote.symbol} • {quote.fullExchangeName}
          </p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Chart Area */}
        <div className="lg:col-span-2 space-y-6">
          {/* Price Header */}
          <div className="rounded-3xl border border-gray-700/50 bg-[#0a0a0a]/80 p-6 backdrop-blur-xl relative overflow-hidden">
            <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-teal-500/10 blur-3xl" />
            <div className="relative">
              <p className="text-sm font-medium text-gray-400 uppercase tracking-widest mb-1">Current Price</p>
              <div className="flex items-baseline gap-4">
                <span className="text-4xl md:text-5xl font-bold text-gray-100">
                  {formatINRCurrency(quote.regularMarketPrice ?? 0)}
                </span>
                <span className={`flex items-center text-lg font-semibold ${isPositive ? "text-teal-400" : "text-red-400"}`}>
                  {isPositive ? <TrendingUp className="mr-1 h-5 w-5" /> : <TrendingDown className="mr-1 h-5 w-5" />}
                  {isPositive ? "+" : ""}
                  {(quote.regularMarketChange ?? 0).toFixed(2)} (
                  {(quote.regularMarketChangePercent ?? 0).toFixed(2)}%)
                </span>
              </div>
            </div>
          </div>

          {/* Chart */}
          <div className="rounded-3xl border border-gray-700/50 bg-[#0a0a0a]/80 p-4 backdrop-blur-xl h-[500px]">
             <TradingViewWidget 
                scriptUrl="https://s3.tradingview.com/tv.js"
                config={chartConfig}
                height={460}
             />
          </div>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-6">
          <div className="rounded-3xl border border-gray-700/50 bg-[#0a0a0a]/80 p-6 backdrop-blur-xl">
            <h3 className="text-lg font-semibold text-gray-100 mb-4 flex items-center gap-2">
              <Activity className="h-5 w-5 text-teal-400" /> Key Statistics
            </h3>
            <div className="space-y-4">
              <StatRow label="Previous Close" value={formatINRCurrency(quote.regularMarketPreviousClose ?? 0)} />
              <StatRow label="Open" value={formatINRCurrency(quote.regularMarketOpen ?? 0)} />
              <StatRow label="Day's Range" value={`${formatINRCurrency(quote.regularMarketDayLow ?? 0)} - ${formatINRCurrency(quote.regularMarketDayHigh ?? 0)}`} />
              <StatRow label="52 Week Range" value={`${formatINRCurrency(quote.fiftyTwoWeekLow ?? 0)} - ${formatINRCurrency(quote.fiftyTwoWeekHigh ?? 0)}`} />
              <StatRow label="Volume" value={(quote.regularMarketVolume ?? 0).toLocaleString()} />
              <StatRow label="Avg. Volume" value={(quote.averageDailyVolume10Day ?? 0).toLocaleString()} />
            </div>
          </div>

          <div className="rounded-3xl border border-gray-700/50 bg-[#0a0a0a]/80 p-6 backdrop-blur-xl">
            <h3 className="text-lg font-semibold text-gray-100 mb-4 flex items-center gap-2">
               <Briefcase className="h-5 w-5 text-yellow-400" /> Fundamentals
            </h3>
            <div className="space-y-4">
              <StatRow label="Market Cap" value={quote.marketCap ? `${(quote.marketCap / 1e12).toFixed(2)}T` : "N/A"} />
              <StatRow label="PE Ratio (TTM)" value={quote.trailingPE?.toFixed(2) ?? "N/A"} />
              <StatRow label="EPS (TTM)" value={quote.epsTrailingTwelveMonths?.toFixed(2) ?? "N/A"} />
              <StatRow label="Forward PE" value={quote.forwardPE?.toFixed(2) ?? "N/A"} />
              <StatRow label="Dividend Yield" value={quote.trailingAnnualDividendYield ? `${(quote.trailingAnnualDividendYield * 100).toFixed(2)}%` : "N/A"} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatRow({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-gray-700/30 last:border-0">
      <span className="text-sm text-gray-400">{label}</span>
      <span className="text-sm font-semibold text-gray-200">{value}</span>
    </div>
  );
}
