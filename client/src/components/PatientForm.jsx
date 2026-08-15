import { useState } from "react";
import { usePatients } from "../hooks/usePatients";

const PatientForm = ({ disabled = false }) => {
  const { createPatient, isCreating } = usePatients();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [age, setAge] = useState("");
  const [formError, setFormError] = useState("");

  const resetFields = () => {
    setName("");
    setPhone("");
    setAge("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const trimmedName = name.trim();
    const digitsOnlyPhone = phone.replace(/\D/g, "");
    const parsedAge = age === "" ? null : Number(age);

    if (!trimmedName) {
      setFormError("Name is required.");
      return;
    }

    if (digitsOnlyPhone.length < 10) {
      setFormError("Phone must have at least 10 digits.");
      return;
    }

    if (age !== "" && (!Number.isInteger(parsedAge) || parsedAge <= 0)) {
      setFormError("Age must be a positive whole number.");
      return;
    }

    setFormError("");

    try {
      await createPatient({
        name: trimmedName,
        phone: digitsOnlyPhone,
        age: parsedAge ?? "",
        lastVisit: "—",
      });
      resetFields();
    } catch {
      // API failure already surfaces as a global error toast.
    }
  };

  return (
    <section className="patient-form-panel">
      <div className="patient-form-header">
        <h3>Add patient</h3>
      </div>

      <form className="patient-form" onSubmit={handleSubmit} noValidate>
        <div className="form-field">
          <label htmlFor="patient-name">Name</label>
          <input
            id="patient-name"
            name="name"
            type="text"
            value={name}
            disabled={disabled || isCreating}
            onChange={(e) => {
              setName(e.target.value);
              setFormError("");
            }}
            placeholder="Full name"
            autoComplete="name"
          />
        </div>

        <div className="form-field">
          <label htmlFor="patient-age">Age</label>
          <input
            id="patient-age"
            name="age"
            type="text"
            inputMode="numeric"
            value={age}
            disabled={disabled || isCreating}
            onChange={(e) => {
              setAge(e.target.value);
              setFormError("");
            }}
            placeholder="Optional"
          />
        </div>

        <div className="form-field">
          <label htmlFor="patient-phone">Phone</label>
          <input
            id="patient-phone"
            name="phone"
            type="text"
            inputMode="tel"
            value={phone}
            disabled={disabled || isCreating}
            onChange={(e) => {
              setPhone(e.target.value);
              setFormError("");
            }}
            placeholder="10-digit phone"
            autoComplete="tel"
          />
        </div>

        {formError ? <p className="form-error">{formError}</p> : null}

        <button type="submit" className="btn" disabled={disabled || isCreating}>
          {isCreating ? "Saving…" : "Add patient"}
        </button>
      </form>
    </section>
  );
};

export default PatientForm;
