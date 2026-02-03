import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
    const url = request.nextUrl.clone();
    const host = request.headers.get('host') || '';

    // Redirect subdomains to main domain paths
    if (host.startsWith('docs.')) {
        url.host = host.replace('docs.', 'www.');
        url.pathname = `/docs${url.pathname === '/' ? '' : url.pathname}`;
        return NextResponse.redirect(url);
    }

    if (host.startsWith('blog.')) {
        url.host = host.replace('blog.', 'www.');
        url.pathname = `/blogs${url.pathname === '/' ? '' : url.pathname}`;
        return NextResponse.redirect(url);
    }

    return NextResponse.next();
}

export const config = {
    // Match all paths except static files and API routes
    matcher: [
        '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)',
    ],
};
