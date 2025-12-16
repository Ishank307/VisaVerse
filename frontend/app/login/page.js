'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { login } from '@/services/api';
import { saveAuth } from '@/utils/auth';

export default function LoginPage() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        rememberMe: false
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const result = await login({
                email: formData.email,
                password: formData.password
            });

            saveAuth(result.token, result.user);

            const redirectPath = localStorage.getItem('redirect_after_login');
            if (redirectPath) {
                localStorage.removeItem('redirect_after_login');
                router.push(redirectPath);
            } else {
                router.push('/');
            }
        } catch (err) {
            setError(err.message || 'Login failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-background-light dark:bg-background-dark">
            {/* Decorative Background Blobs */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-teal-200 dark:bg-yellow-900/10 rounded-full blur-[128px] -z-10 opacity-50 pointer-events-none"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-200 dark:bg-yellow-600/5 rounded-full blur-[128px] -z-10 opacity-50 pointer-events-none"></div>

            <main className="flex-grow flex items-center justify-center relative px-4 py-12">
                <div className="w-full max-w-md bg-white dark:bg-[#202018] rounded-2xl shadow-2xl border border-gray-100 dark:border-white/5 p-8 md:p-10 relative overflow-hidden">
                    {/* Top Accent Line */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-80"></div>

                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/20 dark:bg-primary/10 text-primary mb-4">
                            <span className="material-symbols-outlined text-2xl">lock_person</span>
                        </div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Welcome back</h1>
                        <p className="text-gray-500 dark:text-gray-400 text-sm">Sign in to your account to continue your journey</p>
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl">
                            <div className="flex items-center gap-2">
                                <span className="material-symbols-outlined text-red-600 dark:text-red-400 text-sm">error</span>
                                <p className="text-sm text-red-800 dark:text-red-300">{error}</p>
                            </div>
                        </div>
                    )}

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Email Field */}
                        <div className="space-y-2">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Email address
                            </label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <span className="material-symbols-outlined text-gray-400 group-focus-within:text-primary transition-colors">email</span>
                                </div>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-[#2A2A20] text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all text-sm"
                                    placeholder="you@example.com"
                                />
                            </div>
                        </div>

                        {/* Password Field */}
                        <div className="space-y-2">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Password
                            </label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <span className="material-symbols-outlined text-gray-400 group-focus-within:text-primary transition-colors">lock</span>
                                </div>
                                <input
                                    id="password"
                                    name="password"
                                    type={showPassword ? 'text' : 'password'}
                                    required
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    className="block w-full pl-10 pr-12 py-3 border border-gray-300 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-[#2A2A20] text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all text-sm"
                                    placeholder="Enter your password"
                                />
                                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 focus:outline-none"
                                    >
                                        <span className="material-symbols-outlined text-xl">
                                            {showPassword ? 'visibility_off' : 'visibility'}
                                        </span>
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Remember Me */}
                        <div className="flex items-center">
                            <input
                                id="remember-me"
                                name="remember-me"
                                type="checkbox"
                                checked={formData.rememberMe}
                                onChange={(e) => setFormData({ ...formData, rememberMe: e.target.checked })}
                                className="h-4 w-4 text-primary focus:ring-primary border-gray-300 dark:border-gray-600 rounded bg-gray-50 dark:bg-[#2A2A20]"
                            />
                            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-600 dark:text-gray-400">
                                Remember me
                            </label>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-full shadow-lg shadow-yellow-400/20 dark:shadow-none text-sm font-bold text-black bg-primary hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary dark:focus:ring-offset-gray-900 transition-all transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                        >
                            {loading ? (
                                <>
                                    <span className="material-symbols-outlined animate-spin">progress_activity</span>
                                    Signing in...
                                </>
                            ) : (
                                <>
                                    <span className="material-symbols-outlined text-lg">login</span>
                                    Sign in
                                </>
                            )}
                        </button>
                    </form>

                    {/* Sign Up Link */}
                    <div className="mt-8 text-center">
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            Don't have an account?{' '}
                            <Link href="/register" className="font-semibold text-teal-600 dark:text-primary hover:text-teal-500 dark:hover:text-yellow-300 transition-colors">
                                Create account
                            </Link>
                        </p>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="py-6 text-center text-xs text-gray-400 dark:text-gray-600">
                <p>© 2024 VisaVerse Assist. All rights reserved.</p>
            </footer>
        </div>
    );
}
