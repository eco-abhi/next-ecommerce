import { z } from 'zod';

export const LoginSchema = z.object({
    email: z.string({
        required_error: "Email is required",
    })
        .email({
            message: "Please enter a valid email address",
        })
        .trim()
        .toLowerCase(),

    password: z.string({
        required_error: "Password is required",
    }).min(1, "Password must be at least 3 characters long"),


}).strict(); // Use strict() to reject unknown fields
