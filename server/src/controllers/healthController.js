const getHealth = (_req, res) => {
  res.status(200).json({ status: "ok", service: "clinica-api" });
};

export { getHealth };
