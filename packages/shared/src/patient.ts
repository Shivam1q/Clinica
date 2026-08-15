export type Patient = {
  id: string;
  name: string;
  age: number;
  phone: string;
  lastVisit: string | null;
  createdAt: string;
};

export type CreatePatientInput = {
  name: string;
  phone: string;
  age?: number | string;
  lastVisit?: string | null;
};
