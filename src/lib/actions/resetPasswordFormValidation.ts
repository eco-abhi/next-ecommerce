import { ResetPasswordSchema } from "../schemas/ResetPasswordSchema"

export const resetPasswordFormValidation = (prev: any, formData: FormData) => {

    // Validate form data
    const validatedFields = ResetPasswordSchema.safeParse({
        email: formData.get('email'),
    })

    // If validation fails, return the error message
    if (!validatedFields.success) {
        return {
            ...prev,
            zodErrors: validatedFields.error.flatten().fieldErrors,
            message: "Missing required fields",
        };
    }

    // If validation passes, return the form data
    return {
        ...prev,
        zodErrors: {},
        formData: validatedFields.data,
    };

}