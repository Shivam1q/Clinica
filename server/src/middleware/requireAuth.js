import httpError from "./httpError.js";
import { verifyToken } from "../lib/jwt.js";

const requireAuth = (req, _res, next) => {
  try {
    const header = req.headers.authorization || "";
    const [scheme, token] = header.split(" ");

    if (scheme !== "Bearer" || !token) {
      throw httpError(401, "Missing or invalid Authorization header");
    }

    const payload = verifyToken(token);
    req.user = {
      id: payload.sub,
      email: payload.email,
      role: payload.role,
    };
    next();
  } catch (err) {
    next(err);
  }
};

export default requireAuth;
