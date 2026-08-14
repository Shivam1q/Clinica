import request from "supertest";
import app from "../src/app.js";
import prisma from "../src/lib/prisma.js";

const doctor = {
  name: "Dr. Rao",
  email: "rao@clinica.test",
  password: "secret123",
};

describe("auth API", () => {
  describe("POST /api/auth/register", () => {
    it("creates a user, stores a hash, and sets a session cookie", async () => {
      const res = await request(app).post("/api/auth/register").send(doctor);

      expect(res.status).toBe(201);
      expect(res.headers["set-cookie"]).toEqual(
        expect.arrayContaining([expect.stringContaining("clinica_token=")]),
      );
      expect(res.body.user).toMatchObject({
        name: doctor.name,
        email: doctor.email,
        role: "doctor",
      });
      expect(res.body.user).not.toHaveProperty("passwordHash");
      expect(res.body).not.toHaveProperty("token");

      const stored = await prisma.user.findUnique({
        where: { email: doctor.email },
      });
      expect(stored.passwordHash).not.toBe(doctor.password);
      expect(stored.passwordHash.length).toBeGreaterThan(20);
    });

    it("returns 409 when email is already registered", async () => {
      await request(app).post("/api/auth/register").send(doctor);
      const res = await request(app).post("/api/auth/register").send(doctor);

      expect(res.status).toBe(409);
    });
  });

  describe("POST /api/auth/login", () => {
    it("sets a session cookie for valid credentials", async () => {
      await request(app).post("/api/auth/register").send(doctor);

      const res = await request(app).post("/api/auth/login").send({
        email: doctor.email,
        password: doctor.password,
      });

      expect(res.status).toBe(200);
      expect(res.headers["set-cookie"]).toEqual(
        expect.arrayContaining([expect.stringContaining("clinica_token=")]),
      );
      expect(res.body.user.email).toBe(doctor.email);
      expect(res.body.user).not.toHaveProperty("passwordHash");
    });

    it("returns 401 for a wrong password", async () => {
      await request(app).post("/api/auth/register").send(doctor);

      const res = await request(app).post("/api/auth/login").send({
        email: doctor.email,
        password: "nope",
      });

      expect(res.status).toBe(401);
    });
  });

  describe("GET /api/auth/me", () => {
    it("returns the doctor profile when the session cookie is present", async () => {
      const agent = request.agent(app);
      await agent.post("/api/auth/register").send(doctor);

      const res = await agent.get("/api/auth/me");

      expect(res.status).toBe(200);
      expect(res.body.email).toBe(doctor.email);
      expect(res.body).not.toHaveProperty("passwordHash");
    });

    it("returns 401 when the session is missing", async () => {
      const res = await request(app).get("/api/auth/me");
      expect(res.status).toBe(401);
    });
  });

  describe("POST /api/auth/logout", () => {
    it("clears the session cookie", async () => {
      const agent = request.agent(app);
      await agent.post("/api/auth/register").send(doctor);

      const logoutRes = await agent.post("/api/auth/logout");
      expect(logoutRes.status).toBe(204);

      const meRes = await agent.get("/api/auth/me");
      expect(meRes.status).toBe(401);
    });
  });
});
