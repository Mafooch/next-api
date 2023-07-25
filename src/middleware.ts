import { NextResponse } from "next/server";

const allowedOrigins = process.env.NODE_ENV === 'production' ? [
  "https://example.com",
] : [
  "http://localhost:3000", "https://www.google.com"
]

// * by default, middleware is applied to all routes (not just api routes)
export function middleware(request: Request) {
  const origin = request.headers.get("origin");
  if (origin && !allowedOrigins.includes(origin)) {
    return new NextResponse(null, {
      status: 400,
      statusText: "Bad request",
      headers: {
        'Content-Type': 'text/plain'
      }
    })
  }

  console.log("middleware! ")
  console.log(request.method)
  console.log(request.url)
  console.log(origin)

  return NextResponse.next();
}

export const config = {
  matcher: '/api/:path*'
}