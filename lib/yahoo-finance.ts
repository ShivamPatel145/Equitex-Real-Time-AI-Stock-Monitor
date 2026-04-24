import YahooFinance from "yahoo-finance2";
import { DASHBOARD_STOCKS, DashboardStock } from "./constants";

const yahooFinance = new YahooFinance();

const getYahooSymbol = (symbol: string, exchange: "BSE" | "NSE") => {
  if (symbol === "M&M") return "M&M.NS";
  // Yahoo Finance NSE (.NS) symbols are generally more reliable for Indian stocks
  return `${symbol}.NS`;
};

export const fetchLiveStockData = async (customSymbols?: string[]): Promise<DashboardStock[]> => {
  const symbolsToFetch = customSymbols || DASHBOARD_STOCKS.map((stock) =>
    getYahooSymbol(stock.symbol, stock.exchange),
  );

  try {
    const quoteResults = await Promise.all(
      symbolsToFetch.map((symbol) =>
        yahooFinance.quote(symbol).catch((err) => {
          console.warn(`Failed to fetch live data for ${symbol}: `, err.message);
          return null;
        }),
      ),
    );

    const validQuotes = quoteResults.filter((q) => q != null);
    
    // Map quotes to DashboardStock format
    return validQuotes.map((q) => {
      // Find matching mock stock if it exists to preserve sector/company fallback
      const mockStock = DASHBOARD_STOCKS.find(
        (s) => getYahooSymbol(s.symbol, s.exchange) === q!.symbol
      );

      const price = q!.regularMarketPrice ?? 0;
      const previousClose = q!.regularMarketPreviousClose ?? price;
      const changePercent = price && previousClose ? ((price - previousClose) / previousClose) * 100 : 0;
      
      const marketCapValue = q!.marketCap ? q!.marketCap / 1e12 : (mockStock?.marketCapValue ?? 0);
      const marketCapLabel = q!.marketCap 
        ? `INR ${marketCapValue.toFixed(2)}T` 
        : (mockStock?.marketCapLabel ?? "N/A");

      return {
        symbol: q!.symbol,
        company: q!.longName || q!.shortName || mockStock?.company || q!.symbol,
        exchange: (q!.exchange === "BSE" ? "BSE" : "NSE") as "BSE" | "NSE",
        tradingViewSymbol: q!.exchange === "BSE" ? `BSE:${q!.symbol.replace('.BO', '')}` : `NSE:${q!.symbol.replace('.NS', '')}`,
        sector: mockStock?.sector || "All",
        price,
        changePercent,
        marketCapValue,
        marketCapLabel,
        peRatio: q!.trailingPE ?? (mockStock?.peRatio ?? 0),
      };
    });
  } catch (error) {
    console.error("Error fetching live stock data:", error);
    // If we used custom symbols and failed, return empty array to avoid showing random data
    if (customSymbols) return [];
    return DASHBOARD_STOCKS; // Fallback to mock data for default dashboard
  }
};
