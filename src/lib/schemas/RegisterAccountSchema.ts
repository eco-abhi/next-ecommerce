import { z } from 'zod';

export const RegisterAccountSchema = z.object({
    firstname: z.string({
        required_error: "First name is required",
    })
        .min(2, {
            message: "First name must be at least 2 characters",
        })
        .trim()
        .refine(name => /^[a-zA-Z\s-']+$/.test(name), {
            message: "First name can only contain letters, spaces, hyphens and apostrophes",
        }),

    lastname: z.string({
        required_error: "Last name is required",
    })
        .min(2, {
            message: "Last name must be at least 2 characters",
        })
        .trim()
        .refine(name => /^[a-zA-Z\s-']+$/.test(name), {
            message: "Last name can only contain letters, spaces, hyphens and apostrophes",
        }),

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
    })
        .min(3, {
            message: "Password must be at least 3 characters",
        })
        .max(100, {
            message: "Password must be less than 100 characters",
        })
        // Optional: Add password strength requirements
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, {
            message: "Password must contain at least one uppercase letter, one lowercase letter, and one number",
        }),
}).strict(); // Use strict() instead of passthrough() to reject unknown fields