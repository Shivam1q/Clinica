export type Appointment = {
  id: string;
  time: string;
  reason: string;
  patientId: string;
  patientName: string;
  createdAt: string;
};

export type CreateAppointmentInput = {
  patientId: string;
  time?: string;
  reason?: string;
  patientName?: string;
};
