import httpError from "./httpError.js";

const notFound = (_req, _res, next) => {
  next(httpError(404, "Not found"));
};

export default notFound;
