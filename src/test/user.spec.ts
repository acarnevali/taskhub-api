import { describe, it, expect } from "vitest";
import request from "supertest";
import { app } from "../app.js"; 

describe("User Flow", () => {
  it("deve ser capaz de criar um novo usuário", async () => {
    const randomEmail = `test-${Math.random()}@example.com`;

    const response = await request(app)
      .post("/users")
      .send({
        name: "Test User",
        email: randomEmail,
        password: "password123"
      });

    expect(response.status).toBe(201);
    
    expect(response.body).toHaveProperty("id");
    expect(response.body).not.toHaveProperty("password");
    expect(response.body.email).toBe(randomEmail);
  });

  it("não deve ser capaz de criar um usuário com email repetido", async () => {
  const email = "duplicate@example.com";

  await request(app).post("/users").send({
    name: "User 1",
    email: email,
    password: "password123"
  });

  const response = await request(app).post("/users").send({
    name: "User 2",
    email: email,
    password: "password123"
  });

  if (response.status === 500) {
    console.log("🚨 DETALHES DO ERRO 500:", response.body);
  }

  expect(response.status).toBe(409);
});
  });
