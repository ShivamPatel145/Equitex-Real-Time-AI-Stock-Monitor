import type { NextRequest } from "next/server";
import { middleware } from "./middleware";

export function proxy(request: NextRequest) {
  return middleware(request);
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sign-in|sign-up|assets).*)",
  ],
};
