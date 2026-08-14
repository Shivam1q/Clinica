import httpError from "./httpError.js";

const validateLogin = (req, _res, next) => {
  try {
    const email = String(req.body?.email ?? "")
      .trim()
      .toLowerCase();
    const password = req.body?.password;

    if (!email) {
      throw httpError(400, "Email is required.");
    }
    if (!password || String(password).trim() === "") {
      throw httpError(400, "Password is required.");
    }

    req.body.email = email;
    next();
  } catch (err) {
    next(err);
  }
};

export default validateLogin;
