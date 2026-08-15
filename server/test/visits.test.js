import request from "supertest";
import app from "../src/app.js";
import prisma from "../src/lib/prisma.js";

describe("visits API", () => {
  describe("GET /api/visits", () => {
    it("returns 200 and visits for a seeded patient", async () => {
      // Arrange
      const patient = await prisma.patient.create({
        data: { name: "Visit Patient", phone: "9000000000", age: 40 },
      });
      await prisma.visit.create({
        data: {
          patientId: patient.id,
          summary: "Follow-up",
        },
      });

      // Act
      const res = await request(app).get("/api/visits");

      // Assert
      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body.some((visit) => visit.patientId === patient.id)).toBe(
        true,
      );
    });
  });

  describe("POST /api/visits", () => {
    it("returns 201 and creates a visit for an existing patient", async () => {
      // Arrange
      const patient = await prisma.patient.create({
        data: { name: "Visit Patient 2", phone: "9111111111", age: 33 },
      });
      const payload = {
        patientId: patient.id,
        summary: "New consult",
      };

      // Act
      const res = await request(app).post("/api/visits").send(payload);

      // Assert
      expect(res.status).toBe(201);
      expect(res.body.patientId).toBe(patient.id);
      expect(res.body.summary).toBe("New consult");
    });

    it("returns 400 when patientId is missing", async () => {
      // Arrange
      const payload = { summary: "No patient" };

      // Act
      const res = await request(app).post("/api/visits").send(payload);

      // Assert
      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty("error");
    });

    it("returns 400 with field errors when patientId is not a string", async () => {
      const payload = { patientId: 123, summary: "Bad id type" };

      const res = await request(app).post("/api/visits").send(payload);

      expect(res.status).toBe(400);
      expect(res.body.error).toBe("Validation failed");
      expect(res.body.fields).toHaveProperty("patientId");
    });

    it("returns 404 when patientId does not exist", async () => {
      // Arrange
      const payload = {
        patientId: "does-not-exist",
        summary: "Ghost visit",
      };

      // Act
      const res = await request(app).post("/api/visits").send(payload);

      // Assert
      expect(res.status).toBe(404);
      expect(res.body).toHaveProperty("error");
    });
  });
});
