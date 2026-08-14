import httpError from "./httpError.js";
import { readAuthToken } from "../lib/authCookie.js";
import { verifyToken } from "../lib/jwt.js";

const requireAuth = (req, _res, next) => {
  try {
    const token = readAuthToken(req);
    if (!token) {
      throw httpError(401, "Missing or invalid session");
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
