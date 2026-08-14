import httpError from "./httpError.js";
import prisma from "../lib/prisma.js";

const validateRegister = async (req, _res, next) => {
  try {
    const name = req.body?.name;
    const email = String(req.body?.email ?? "")
      .trim()
      .toLowerCase();
    const password = req.body?.password;

    if (!name || String(name).trim() === "") {
      throw httpError(400, "Name is required");
    }
    if (!email) {
      throw httpError(400, "Email is required.");
    }

    const existing = await prisma.user.findUnique({
      where: { email },
    });
    if (existing) {
      throw httpError(409, "Email already exists.");
    }

    if (!password || String(password).trim() === "") {
      throw httpError(400, "Password is required.");
    }

    req.body.email = email;
    req.body.name = String(name).trim();
    next();
  } catch (err) {
    next(err);
  }
};

export default validateRegister;
