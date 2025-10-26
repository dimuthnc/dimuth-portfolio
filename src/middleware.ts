import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export function middleware(req: NextRequest) {
  const url = new URL(req.url)
  const hostname = url.hostname
  // Do not enforce on localhost/dev
  if (hostname === 'localhost' || hostname === '127.0.0.1') return NextResponse.next()

  // Redirect www to apex
  if (hostname.startsWith('www.')) {
    url.hostname = hostname.replace(/^www\./, '')
    return NextResponse.redirect(url, 308)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    // Exclude Next.js internals and static assets
    '/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)',
  ],
}

