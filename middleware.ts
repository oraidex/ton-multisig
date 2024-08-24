import { NextRequest, NextResponse } from "next/server";

const allowedOrigins = process.env.NEXT_PUBLIC_ORIGIN.split(",");
// || [
//   "http://localhost:3000",
//   "https://multisig-ton.oraidex.io/",
// ];

const corsOptions = {
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export function middleware(request: NextRequest) {
  // Check the origin from the request
  const origin = request.headers.get("origin") ?? "";
  const isAllowedOrigin = allowedOrigins.includes(origin);

  if (!isAllowedOrigin) {
    return new NextResponse("Not allowed by CORS", { status: 403 });
  }

  // If the origin is allowed, continue the request
  return NextResponse.next();
}

export const config = {
  matcher: "/api/:path*",
};
