import type { Appointment, Patient, Role, User, Visit } from "@clinica/shared";

const asRole = (role: string): Role => {
  if (role === "doctor" || role === "receptionist" || role === "patient") {
    return role;
  }
  return "doctor";
};

export const serializePatient = (patient: {
  id: string;
  name: string;
  age: number;
  phone: string;
  lastVisit: string | null;
  createdAt: Date;
}): Patient => ({
  id: patient.id,
  name: patient.name,
  age: patient.age,
  phone: patient.phone,
  lastVisit: patient.lastVisit,
  createdAt: patient.createdAt.toISOString(),
});

export const serializeVisit = (visit: {
  id: string;
  date: Date;
  summary: string;
  patientId: string;
  userId: string | null;
}): Visit => ({
  id: visit.id,
  date: visit.date.toISOString(),
  summary: visit.summary,
  patientId: visit.patientId,
  userId: visit.userId,
});

export const serializeAppointment = (appointment: {
  id: string;
  time: string;
  reason: string;
  patientId: string;
  patientName: string;
  createdAt: Date;
}): Appointment => ({
  id: appointment.id,
  time: appointment.time,
  reason: appointment.reason,
  patientId: appointment.patientId,
  patientName: appointment.patientName,
  createdAt: appointment.createdAt.toISOString(),
});

export const serializeUser = (user: {
  id: string;
  name: string;
  email: string;
  role: string;
}): User => ({
  id: user.id,
  name: user.name,
  email: user.email,
  role: asRole(user.role),
});
