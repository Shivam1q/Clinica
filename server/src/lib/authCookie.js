export const AUTH_COOKIE = "clinica_token";

const cookieOptions = {
  httpOnly: true,
  sameSite: "lax",
  secure: process.env.NODE_ENV === "production",
  path: "/",
  maxAge: 7 * 24 * 60 * 60 * 1000,
};

export const setAuthCookie = (res, token) => {
  res.cookie(AUTH_COOKIE, token, cookieOptions);
};

export const clearAuthCookie = (res) => {
  res.clearCookie(AUTH_COOKIE, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
  });
};

export const readAuthToken = (req) => {
  const fromCookie = req.cookies?.[AUTH_COOKIE];
  if (fromCookie) {
    return fromCookie;
  }

  const header = req.headers.authorization || "";
  const [scheme, token] = header.split(" ");
  if (scheme === "Bearer" && token) {
    return token;
  }

  return null;
};
