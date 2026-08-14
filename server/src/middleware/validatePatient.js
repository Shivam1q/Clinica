import httpError from "./httpError.js";

const validatePatient = (req, _res, next) => {
  try {
    const name = req.body?.name;
    const phone = req.body?.phone;

    if (!name || String(name).trim() === "") {
      throw httpError(400, "Name is required");
    }

    const digits = String(phone ?? "").replace(/\D/g, "");
    if (digits.length < 10) {
      throw httpError(400, "Phone must have at least 10 digits");
    }

    if (req.body?.age !== undefined && req.body?.age !== "") {
      const ageNum = Number(req.body.age);
      if (!Number.isInteger(ageNum) || ageNum <= 0) {
        throw httpError(400, "Age must be a positive whole number");
      }
    }

    next();
  } catch (err) {
    next(err);
  }
};

export default validatePatient;
