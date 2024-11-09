'use client';

import { useWixClient } from "@/hooks/useWixClient";
import { useRouter } from "next/navigation";
import { LoginState } from "@wix/sdk";
import Cookies from "js-cookie";
import { useAuthStore, AuthMode } from "@/store/authStore";
import { useFormState } from "react-dom";
import { loginUserFormValidation } from "@/lib/actions/loginUserFormValidation";
import { ZodErrors } from "@/components/layout/ZodErrors";
import { useEffect } from "react";

const INITIAL_STATE: FormState = {
    data: null,
    zodErrors: null,
    message: null,
};

export const LoginForm = () => {
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

    // Server Action with client state
    const clientAction = async (prevState: FormState, formData: FormData) => {
        setIsLoading(true);
        setError("");
        setMessage("");

        try {
            // First, handle server-side validation
            const serverResult = await loginUserFormValidation(prevState, formData);

            // If there are Zod errors, return them
            if (Object.keys(serverResult.zodErrors).length) {
                setIsLoading(false);
                return serverResult;
            }

            // If server validation passes, proceed with Wix authentication
            const email = formData.get('email') as string;
            const password = formData.get('password') as string;

            const response = await wixClient.auth.login({ email, password });

            switch (response?.loginState) {
                case LoginState.SUCCESS: {
                    setMessage("Login successful! Redirecting...");
                    const tokens = await wixClient.auth.getMemberTokensForDirectLogin(
                        response.data.sessionToken || ""
                    );
                    Cookies.set("refreshToken", JSON.stringify(tokens.refreshToken), {
                        expires: 2,
                        secure: process.env.NODE_ENV === 'production',
                        sameSite: 'strict'
                    });
                    wixClient.auth.setTokens(tokens);
                    router.push("/");
                    break;
                }
                case LoginState.FAILURE:
                    setError("Invalid email or password!");
                    break;

                case LoginState.EMAIL_VERIFICATION_REQUIRED:
                    setMode(AuthMode.EMAIL_VERIFICATION);
                    break;

                default:
                    setError("Unexpected login state encountered");
            }

            return serverResult;

        } catch (err) {
            console.error('Login error:', err);
            setError("Authentication failed. Please try again later.");
            return {
                ...prevState,
                message: "Authentication failed. Please try again later."
            };
        } finally {
            setIsLoading(false);
        }
    };

    const [formState, formAction] = useFormState(clientAction, INITIAL_STATE);

    return (
        <form
            className="flex flex-col gap-6 p-8 bg-white shadow-lg rounded-lg max-w-lg w-full"
            action={formAction}
            aria-label="Login form"
        >
            <h1 className="text-3xl font-bold text-gray-800">Account Login</h1>

            <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-lg font-semibold text-gray-700">
                    Email Address
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
                    autoComplete="current-password"
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
                {isLoading ? "Loading..." : "Log in"}
            </button>

            <button
                type="button"
                className="text-sm underline text-blue-800 self-end hover:text-blue-600 transition-colors"
                onClick={() => setMode(AuthMode.RESET_PASSWORD)}
            >
                Forgot your password?
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
                <p className="text-gray-600 text-sm">New here? Or shopped with us, but didn’t sign up?</p>
                <button
                    type="button"
                    className="mt-2 border-2 border-blue-800 text-blue-800 rounded-lg py-3 px-8 text-lg font-bold transition-colors hover:bg-blue-800 hover:text-white"
                    onClick={() => setMode(AuthMode.REGISTER)}
                >
                    Sign Up
                </button>
            </div>
        </form>

    );
};