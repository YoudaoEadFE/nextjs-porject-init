import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import authRoute from '@/utils/authRoute';
import { aes, isNoLoginPage } from '@/utils/util';
import { roleDefaultPage } from './constants';

// Middleware usage see https://nextjs.org/docs/advanced-features/middleware

export function middleware(req: NextRequest) {
  const {
    nextUrl: { pathname },
    cookies,
  } = req;

  const D_USER_STR = cookies.get('CM_USER') ?? '{}';
  const { role: encRole, token, userId, phone, email } = JSON.parse(D_USER_STR);
  const role = aes().decrypt(encRole ?? '');
  const isNoLogin = isNoLoginPage(pathname);

  if (isNoLogin) return;

  const url = req.nextUrl.clone();

  if (!token) {
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }

  if (pathname === '/') {
    url.pathname = roleDefaultPage[role] ?? '/login';
    return NextResponse.redirect(url);
  }

  const { isAuthRoute } = authRoute(role, pathname);

  if (!isAuthRoute) {
    url.pathname = '/403';
    return NextResponse.redirect(url);
  }
}

export const config = {
  matcher: '/((?!static|api|_next).*)',
};
