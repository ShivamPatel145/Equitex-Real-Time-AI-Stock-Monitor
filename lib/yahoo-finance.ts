import YahooFinance from "yahoo-finance2";
import { unstable_cache } from "next/cache";
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

export type IndexData = {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
};

const _fetchMarketIndices = async (): Promise<IndexData[]> => {
  const indices = [
    { symbol: "^NSEI", name: "NIFTY 50" },
    { symbol: "^BSESN", name: "SENSEX" },
    { symbol: "^NSEBANK", name: "NIFTY BANK" },
    { symbol: "^CNXIT", name: "NIFTY IT" },
  ];

  try {
    const quoteResults = await Promise.all(
      indices.map((idx) =>
        yahooFinance.quote(idx.symbol).catch((err) => {
          console.warn(`Failed to fetch live data for ${idx.symbol}: `, err.message);
          return null;
        }),
      ),
    );

    return quoteResults.map((q, i) => {
      if (!q) {
        return {
          symbol: indices[i].symbol,
          name: indices[i].name,
          price: 0,
          change: 0,
          changePercent: 0,
        };
      }

      return {
        symbol: q.symbol,
        name: indices[i].name,
        price: q.regularMarketPrice ?? 0,
        change: q.regularMarketChange ?? 0,
        changePercent: q.regularMarketChangePercent ?? 0,
      };
    });
  } catch (error) {
    console.error("Error fetching market indices:", error);
    return indices.map((idx) => ({ ...idx, price: 0, change: 0, changePercent: 0 }));
  }
};

// Cache for 60 seconds to prevent rate limiting in production
export const fetchMarketIndices = unstable_cache(
  _fetchMarketIndices,
  ["market-indices"],
  { revalidate: 60, tags: ["market-indices"] }
);
