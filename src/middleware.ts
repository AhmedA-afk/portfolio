import { NextRequest, NextResponse } from 'next/server';

// Define subdomain routing map
const SUBDOMAIN_ROUTES: Record<string, string> = {
    'docs': '/docs',
    'blog': '/blogs',
};

export function middleware(request: NextRequest) {
    const url = request.nextUrl.clone();
    const host = request.headers.get('host') || '';

    // Extract subdomain (e.g., "docs" from "docs.ahmedansari.me" or "docs.localhost:3000")
    // Handle both production and local development
    let subdomain: string | null = null;

    // Production: docs.ahmedansari.me
    if (host.includes('ahmedansari.me')) {
        const parts = host.split('.ahmedansari.me')[0];
        if (parts && parts !== 'www' && parts !== 'ahmedansari') {
            subdomain = parts;
        }
    }
    // Local development: docs.localhost:3000 or docs.localhost:3001
    else if (host.includes('localhost')) {
        const parts = host.split('.localhost')[0];
        if (parts && parts !== 'localhost') {
            subdomain = parts;
        }
    }

    // If we have a matching subdomain, rewrite the URL
    if (subdomain && SUBDOMAIN_ROUTES[subdomain]) {
        const basePath = SUBDOMAIN_ROUTES[subdomain];

        // If already on the correct path, don't rewrite (avoid infinite loop)
        if (url.pathname.startsWith(basePath)) {
            return NextResponse.next();
        }

        // Rewrite root of subdomain to the corresponding section
        // e.g., docs.ahmedansari.me/ -> /docs
        // e.g., docs.ahmedansari.me/getting-started -> /docs/getting-started
        if (url.pathname === '/' || url.pathname === '') {
            url.pathname = basePath;
        } else {
            url.pathname = `${basePath}${url.pathname}`;
        }

        return NextResponse.rewrite(url);
    }

    // For main domain, redirect /docs and /blogs to subdomains (optional)
    // Uncomment below if you want to force subdomain usage
    /*
    if (!subdomain) {
      if (url.pathname.startsWith('/docs')) {
        const newPath = url.pathname.replace('/docs', '') || '/';
        return NextResponse.redirect(new URL(newPath, `https://docs.ahmedansari.me`));
      }
      if (url.pathname.startsWith('/blogs')) {
        const newPath = url.pathname.replace('/blogs', '') || '/';
        return NextResponse.redirect(new URL(newPath, `https://blog.ahmedansari.me`));
      }
    }
    */

    return NextResponse.next();
}

export const config = {
    // Match all paths except static files and API routes
    matcher: [
        '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)',
    ],
};
