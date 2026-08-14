import prisma from "../lib/prisma.js";
import bcrypt from "bcrypt";
import httpError from "../middleware/httpError.js";
import { signToken } from "../lib/jwt.js";
import { clearAuthCookie, setAuthCookie } from "../lib/authCookie.js";

const publicUser = (user) => ({
  id: user.id,
  name: user.name,
  email: user.email,
  role: user.role,
});

const startSession = (res, user) => {
  setAuthCookie(res, signToken(user));
  return publicUser(user);
};

export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        passwordHash,
      },
    });

    res.status(201).json({ user: startSession(res, user) });
  } catch (err) {
    if (err.code === "P2002") {
      return next(httpError(409, "Email already exists."));
    }
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
      where: { email },
    });

    const passwordOk =
      user && (await bcrypt.compare(password, user.passwordHash));

    if (!passwordOk) {
      throw httpError(401, "Invalid email or password");
    }

    res.status(200).json({ user: startSession(res, user) });
  } catch (err) {
    next(err);
  }
};

export const logout = (_req, res) => {
  clearAuthCookie(res);
  res.status(204).end();
};

export const me = async (req, res, next) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
    });

    if (!user) {
      throw httpError(401, "Invalid or expired token");
    }

    res.status(200).json(publicUser(user));
  } catch (err) {
    next(err);
  }
};
