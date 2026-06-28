export interface Patient {
  id: string;
  name: string;
  age: number;
  sex: "male" | "female" | "other";
  phone: string;
  lastVisit?: string; // ISO date like '2026-06-20'; optional (new patients have none)
}
