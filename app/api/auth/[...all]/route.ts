import type { NextRequest } from "next/server";
import { getAuth } from "@/lib/better-auth/auth";
import { toNextJsHandler } from "better-auth/next-js";

const getHandlers = async () => {
  const auth = await getAuth();
  if (!auth) {
    throw new Error("Auth initialization failed");
  }

  return toNextJsHandler(auth);
};

export const GET = async (request: NextRequest) => {
  const handlers = await getHandlers();
  return handlers.GET(request);
};

export const POST = async (request: NextRequest) => {
  const handlers = await getHandlers();
  return handlers.POST(request);
};
