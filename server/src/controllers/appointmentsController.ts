import type { Appointment } from "@clinica/shared";
import type { CreateAppointmentBody } from "../schemas/appointment.ts";
import type { NextFunction, Request, Response } from "express";
import prisma from "../lib/prisma.js";
import { serializeAppointment } from "../lib/serialize.ts";
import httpError from "../middleware/httpError.js";

export const getAppointments = async (
  _req: Request,
  res: Response<Appointment[]>,
  next: NextFunction,
) => {
  try {
    const appointments = await prisma.appointment.findMany({
      orderBy: { createdAt: "asc" },
    });
    res.status(200).json(appointments.map(serializeAppointment));
  } catch (err) {
    next(err);
  }
};

export const createAppointment = async (
  req: Request<unknown, Appointment, CreateAppointmentBody>,
  res: Response<Appointment>,
  next: NextFunction,
) => {
  try {
    const { time, patientId, patientName, reason } = req.body;

    const patient = await prisma.patient.findUnique({
      where: { id: patientId },
    });
    if (!patient) {
      throw httpError(404, "Patient not found");
    }

    const appointment = await prisma.appointment.create({
      data: {
        time:
          time ??
          new Date().toLocaleTimeString("en-GB", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          }),
        patientId,
        patientName: patientName ?? patient.name,
        reason: reason ?? "",
      },
    });

    res.status(201).json(serializeAppointment(appointment));
  } catch (err) {
    next(err);
  }
};
