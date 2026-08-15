import type { NextFunction, Request, Response } from "express";
import type { ZodType } from "zod";
import httpError from "./httpError.js";

const fieldErrors = (error: { issues: { path: PropertyKey[]; message: string }[] }) => {
  const fields: Record<string, string> = {};
  for (const issue of error.issues) {
    const path = issue.path.map(String).join(".") || "body";
    if (!fields[path]) {
      fields[path] = issue.message;
    }
  }
  return fields;
};

export const validateBody =
  <T>(schema: ZodType<T>) =>
  (req: Request, _res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      return next(
        httpError(400, "Validation failed", { fields: fieldErrors(result.error) }),
      );
    }
    req.body = result.data;
    next();
  };
