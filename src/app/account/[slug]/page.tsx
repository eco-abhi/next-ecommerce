'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { AuthContainer } from '@/components/login/AuthContainer';
import { useAuthStore, AuthMode } from '@/store/authStore';

const slugToMode: Record<string, AuthMode> = {
    'login': AuthMode.LOGIN,
    'register': AuthMode.REGISTER,
    'reset-password': AuthMode.RESET_PASSWORD,
    'email-verification': AuthMode.EMAIL_VERIFICATION,
    'reset-password-requested': AuthMode.RESET_PASSWORD_REQUESTED
};

const isValidSlug = (slug: string): slug is keyof typeof slugToMode => {
    return slug in slugToMode;
};

export default function AuthPage() {
    const params = useParams();
    const router = useRouter();
    const { setMode } = useAuthStore();
    const slug = params?.slug as string;
    const [isInitialized, setIsInitialized] = useState(false);

    useEffect(() => {
        if (!isValidSlug(slug)) {
            router.push('/account/login');
            setMode(AuthMode.LOGIN);
        } else {
            setMode(slugToMode[slug]);
        }
        setIsInitialized(true);
    }, [slug, router, setMode]);

    if (!isInitialized) {
        return null; // or return a loading spinner
    }
    return <AuthContainer />;
}