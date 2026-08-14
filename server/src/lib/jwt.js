import jwt from "jsonwebtoken";
import httpError from "../middleware/httpError.js";

const getSecret = () => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw httpError(500, "JWT_SECRET is not configured");
  }
  return secret;
};

export const signToken = (user) =>
  jwt.sign(
    { sub: user.id, email: user.email, role: user.role },
    getSecret(),
    { expiresIn: "7d" },
  );

export const verifyToken = (token) => {
  try {
    return jwt.verify(token, getSecret());
  } catch {
    throw httpError(401, "Invalid or expired token");
  }
};