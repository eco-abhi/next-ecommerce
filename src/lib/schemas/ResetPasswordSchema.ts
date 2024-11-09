import { z } from 'zod';

export const ResetPasswordSchema = z.object({
    email: z.string({
        required_error: "Email is required",
    })
        .email({
            message: "Please enter a valid email address",
        })
        .trim()
        .toLowerCase(),
}).strict(); // Use strict() to reject unknown fields