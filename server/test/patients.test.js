import request from "supertest";
import app from "../src/app.js";
import prisma from "../src/lib/prisma.js";

describe("patients API", () => {
  describe("GET /api/patients", () => {
    it("returns 200 and an empty array when no patients exist", async () => {
      // Arrange
      // beforeEach already cleared the test database

      // Act
      const res = await request(app).get("/api/patients");

      // Assert
      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body).toHaveLength(0);
    });

    it("returns 200 and an array of patients", async () => {
      // Arrange
      await prisma.patient.create({
        data: { name: "Aarav Mehta", phone: "9876543210", age: 24 },
      });

      // Act
      const res = await request(app).get("/api/patients");

      // Assert
      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body.length).toBeGreaterThan(0);
      expect(res.body[0]).toHaveProperty("id");
      expect(res.body[0]).toHaveProperty("name");
    });
  });

  describe("GET /api/patients/:id", () => {
    it("returns 200 and the matching patient", async () => {
      // Arrange
      const patient = await prisma.patient.create({
        data: { name: "Priya Nair", phone: "9823456712", age: 31 },
      });

      // Act
      const res = await request(app).get(`/api/patients/${patient.id}`);

      // Assert
      expect(res.status).toBe(200);
      expect(res.body.id).toBe(patient.id);
      expect(res.body.name).toBe("Priya Nair");
    });

    it("returns 404 when the patient does not exist", async () => {
      // Arrange
      const missingId = "does-not-exist";

      // Act
      const res = await request(app).get(`/api/patients/${missingId}`);

      // Assert
      expect(res.status).toBe(404);
      expect(res.body).toHaveProperty("error");
    });
  });

  describe("POST /api/patients", () => {
    it("returns 201 and persists a valid patient", async () => {
      // Arrange
      const payload = {
        name: "Neha Sharma",
        phone: "9811122233",
        age: 29,
      };

      // Act
      const res = await request(app).post("/api/patients").send(payload);
      const inDb = await prisma.patient.findUnique({
        where: { id: res.body.id },
      });

      // Assert
      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty("id");
      expect(res.body.name).toBe(payload.name);
      expect(res.body.phone).toBe(payload.phone);
      expect(inDb).not.toBeNull();
    });

    it("returns 400 when name is missing", async () => {
      // Arrange
      const payload = { phone: "9123456789" };

      // Act
      const res = await request(app).post("/api/patients").send(payload);

      // Assert
      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty("error");
    });

    it("returns 400 when name is only whitespace", async () => {
      // Arrange
      const payload = { name: "   ", phone: "9123456789" };

      // Act
      const res = await request(app).post("/api/patients").send(payload);

      // Assert
      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty("error");
    });

    it("returns 400 when phone has fewer than 10 digits", async () => {
      // Arrange
      const payload = { name: "Rohan Kapoor", phone: "123" };

      // Act
      const res = await request(app).post("/api/patients").send(payload);

      // Assert
      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty("error");
    });

    it("returns 400 when age is not a positive whole number", async () => {
      // Arrange
      const payload = {
        name: "Rohan Kapoor",
        phone: "9912345678",
        age: -1,
      };

      // Act
      const res = await request(app).post("/api/patients").send(payload);

      // Assert
      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty("error");
    });
  });
});
