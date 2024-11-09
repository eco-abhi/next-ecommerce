'use client';

import { useEffect } from "react";
import { useWixClient } from "@/hooks/useWixClient";
import { useRouter } from "next/navigation";
import { useAuthStore, AuthMode } from "@/store/authStore";
import { LoginForm } from "./LoginForm";
import { SignupForm } from "./SignupForm";
import ResetPasswordForm from "./ResetPasswordForm";
import ResetPasswordRequested from "./ResetPasswordRequested";

export const AuthContainer = () => {
    const wixClient = useWixClient();
    const router = useRouter();
    const { mode } = useAuthStore();
    const isLoggedIn = wixClient.auth.loggedIn();

    useEffect(() => {
        if (isLoggedIn) {
            router.push("/");
            return;
        }

        // Update URL based on mode
        const routes = {
            [AuthMode.LOGIN]: '/account/login',
            [AuthMode.REGISTER]: '/account/register',
            [AuthMode.RESET_PASSWORD]: '/account/reset-password',
            [AuthMode.EMAIL_VERIFICATION]: '/account/email-verification',
            [AuthMode.RESET_PASSWORD_REQUESTED]: '/account/reset-password-requested'
        };

        const newRoute = routes[mode];
        // Use replace instead of push to avoid adding to browser history
        router.push(newRoute);
    }, [isLoggedIn, mode, router]);

    return (
        <div className="h-[calc(100vh-80px)] px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 flex items-center justify-center">
            {mode === AuthMode.LOGIN && <LoginForm />}
            {mode === AuthMode.REGISTER && <SignupForm />}
            {mode === AuthMode.RESET_PASSWORD && <ResetPasswordForm />}
            {mode === AuthMode.RESET_PASSWORD_REQUESTED && <ResetPasswordRequested />}
        </div>
    );
};