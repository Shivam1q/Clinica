import "dotenv/config";
import bcrypt from "bcrypt";
import prisma from "../src/lib/prisma.js";

const DOCTOR_PASSWORD = "clinica123";

const clean = async () => {
  await prisma.auditLog.deleteMany();
  await prisma.visit.deleteMany();
  await prisma.appointment.deleteMany();
  await prisma.patient.deleteMany();
  await prisma.user.deleteMany();
};

const seed = async () => {
  const doctor = await prisma.user.create({
    data: {
      email: "doctor@clinica.local",
      name: "Dr. Kavya Rao",
      passwordHash: await bcrypt.hash(DOCTOR_PASSWORD, 10),
      role: "doctor",
    },
  });

  const aarav = await prisma.patient.create({
    data: {
      name: "Aarav Mehta",
      age: 24,
      phone: "9876543210",
      lastVisit: "2026-07-28",
    },
  });

  const priya = await prisma.patient.create({
    data: {
      name: "Priya Nair",
      age: 31,
      phone: "9823456712",
      lastVisit: "2026-08-01",
    },
  });

  const neha = await prisma.patient.create({
    data: {
      name: "Neha Sharma",
      age: 29,
      phone: "9811122233",
      lastVisit: "2026-08-02",
    },
  });

  await prisma.visit.create({
    data: {
      date: new Date("2026-07-28"),
      summary: "Viral fever — advised rest and fluids",
      patientId: aarav.id,
      userId: doctor.id,
    },
  });

  await prisma.visit.create({
    data: {
      date: new Date("2026-08-01"),
      summary: "Annual check-up — labs within normal range",
      patientId: priya.id,
      userId: doctor.id,
    },
  });

  await prisma.appointment.create({
    data: {
      time: "09:00",
      reason: "General Check-up",
      patientId: priya.id,
      patientName: priya.name,
    },
  });

  await prisma.appointment.create({
    data: {
      time: "09:30",
      reason: "Fever Consultation",
      patientId: aarav.id,
      patientName: aarav.name,
    },
  });

  await prisma.auditLog.create({
    data: {
      action: "SEED",
      meta: "Development seed completed",
      userId: doctor.id,
    },
  });

  console.log("Seeded:");
  console.log("- 1 doctor:", doctor.email, `(password: ${DOCTOR_PASSWORD})`);
  console.log("- 3 patients:", aarav.name, priya.name, neha.name);
  console.log("- 2 visits, 2 appointments, 1 audit log");
};

const main = async () => {
  if (process.env.NODE_ENV === "production") {
    console.error("Seed is disabled in production.");
    process.exit(1);
  }

  try {
    await clean();
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    await prisma.$disconnect();
  }
};

main();
