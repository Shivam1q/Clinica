const express = require("express");

const app = express();
const PORT = process.env.PORT || 4000;

app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "ok", service: "clinica-api" });
});

const server = app.listen(PORT, () => {
  console.log(`Server is running on PORT : ${PORT}.`);
  console.log(`Health: http://localhost:${PORT}/api/health`);
});
