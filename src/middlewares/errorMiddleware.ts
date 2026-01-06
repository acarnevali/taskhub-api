import type { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";

export function errorMiddleware(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (error instanceof ZodError) {
    return res.status(400).json({
      error: "Validation failed.",
      issues: error.flatten().fieldErrors,
    });
  }

  if (error.message === "Task not found." || error.message === "User not found.") {
    return res.status(404).json({ error: error.message });
  }

  if (error.message === "Forbidden.") {
    return res.status(403).json({ error: "Forbidden: You do not own this resource." });
  }

  if (error.message.includes("User already exists") || error.message.includes("email is already in use")) {
    return res.status(409).json({ error: error.message });
  }

  if (error.message.includes("Invalid credentials")) {
    return res.status(401).json({ error: error.message });
  }

  console.error("Internal Server Error:", error);
  return res.status(500).json({ error: "Internal server error." });
}