import request from "supertest";
import app from "../src/app.js";

describe("health API", () => {
  it("GET /api/health returns 200 and ok status", async () => {
    // Arrange
    const endpoint = "/api/health";

    // Act
    const res = await request(app).get(endpoint);

    // Assert
    expect(res.status).toBe(200);
    expect(res.body.status).toBe("ok");
    expect(res.body.service).toBe("clinica-api");
  });
});
