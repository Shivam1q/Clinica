import type { AuthSession, LoginInput, RegisterInput, User } from "@clinica/shared";
import bcrypt from "bcrypt";
import type { NextFunction, Request, Response } from "express";
import { clearAuthCookie, setAuthCookie } from "../lib/authCookie.js";
import { signToken } from "../lib/jwt.js";
import prisma from "../lib/prisma.js";
import { serializeUser } from "../lib/serialize.ts";
import httpError from "../middleware/httpError.js";

const startSession = (res: Response, user: User): User => {
  setAuthCookie(res, signToken(user));
  return user;
};

export const register = async (
  req: Request<unknown, AuthSession, RegisterInput>,
  res: Response<AuthSession>,
  next: NextFunction,
) => {
  try {
    const { name, email, password } = req.body;

    const passwordHash = await bcrypt.hash(password, 10);

    const created = await prisma.user.create({
      data: {
        name,
        email,
        passwordHash,
      },
    });

    const user = serializeUser(created);
    res.status(201).json({ user: startSession(res, user) });
  } catch (err) {
    if (err && typeof err === "object" && "code" in err && err.code === "P2002") {
      return next(httpError(409, "Email already exists."));
    }
    next(err);
  }
};

export const login = async (
  req: Request<unknown, AuthSession, LoginInput>,
  res: Response<AuthSession>,
  next: NextFunction,
) => {
  try {
    const { email, password } = req.body;

    const found = await prisma.user.findUnique({
      where: { email },
    });

    const passwordOk =
      found && (await bcrypt.compare(password, found.passwordHash));

    if (!found || !passwordOk) {
      throw httpError(401, "Invalid email or password");
    }

    const user = serializeUser(found);
    res.status(200).json({ user: startSession(res, user) });
  } catch (err) {
    next(err);
  }
};

export const logout = (_req: Request, res: Response) => {
  clearAuthCookie(res);
  res.status(204).end();
};

export const me = async (req: Request, res: Response<User>, next: NextFunction) => {
  try {
    const session = req.user;
    if (!session) {
      throw httpError(401, "Missing or invalid session");
    }

    const found = await prisma.user.findUnique({
      where: { id: session.id },
    });

    if (!found) {
      throw httpError(401, "Invalid or expired token");
    }

    res.status(200).json(serializeUser(found));
  } catch (err) {
    next(err);
  }
};
