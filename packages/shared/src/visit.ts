export type Visit = {
  id: string;
  date: string;
  summary: string;
  patientId: string;
  userId: string | null;
};

export type CreateVisitInput = {
  patientId: string;
  summary?: string;
  date?: string;
};
