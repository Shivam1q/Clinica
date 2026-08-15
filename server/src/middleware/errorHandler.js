const errorHandler = (err, _req, res, _next) => {
  if (err.type === "entity.parse.failed") {
    return res.status(400).json({ error: "Malformed JSON body" });
  }

  if (err.code === "P2003") {
    return res.status(404).json({ error: "Related record not found" });
  }

  const status = err.status || err.statusCode || 500;
  if (status >= 500) {
    console.error(err);
  }

  const message =
    status === 500 ? "Internal server error" : err.message || "Request failed";

  const payload = { error: message };
  if (err.fields) {
    payload.fields = err.fields;
  }

  res.status(status).json(payload);
};

export default errorHandler;
