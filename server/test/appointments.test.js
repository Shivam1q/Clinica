import request from "supertest";
import app from "../src/app.js";
import prisma from "../src/lib/prisma.js";

describe("appointments API", () => {
  describe("GET /api/appointments", () => {
    it("returns 200 and appointments for a seeded patient", async () => {
      // Arrange
      const patient = await prisma.patient.create({
        data: { name: "Priya Nair", phone: "9823456712", age: 31 },
      });
      await prisma.appointment.create({
        data: {
          time: "09:00",
          reason: "General Check-up",
          patientId: patient.id,
          patientName: patient.name,
        },
      });

      // Act
      const res = await request(app).get("/api/appointments");

      // Assert
      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
      expect(
        res.body.some((appointment) => appointment.patientId === patient.id),
      ).toBe(true);
    });
  });

  describe("POST /api/appointments", () => {
    it("returns 201 and creates an appointment for an existing patient", async () => {
      // Arrange
      const patient = await prisma.patient.create({
        data: { name: "Aarav Mehta", phone: "9876543210", age: 24 },
      });
      const payload = {
        patientId: patient.id,
        time: "09:30",
        reason: "Fever Consultation",
      };

      // Act
      const res = await request(app).post("/api/appointments").send(payload);

      // Assert
      expect(res.status).toBe(201);
      expect(res.body.patientId).toBe(patient.id);
      expect(res.body.time).toBe("09:30");
      expect(res.body.reason).toBe("Fever Consultation");
      expect(res.body.patientName).toBe(patient.name);
    });

    it("returns 400 when patientId is missing", async () => {
      // Arrange
      const payload = { time: "10:00", reason: "Follow-up" };

      // Act
      const res = await request(app).post("/api/appointments").send(payload);

      // Assert
      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty("error");
    });

    it("returns 404 when patientId does not exist", async () => {
      // Arrange
      const payload = {
        patientId: "does-not-exist",
        time: "11:00",
        reason: "Ghost slot",
      };

      // Act
      const res = await request(app).post("/api/appointments").send(payload);

      // Assert
      expect(res.status).toBe(404);
      expect(res.body).toHaveProperty("error");
    });
  });
});
