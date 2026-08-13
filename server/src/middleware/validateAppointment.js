const httpError = require("./httpError");

const validateAppointment = (req, _res, next) => {
  try {
    if (!req.body?.patientId) {
      throw httpError(400, "patientId is required");
    }
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = validateAppointment;
