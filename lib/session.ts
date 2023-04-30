import { withIronSessionApiRoute } from 'iron-session/next';
import { NextApiHandler } from 'next';

export function withNextSession(apiRoute: NextApiHandler) {
  return withIronSessionApiRoute(apiRoute, {
    password: process.env.SECRET_COOKIE_PASSWORD!,
    cookieName: 'user-session',
    cookieOptions: {
      secure: process.env.NODE_ENV === 'production',
    },
  });
}
