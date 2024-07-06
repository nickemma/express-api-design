import express from "express";
import supertest from "supertest";
import { createNewUser } from "../handler/user_handler"; // Adjust the path accordingly

const app = express();
app.use(express.json());

// Register the route
app.post("/register", createNewUser);

describe("POST /", () => {
 it("should register a new user and return a message", async () => {
    const response = await supertest(app).post("/register").send({
      email: "tester@gmail.com",
      name: "Test User",
      password: "password",
    });

    expect(response.status).toBe(201);
    expect(response.body.message).toBe("Registered successfully");
  });

 it("should return an error if the user already exists", async () => {
    const response = await supertest(app).post("/register").send({
      email: "techieemma548@gmail.com",
      name: "Techie Emma",
      password: "admin",
    });

    expect(response.status).toBe(400);
    expect(response.body.error).toBe("User already exists");
  });
});