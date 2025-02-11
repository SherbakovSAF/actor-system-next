import { MiddlewareConfig, NextRequest, NextResponse } from "next/server";
import { callApiFetch } from "@/services/base.service";
import { CookiesName } from "@/types/cookies-name.type";
import { RoutePath_E } from "@/types/route-path.type";
import { getPayloadJWTToken } from "@/lib/jwt-tokens.lib";
import { getCookieValue } from "@/lib/cookies-handler.lib";

export const middleware = async (request: NextRequest) => {
  // Получаем access токен
  const accessToken = request.cookies.get(CookiesName.AccessToken)?.value;
  const parsedAccessToken = await getPayloadJWTToken(accessToken ?? "").catch(
    () => null
  );

  // Перебрасываем на NotFound, чтобы пользователь не переходил на auth авторизированным
  if (
    parsedAccessToken &&
    request.nextUrl.pathname.startsWith(RoutePath_E.AUTH)
  )
    return NextResponse.rewrite(new URL(RoutePath_E.NOT_FOUND, request.url));

  // Доп проверка, чтобы избежать множества переадресаций
  if (request.nextUrl.pathname.startsWith(RoutePath_E.AUTH))
    return NextResponse.next();

  // Если просто есть токен и идёт на не Auth, то добро пожаловать
  if (parsedAccessToken) return NextResponse.next();

  // Если же токена нет, то смотрим, есть ли refresh
  const refreshToken = request.cookies.get(CookiesName.RefreshToken)?.value;
  const parsedRefreshToken = await getPayloadJWTToken(refreshToken ?? "").catch(
    () => null
  );

  // Refresh нет - будь добр авторизуйся
  if (!parsedRefreshToken)
    return NextResponse.redirect(new URL(RoutePath_E.AUTH, request.url));
  const userAgent = request.headers.get("user-agent") || "unknown";

  // Делаем запрос через Fetch, т.к EdgeRuntime, передаём header для записи agent
  const responseFetch = await callApiFetch("GET", "/auth/refresh", null, null, {
    ...request.headers,
    "user-agent": userAgent,
  });

  // Parse запроса на получение из Headers accessToken
  const accessTokenFromServer = getCookieValue(
    responseFetch.headers.getSetCookie(),
    CookiesName.AccessToken
  );

  // Если не пришёл access, что вряд ли, то авторизация
  if (!accessTokenFromServer)
    return NextResponse.redirect(new URL(RoutePath_E.AUTH, request.url));

  // Т.к middleware  выполняется на сервере, то нам надо перекинуть полученные set-cookie клиенту
  const response = NextResponse.next();
  response.cookies.set(CookiesName.AccessToken, accessTokenFromServer);
  return response;
};

export const config: MiddlewareConfig = {
  // matcher: ["/", "/:path*", "/auth", "/auth/:path*", "/admin", "/admin/:path*"],
  matcher: ["/", "/auth", "/admin", "/settings"],
};
