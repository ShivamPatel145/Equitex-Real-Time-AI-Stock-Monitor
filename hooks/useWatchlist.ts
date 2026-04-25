"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  DASHBOARD_STOCK_SYMBOLS_SET,
  WATCHLIST_STORAGE_KEY,
} from "@/lib/constants";

const VALID_SYMBOLS = DASHBOARD_STOCK_SYMBOLS_SET;

const sanitizeSymbols = (rawSymbols: unknown): string[] => {
  if (!Array.isArray(rawSymbols)) return [];

  const normalizedSymbols = rawSymbols
    .filter((symbol): symbol is string => typeof symbol === "string")
    .map((symbol) => symbol.trim().toUpperCase())
    .filter((symbol) => symbol.length > 0);

  return Array.from(new Set(normalizedSymbols));
};

const readStoredWatchlist = (): string[] => {
  if (typeof window === "undefined") return [];

  try {
    const storedValue = window.localStorage.getItem(WATCHLIST_STORAGE_KEY);
    if (!storedValue) return [];

    const parsed: unknown = JSON.parse(storedValue);
    return sanitizeSymbols(parsed);
  } catch {
    return [];
  }
};

const persistStoredWatchlist = (symbols: string[]) => {
  if (typeof window === "undefined") return;

  try {
    window.localStorage.setItem(WATCHLIST_STORAGE_KEY, JSON.stringify(symbols));
  } catch {
    // Ignore storage write failures to avoid breaking UI interactions.
  }
};

export const useWatchlist = () => {
  const [watchlistSymbols, setWatchlistSymbols] = useState<string[]>(
    readStoredWatchlist,
  );

  const toggleWatchlistSymbol = useCallback((symbol: string) => {
    const normalizedSymbol = symbol.trim().toUpperCase();

    setWatchlistSymbols((previousSymbols) => {
      const nextSymbols = previousSymbols.includes(normalizedSymbol)
        ? previousSymbols.filter((item) => item !== normalizedSymbol)
        : [...previousSymbols, normalizedSymbol];

      const sanitizedSymbols = sanitizeSymbols(nextSymbols);
      persistStoredWatchlist(sanitizedSymbols);
      return sanitizedSymbols;
    });
  }, []);

  const removeWatchlistSymbol = useCallback((symbol: string) => {
    const normalizedSymbol = symbol.trim().toUpperCase();

    setWatchlistSymbols((previousSymbols) => {
      const nextSymbols = previousSymbols.filter(
        (item) => item !== normalizedSymbol,
      );
      const sanitizedSymbols = sanitizeSymbols(nextSymbols);
      persistStoredWatchlist(sanitizedSymbols);
      return sanitizedSymbols;
    });
  }, []);

  const clearWatchlist = useCallback(() => {
    setWatchlistSymbols([]);
    persistStoredWatchlist([]);
  }, []);

  useEffect(() => {
    const handleStorageUpdate = (event: StorageEvent) => {
      if (event.key && event.key !== WATCHLIST_STORAGE_KEY) return;
      setWatchlistSymbols(readStoredWatchlist());
    };

    window.addEventListener("storage", handleStorageUpdate);

    return () => {
      window.removeEventListener("storage", handleStorageUpdate);
    };
  }, []);

  const watchlistSet = useMemo(
    () => new Set(watchlistSymbols),
    [watchlistSymbols],
  );

  return {
    watchlistSymbols,
    watchlistSet,
    toggleWatchlistSymbol,
    removeWatchlistSymbol,
    clearWatchlist,
  };
};
