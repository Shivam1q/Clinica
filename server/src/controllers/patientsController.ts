import type { Patient } from "@clinica/shared";
import type { CreatePatientBody } from "../schemas/patient.ts";
import type { NextFunction, Request, Response } from "express";
import prisma from "../lib/prisma.js";
import { serializePatient } from "../lib/serialize.ts";
import httpError from "../middleware/httpError.js";

export const getAllPatients = async (
  _req: Request,
  res: Response<Patient[]>,
  next: NextFunction,
) => {
  try {
    const patients = await prisma.patient.findMany({
      orderBy: { createdAt: "asc" },
    });
    res.status(200).json(patients.map(serializePatient));
  } catch (err) {
    next(err);
  }
};

export const getPatient = async (
  req: Request,
  res: Response<Patient>,
  next: NextFunction,
) => {
  try {
    const patient = await prisma.patient.findUnique({
      where: { id: req.params.id },
    });
    if (!patient) {
      throw httpError(404, "Patient not found");
    }
    res.status(200).json(serializePatient(patient));
  } catch (err) {
    next(err);
  }
};

export const createPatient = async (
  req: Request<unknown, Patient, CreatePatientBody>,
  res: Response<Patient>,
  next: NextFunction,
) => {
  try {
    const { name, age, phone, lastVisit } = req.body;

    const patient = await prisma.patient.create({
      data: {
        name,
        age: age ?? 0,
        phone,
        lastVisit: lastVisit ?? null,
      },
    });

    res.status(201).json(serializePatient(patient));
  } catch (err) {
    next(err);
  }
};
