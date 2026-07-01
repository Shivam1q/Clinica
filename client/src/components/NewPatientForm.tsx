import { useState } from "react";
import type { Patient } from "../types";

interface NewPatientFormProps {
  onAdd: (patient: Omit<Patient, "id">) => void;
}

const NewPatientForm = ({ onAdd }: NewPatientFormProps) => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [sex, setSex] = useState<Patient["sex"]>("male");
  const [phone, setPhone] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onAdd({ name, age: Number(age), sex, phone });
    setName("");
    setAge("");
    setSex("male");
    setPhone("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Add patient</h3>
      <label htmlFor="name">Name</label>
      <input id="name" value={name} onChange={(e) => setName(e.target.value)} />

      <label htmlFor="age">Age</label>
      <input
        id="age"
        type="number"
        value={age}
        onChange={(e) => setAge(e.target.value)}
      />

      <label htmlFor="sex">Sex</label>
      <select
        id="sex"
        value={sex}
        onChange={(e) => setSex(e.target.value as Patient["sex"])}
      >
        <option value="male">male</option>
        <option value="female">female</option>
        <option value="other">other</option>
      </select>

      <label htmlFor="phone">Phone</label>
      <input
        id="phone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />

      <button type="submit">Add patient</button>
    </form>
  );
};

export default NewPatientForm;
