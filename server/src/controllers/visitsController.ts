import type { CreateVisitInput, Visit } from "@clinica/shared";
import type { NextFunction, Request, Response } from "express";
import prisma from "../lib/prisma.js";
import { serializeVisit } from "../lib/serialize.ts";
import httpError from "../middleware/httpError.js";

export const getVisits = async (
  _req: Request,
  res: Response<Visit[]>,
  next: NextFunction,
) => {
  try {
    const visits = await prisma.visit.findMany({
      orderBy: { date: "desc" },
    });
    res.status(200).json(visits.map(serializeVisit));
  } catch (err) {
    next(err);
  }
};

export const createVisit = async (
  req: Request<unknown, Visit, CreateVisitInput>,
  res: Response<Visit>,
  next: NextFunction,
) => {
  try {
    const { patientId, date, summary } = req.body;

    const patient = await prisma.patient.findUnique({
      where: { id: patientId },
    });
    if (!patient) {
      throw httpError(404, "Patient not found");
    }

    const visit = await prisma.visit.create({
      data: {
        patientId,
        summary: summary ?? "",
        date: date ? new Date(date) : undefined,
      },
    });

    res.status(201).json(serializeVisit(visit));
  } catch (err) {
    next(err);
  }
};
