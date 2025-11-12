import { z } from "zod";

export const createTaskSchema = z.object({
  title: z
    .string({
      error: "Title is required.", 
    })
    .min(1, { message: "Title cannot be empty." }), 

  description: z.string().nullable().optional(), 
});

export const updateTaskSchema = z.object({
  title: z
    .string()
    .min(1, { message: "Title cannot be empty." })
    .optional(),

  description: z.string().nullable().optional(),

  status: z
    .enum(["pending", "completed"], {
      message: "Status must be either 'pending' or 'completed'.",
    })
    .optional(),
});