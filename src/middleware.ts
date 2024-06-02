import { auth } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT, apiAuthPrefix, authRoutes, publicRoutes } from "@/routes";

export default auth((req) => {
  // const { nextUrl } = req;
  // const isLoggedIn = !!req.auth;
  // const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  // const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  // const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  // if (isApiAuthRoute) {
  //   return;
  // }
  // if (isAuthRoute) {
  //   if (isLoggedIn) {
  //     return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
  //   }
  //   return;
  // }
  // if (!isLoggedIn && !isPublicRoute) {
  //   return Response.redirect(new URL(`/auth/login`, nextUrl));
  //   // let callbackUrl = nextUrl.pathname;
  //   // if (nextUrl.search) {
  //   //   callbackUrl += nextUrl.search;
  //   // }
  //   // const encondedCallbackUrl = encodeURIComponent(callbackUrl);
  //   // return Response.redirect(new URL(`/auth/login?callbackUrl=${encondedCallbackUrl}`, nextUrl));
  // }
  // return;
});

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
