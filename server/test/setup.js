import "./loadTestEnv.js";
import prisma from "../src/lib/prisma.js";

beforeAll(() => {
  if (process.env.NODE_ENV !== "test") {
    throw new Error("Refusing to run tests unless NODE_ENV=test (use npm test).");
  }

  if (!process.env.DATABASE_URL && !process.env.DIRECT_URL) {
    throw new Error("DATABASE_URL is missing. Copy .env.test.example to .env.test.");
  }
});

beforeEach(async () => {
  await prisma.auditLog.deleteMany();
  await prisma.visit.deleteMany();
  await prisma.appointment.deleteMany();
  await prisma.patient.deleteMany();
  await prisma.user.deleteMany();
});

afterAll(async () => {
  await prisma.$disconnect();
});
