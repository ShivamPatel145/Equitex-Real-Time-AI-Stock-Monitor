import { NextResponse } from "next/server";
import YahooFinance from "yahoo-finance2";
import { DashboardStock } from "@/lib/constants";

const yahooFinance = new YahooFinance();

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("q");

  if (!query) {
    return NextResponse.json({ success: true, data: [] });
  }

  try {
    // 1. Search for symbols
    const searchResults = await yahooFinance.search(query);
    
    // Filter for Indian exchanges (NSE, BSE)
    const indianResults = searchResults.quotes.filter(
      (q) => q.exchange === "NSE" || q.exchange === "BSE"
    );

    // Limit to top 15 results to keep quote fetching fast
    const topSymbols = indianResults.slice(0, 15).map((q) => q.symbol);

    if (topSymbols.length === 0) {
      return NextResponse.json({ success: true, data: [] });
    }

    // 2. Fetch quotes for these symbols to get price data
    const quoteResults = await Promise.all(
      topSymbols.map((symbol) =>
        yahooFinance.quote(symbol).catch((err) => null)
      )
    );

    const validQuotes = quoteResults.filter((q) => q != null);

    // 3. Map to DashboardStock format
    const mappedData: DashboardStock[] = validQuotes.map((q) => {
      // Find the original search result for some fallback info if needed
      const searchItem = indianResults.find((sr) => sr.symbol === q!.symbol);
      
      const price = q!.regularMarketPrice ?? 0;
      const previousClose = q!.regularMarketPreviousClose ?? price;
      const changePercent = price && previousClose ? ((price - previousClose) / previousClose) * 100 : 0;
      
      const marketCapValue = q!.marketCap ? q!.marketCap / 1e12 : 0;
      const marketCapLabel = q!.marketCap ? `INR ${marketCapValue.toFixed(2)}T` : "N/A";

      return {
        symbol: q!.symbol, // Keep the full Yahoo symbol (e.g. RELIANCE.NS)
        company: q!.longName || q!.shortName || searchItem?.longname || searchItem?.shortname || q!.symbol,
        exchange: (q!.exchange === "BSE" ? "BSE" : "NSE") as "BSE" | "NSE",
        tradingViewSymbol: q!.exchange === "BSE" ? `BSE:${q!.symbol.replace('.BO', '')}` : `NSE:${q!.symbol.replace('.NS', '')}`,
        sector: "All", // We don't always get sector from quote, could map it if needed
        price,
        changePercent,
        marketCapValue,
        marketCapLabel,
        peRatio: q!.trailingPE || 0,
      };
    });

    return NextResponse.json({ success: true, data: mappedData });
  } catch (error) {
    console.error("Search API error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to search stocks" },
      { status: 500 }
    );
  }
}
