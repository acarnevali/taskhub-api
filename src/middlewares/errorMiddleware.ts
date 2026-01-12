import type { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";

export function errorMiddleware(
  error: any,
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

  const errorMessage = error.message?.toLowerCase() || "";
  
  if (
    error.code === "P2002" || 
    errorMessage.includes("already in use") || 
    errorMessage.includes("already exists")
  ) {
    return res.status(409).json({ error: "Email already in use." });
  }

  return res.status(500).json({ 
    error: "Internal server error.",
    debugMessage: error.message, 
    debugCode: error.code
  });
}