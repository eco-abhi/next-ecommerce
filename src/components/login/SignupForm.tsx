'use client';

import { useWixClient } from "@/hooks/useWixClient";
import { useRouter } from "next/navigation";
import { LoginState } from "@wix/sdk";
import { useAuthStore, AuthMode } from "@/store/authStore";
import { useFormState } from "react-dom";
import { ZodErrors } from "@/components/layout/ZodErrors";
import { registerUserFormValidation } from "@/lib/actions/registerUserFormValidation";
import { useEffect } from "react";

const INITIAL_STATE: FormState = {
    data: null,
    zodErrors: null,
    message: null,
};

export const SignupForm = () => {
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
            // First, handle server-side validation (assuming you have a registerUserAction)
            // You'll need to create this action similar to the login one
            const serverResult = await registerUserFormValidation(prevState, formData);

            // If there are Zod errors, return them
            if (Object.keys(serverResult.zodErrors).length) {
                setIsLoading(false);
                return serverResult;
            }

            // Get form data
            const email = formData.get('email') as string;
            const password = formData.get('password') as string;
            const firstName = formData.get('firstname') as string;
            const lastName = formData.get('lastname') as string;

            const response = await wixClient.auth.register({
                email,
                password,
                profile: {
                    firstName,
                    lastName
                },
            });

            console.log('response:', response);

            switch (response?.loginState) {
                case LoginState.SUCCESS: {
                    setMessage("Registration successful! You can now log in.");
                    setMode(AuthMode.LOGIN);
                    break;
                }
                case LoginState.FAILURE: {
                    if (response.errorCode === "emailAlreadyExists") {
                        setError("This email is already registered. Please try logging in instead.");
                    } else {
                        setError("Registration failed. Please try again.");
                    }
                    break;
                }
                case LoginState.EMAIL_VERIFICATION_REQUIRED: {
                    setMode(AuthMode.EMAIL_VERIFICATION);
                    break;
                }
                default: {
                    setError("Unexpected registration state encountered");
                }
            }

            return serverResult;

        } catch (err) {
            console.error('Registration error:', err);
            setError("Failed to create account. Please try again later.");
            return {
                ...prevState,
                message: "Registration failed. Please try again later."
            };
        } finally {
            setIsLoading(false);
        }
    };

    const [formState, formAction] = useFormState(clientAction, INITIAL_STATE);

    return (

        <form
            className="flex flex-col gap-6 p-8 bg-white shadow-lg rounded-lg max-w-lg w-full overflow-y-auto"
            action={formAction}
            aria-label="Registration form"
        >
            <h1 className="text-3xl font-bold text-gray-800">Account Sign Up</h1>

            <div className="flex flex-col gap-2">
                <label htmlFor="firstname" className="text-lg font-semibold text-gray-700">
                    First Name
                </label>
                <input
                    id="firstname"
                    type="text"
                    name="firstname"
                    autoComplete="given-name"
                    className="border border-gray-300 rounded-lg p-4 focus:ring-2 focus:ring-blue-500"
                    aria-required="true"
                    aria-invalid={!!formState?.zodErrors?.firstname}
                    aria-describedby={formState?.zodErrors?.firstname ? "firstname-error" : undefined}
                />
                <ZodErrors error={formState?.zodErrors?.firstname} />
            </div>

            <div className="flex flex-col gap-2">
                <label htmlFor="lastname" className="text-lg font-semibold text-gray-700">
                    Last Name
                </label>
                <input
                    id="lastname"
                    type="text"
                    name="lastname"
                    autoComplete="family-name"
                    className="border border-gray-300 rounded-lg p-4 focus:ring-2 focus:ring-blue-500"
                    aria-required="true"
                    aria-invalid={!!formState?.zodErrors?.lastname}
                    aria-describedby={formState?.zodErrors?.lastname ? "lastname-error" : undefined}
                />
                <ZodErrors error={formState?.zodErrors?.lastname} />
            </div>

            <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-lg font-semibold text-gray-700">
                    E-mail
                </label>
                <input
                    id="email"
                    name="email"
                    autoComplete="email"
                    className="border border-gray-300 rounded-lg p-4 focus:ring-2 focus:ring-blue-500"
                    aria-required="true"
                    aria-invalid={!!formState?.zodErrors?.email}
                    aria-describedby={formState?.zodErrors?.email ? "email-error" : undefined}
                />
                <ZodErrors error={formState?.zodErrors?.email} />
            </div>

            <div className="flex flex-col gap-2">
                <label htmlFor="password" className="text-lg font-semibold text-gray-700">
                    Password
                </label>
                <input
                    id="password"
                    name="password"
                    autoComplete="new-password"
                    className="border border-gray-300 rounded-lg p-4 focus:ring-2 focus:ring-blue-500"
                    aria-required="true"
                    aria-invalid={!!formState?.zodErrors?.password}
                    aria-describedby={formState?.zodErrors?.password ? "password-error" : undefined}
                />
                <ZodErrors error={formState?.zodErrors?.password} />
            </div>

            <button
                type="submit"
                className="bg-blue-800 text-white rounded-lg py-3 text-lg font-bold transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed hover:bg-blue-700"
                disabled={isLoading}
                aria-busy={isLoading}
            >
                {isLoading ? "Loading..." : "Sign Up"}
            </button>

            {error && (
                <div className="text-red-600 px-4 py-2 bg-red-50 rounded-lg" role="alert" aria-live="assertive">
                    {error}
                </div>
            )}

            {message && (
                <div className="text-green-600 px-4 py-2 bg-green-50 rounded-lg" role="status" aria-live="polite">
                    {message}
                </div>
            )}

            <div className="text-center mt-6">
                <p className="text-gray-600 text-sm">Already have an account?</p>
                <button
                    type="button"
                    className="text-blue-700 underline hover:text-blue-900 text-sm"
                    onClick={() => setMode(AuthMode.LOGIN)}
                >
                    Log In
                </button>
            </div>
        </form>


    );
};