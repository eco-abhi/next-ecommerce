import React from "react";
import { LoginSchema } from "../schemas/LoginSchema";

export const loginUserFormValidation = (prevState: any, formData: FormData) => {

    // Validate form data
    const validatedFields = LoginSchema.safeParse({
        email: formData.get("email"),
        password: formData.get("password"),
    });


    // If validation fails, return the error message
    if (!validatedFields.success) {
        return {
            ...prevState,
            zodErrors: validatedFields.error.flatten().fieldErrors,
            message: "Missing required fields",
        };
    }

    // If validation passes, return the form data
    return {
        ...prevState,
        zodErrors: {},
        formData: validatedFields.data,
    };
}
