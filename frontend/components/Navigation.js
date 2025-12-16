'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { isAuthenticated, getCurrentUser, clearAuth } from '../utils/auth';

export default function Navigation() {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [mounted, setMounted] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        setMounted(true);

        // Check auth on mount
        if (isAuthenticated()) {
            setUser(getCurrentUser());
        }

        // Listen for auth changes (login/logout from same page)
        const handleAuthChange = () => {
            if (isAuthenticated()) {
                setUser(getCurrentUser());
            } else {
                setUser(null);
            }
        };

        // Listen for custom auth-change event
        window.addEventListener('auth-change', handleAuthChange);

        // Listen for storage changes (login/logout from other tabs)
        window.addEventListener('storage', handleAuthChange);

        return () => {
            window.removeEventListener('auth-change', handleAuthChange);
            window.removeEventListener('storage', handleAuthChange);
        };
    }, []);

    const handleLogout = () => {
        clearAuth();
        setUser(null);
        setMobileMenuOpen(false);
        router.push('/');
    };

    // Prevent hydration mismatch
    if (!mounted) {
        return (
            <header className="sticky top-0 z-50 w-full border-b border-[#e6e6dd] bg-background-light/80 backdrop-blur-md dark:border-white/10 dark:bg-background-dark/80">
                <div className="layout-container flex justify-center w-full">
                    <div className="flex max-w-[1280px] flex-1 items-center justify-between px-6 py-4 lg:px-10">
                        <Link href="/" className="flex items-center gap-3 text-text-main dark:text-white">
                            <div className="flex size-8 items-center justify-center rounded-full bg-primary text-black">
                                <span className="material-symbols-outlined" style={{ fontSize: '20px', fontWeight: 600 }}>
                                    travel_explore
                                </span>
                            </div>
                            <h2 className="text-lg font-bold leading-tight tracking-tight">VisaVerse Assist</h2>
                        </Link>
                    </div>
                </div>
            </header>
        );
    }

    return (
        <header className="sticky top-0 z-50 w-full border-b border-[#e6e6dd] bg-background-light/80 backdrop-blur-md dark:border-white/10 dark:bg-background-dark/80">
            <div className="layout-container flex justify-center w-full">
                <div className="flex max-w-[1280px] flex-1 items-center justify-between px-6 py-4 lg:px-10">
                    <Link href="/" className="flex items-center gap-3 text-text-main dark:text-white">
                        <div className="flex size-8 items-center justify-center rounded-full bg-primary text-black">
                            <span className="material-symbols-outlined" style={{ fontSize: '20px', fontWeight: 600 }}>
                                travel_explore
                            </span>
                        </div>
                        <h2 className="text-lg font-bold leading-tight tracking-tight">VisaVerse Assist</h2>
                    </Link>

                    <nav className="hidden md:flex items-center gap-8">
                        <Link href="/" className="text-sm font-medium hover:text-primary transition-colors">
                            Home
                        </Link>
                        <Link href="/visa-assistant" className="text-sm font-medium hover:text-primary transition-colors">
                            Visa Assistant
                        </Link>
                        <Link href="/document-analyzer" className="text-sm font-medium hover:text-primary transition-colors">
                            Document Analysis
                        </Link>
                        <Link href="/about" className="text-sm font-medium hover:text-primary transition-colors">
                            About
                        </Link>
                    </nav>

                    <div className="flex items-center gap-4">
                        {user ? (
                            // Logged in state
                            <>
                                <div className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full bg-black/5 dark:bg-white/10">
                                    <span className="material-symbols-outlined text-primary">person</span>
                                    <span className="text-sm font-medium">{user.name}</span>
                                </div>
                                <button
                                    onClick={handleLogout}
                                    className="flex min-w-[84px] cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-full bg-primary hover:bg-[#ece805] px-5 py-2.5 text-black text-sm font-bold transition-all transform active:scale-95 shadow-soft"
                                >
                                    <span className="material-symbols-outlined text-lg">logout</span>
                                    <span className="truncate">Logout</span>
                                </button>
                            </>
                        ) : (
                            // Logged out state
                            <>
                                <Link href="/login" className="hidden sm:flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-full bg-black/5 dark:bg-white/10 hover:bg-black/10 px-5 py-2.5 text-sm font-bold transition-colors">
                                    <span className="truncate">Log In</span>
                                </Link>
                                <Link href="/register" className="hidden sm:flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-full bg-primary hover:bg-[#ece805] px-5 py-2.5 text-black text-sm font-bold transition-all transform active:scale-95 shadow-soft">
                                    <span className="truncate">Get Started</span>
                                </Link>
                            </>
                        )}

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="md:hidden text-text-main dark:text-white p-2 hover:bg-black/5 dark:hover:bg-white/10 rounded-lg transition-colors"
                        >
                            <span className="material-symbols-outlined text-2xl">
                                {mobileMenuOpen ? 'close' : 'menu'}
                            </span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            {mobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 md:hidden"
                    onClick={() => setMobileMenuOpen(false)}
                />
            )}

            {/* Mobile Menu Slide-out */}
            <div
                className={`fixed top-0 right-0 h-full w-64 bg-white dark:bg-[#202018] shadow-2xl z-50 transform transition-transform duration-300 ease-in-out md:hidden ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
                    }`}
            >
                <div className="flex flex-col h-full">
                    {/* Mobile Menu Header */}
                    <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-white/10">
                        <h3 className="text-lg font-bold">Menu</h3>
                        <button
                            onClick={() => setMobileMenuOpen(false)}
                            className="p-2 hover:bg-black/5 dark:hover:bg-white/10 rounded-lg transition-colors"
                        >
                            <span className="material-symbols-outlined">close</span>
                        </button>
                    </div>

                    {/* User Info (if logged in) */}
                    {user && (
                        <div className="px-6 py-4 bg-black/5 dark:bg-white/5 border-b border-gray-200 dark:border-white/10">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                                    <span className="material-symbols-outlined text-black">person</span>
                                </div>
                                <div>
                                    <p className="font-semibold text-sm">{user.name}</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">{user.email}</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Navigation Links */}
                    <nav className="flex-1 px-6 py-4 space-y-2">
                        <Link
                            href="/"
                            onClick={() => setMobileMenuOpen(false)}
                            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
                        >
                            <span className="material-symbols-outlined">home</span>
                            <span className="font-medium">Home</span>
                        </Link>
                        <Link
                            href="/visa-assistant"
                            onClick={() => setMobileMenuOpen(false)}
                            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
                        >
                            <span className="material-symbols-outlined">assistant</span>
                            <span className="font-medium">Visa Assistant</span>
                        </Link>
                        <Link
                            href="/document-analyzer"
                            onClick={() => setMobileMenuOpen(false)}
                            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
                        >
                            <span className="material-symbols-outlined">description</span>
                            <span className="font-medium">Document Analysis</span>
                        </Link>
                        <Link
                            href="/about"
                            onClick={() => setMobileMenuOpen(false)}
                            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
                        >
                            <span className="material-symbols-outlined">info</span>
                            <span className="font-medium">About</span>
                        </Link>
                    </nav>

                    {/* Mobile Auth Buttons */}
                    <div className="p-6 border-t border-gray-200 dark:border-white/10 space-y-3">
                        {user ? (
                            <button
                                onClick={handleLogout}
                                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-full bg-primary hover:bg-[#ece805] text-black font-bold transition-all"
                            >
                                <span className="material-symbols-outlined">logout</span>
                                <span>Logout</span>
                            </button>
                        ) : (
                            <>
                                <Link
                                    href="/login"
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="w-full flex items-center justify-center px-4 py-3 rounded-full bg-black/5 dark:bg-white/10 hover:bg-black/10 font-bold transition-colors"
                                >
                                    Log In
                                </Link>
                                <Link
                                    href="/register"
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="w-full flex items-center justify-center px-4 py-3 rounded-full bg-primary hover:bg-[#ece805] text-black font-bold transition-all"
                                >
                                    Get Started
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}
