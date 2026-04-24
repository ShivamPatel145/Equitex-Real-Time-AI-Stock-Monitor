import { NextResponse } from "next/server";
import { fetchLiveStockData } from "@/lib/yahoo-finance";

// Cache for 60 seconds to avoid hitting rate limits too frequently
export const revalidate = 60;

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const symbolsQuery = searchParams.get("symbols");
  const symbols = symbolsQuery ? symbolsQuery.split(",") : undefined;

  try {
    const liveData = await fetchLiveStockData(symbols);
    return NextResponse.json({ success: true, data: liveData });
  } catch (error) {
    console.error("Failed to fetch live stock data:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch live stock data" },
      { status: 500 }
    );
  }
}
