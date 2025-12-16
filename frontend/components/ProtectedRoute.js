'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { isAuthenticated } from '../utils/auth';

export default function ProtectedRoute({ children }) {
    const router = useRouter();
    const [isChecking, setIsChecking] = useState(true);

    useEffect(() => {
        if (!isAuthenticated()) {
            // Save current path to redirect back after login
            const currentPath = window.location.pathname;
            localStorage.setItem('redirect_after_login', currentPath);
            router.push('/login');
        } else {
            setIsChecking(false);
        }
    }, [router]);

    if (isChecking) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <div className="size-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-text-secondary">Checking authentication...</p>
                </div>
            </div>
        );
    }

    return <>{children}</>;
}
