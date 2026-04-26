"use client";

import { useWatchlist } from "@/hooks/useWatchlist";
import { Star } from "lucide-react";
import { Button } from "./ui/button";

interface Props {
  symbol: string;
}

export default function WatchlistToggle({ symbol }: Props) {
  const { watchlistSet, toggleWatchlistSymbol } = useWatchlist();
  const isAdded = watchlistSet.has(symbol);

  return (
    <Button
      onClick={() => toggleWatchlistSymbol(symbol)}
      className={`w-full h-9 text-sm font-bold transition-all ${
        isAdded
          ? "bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 hover:bg-red-500/10 hover:border-red-500/30 hover:text-red-400"
          : "bg-teal-500 text-gray-950 hover:bg-teal-400 shadow-lg shadow-teal-500/20"
      }`}
    >
      <Star className={`mr-2 h-3.5 w-3.5 ${isAdded ? "fill-yellow-400" : ""}`} />
      {isAdded ? "In Watchlist" : "Add to Watchlist"}
    </Button>
  );
}
