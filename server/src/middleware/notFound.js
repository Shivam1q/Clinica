const httpError = require("./httpError");

const notFound = (_req, _res, next) => {
  next(httpError(404, "Not found"));
};

module.exports = notFound;
