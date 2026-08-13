const errorHandler = (err, _req, res, _next) => {
  console.error(err);

  if (err.type === "entity.parse.failed") {
    return res.status(400).json({ error: "Malformed JSON body" });
  }

  const status = err.status || err.statusCode || 500;
  const message =
    status === 500 ? "Internal server error" : err.message || "Request failed";

  res.status(status).json({ error: message });
};

module.exports = errorHandler;
