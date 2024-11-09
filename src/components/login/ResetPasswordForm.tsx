import { useWixClient } from "@/hooks/useWixClient";
import { useRouter } from "next/navigation";
import { useAuthStore, AuthMode } from "@/store/authStore";
import { useFormState } from "react-dom";
import { resetPasswordFormValidation } from "@/lib/actions/resetPasswordFormValidation";
import { errorCodes } from "@/lib/constants/errorCodes";
import { ZodErrors } from "@/components/layout/ZodErrors";
import { use, useEffect } from "react";

type FormState = {
    data: any;
    zodErrors: Record<string, string[]> | null;
    message: string | null;
};

const INITIAL_STATE: FormState = {
    data: null,
    zodErrors: null,
    message: null,
};

function ResetPasswordForm() {
    const wixClient = useWixClient();
    const router = useRouter();
    const {
        setMode,
        isLoading,
        setIsLoading,
        error,
        setError,
        message,
        setMessage
    } = useAuthStore();

    useEffect(() => {
        setError("");
        setMessage("");
    }, [])

    const clientAction = async (prevState: FormState, formData: FormData) => {
        setIsLoading(true);
        setError("");
        setMessage("");

        try {
            // First, handle server-side validation
            const serverResult = await resetPasswordFormValidation(prevState, formData);

            // If there are Zod errors, return them
            if (serverResult.zodErrors && Object.keys(serverResult.zodErrors).length) {
                setIsLoading(false);
                console.log("serverResult.zodErrors:", serverResult.zodErrors);
                return serverResult;
            }

            // Get the email from the formData
            const email = formData.get('email') as string;
            const resetUrl = typeof window !== "undefined"
                ? `${window.location.origin}/account/login`
                : "/account/login";

            // Attempt to send the password reset email
            const response = await wixClient.auth.sendPasswordResetEmail(email, resetUrl);

            // If successful, set a success message
            setMessage("Password reset email sent successfully.");
            console.log("Reset password response:", response);

        } catch (error: any) {
            // Handle any errors during the process
            try {
                // Attempt to parse error details
                const errorCode = JSON.parse(error.message)?.details?.applicationError?.code?.toLowerCase();
                const errorMessage = errorCode && errorCodes[errorCode as keyof typeof errorCodes]
                    ? errorCodes[errorCode as keyof typeof errorCodes]
                    : "Failed to send reset email. Please try again.";

                setError(errorMessage);
                console.error("Reset password error:", errorMessage);

            } catch (parseError) {
                // Handle parsing errors gracefully
                console.error("Error parsing reset error message:", parseError);
                setError("An unexpected error occurred while sending the reset email.");
            }
        } finally {
            setIsLoading(false);
        }

        // Return the message and any additional data in case it's needed
        return {
            ...prevState,
            message,
        };
    };




    const [formState, formAction] = useFormState(clientAction, INITIAL_STATE);

    console.log("formState:", formState);

    return (
        <form
            action={formAction}
            className="space-y-6 p-8 bg-white shadow-lg rounded-lg max-w-md w-full mx-auto"
        >
            <h1 className="text-3xl font-bold text-gray-800 text-center">Reset Password</h1>

            <div className="flex flex-col gap-2">
                <label
                    htmlFor="email"
                    className="text-lg font-semibold text-gray-700"
                >
                    Email Address
                </label>
                <input
                    id="email"
                    name="email"
                    className="border border-gray-300 rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your email"
                // aria-invalid={!!formState.zodErrors?.email}
                // aria-describedby={formState.zodErrors?.email ? "email-error" : undefined}
                />

                <ZodErrors error={formState?.zodErrors?.email} />

            </div>

            <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-blue-800 text-white rounded-lg py-3 text-lg font-bold transition-colors hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                aria-busy={isLoading}
            >
                {isLoading ? 'Sending...' : 'Reset Password'}
            </button>

            {message && (
                <p className="text-sm text-green-600 text-center mt-4" role="status">
                    {message}
                </p>
            )}
            {error ? (
                <p className="text-sm text-red-600 text-center mt-4" role="alert">
                    {error}
                </p>
            ) : formState.message ? (
                <p className="text-sm text-gray-600 text-center mt-4">
                    {formState.message}
                </p>
            ) : null}
        </form>


    );
}

export default ResetPasswordForm;