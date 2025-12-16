'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { register } from '@/services/api';
import { saveAuth } from '@/utils/auth';

export default function RegisterPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        agreedToTerms: false
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        // Validation
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        if (!formData.agreedToTerms) {
            setError('You must agree to the terms and conditions');
            return;
        }

        setLoading(true);

        try {
            const result = await register({
                name: formData.name,
                email: formData.email,
                password: formData.password
            });

            // Save auth and redirect
            saveAuth(result.token, result.user);
            router.push('/');
        } catch (err) {
            setError(err.message || 'Registration failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-background-light dark:bg-background-dark">
            {/* Decorative Background Blobs */}
            <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute bottom-[-10%] left-[-5%] w-96 h-96 bg-blue-500/5 dark:bg-blue-400/5 rounded-full blur-3xl pointer-events-none"></div>

            <main className="flex-grow flex items-center justify-center p-4 relative overflow-hidden">
                <div className="w-full max-w-md bg-white dark:bg-[#1E1E1E] rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-8 md:p-10 relative z-10">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="flex justify-center mb-4">
                            <div className="bg-primary/20 dark:bg-primary/10 p-3 rounded-full">
                                <div className="bg-primary rounded-full p-2 flex items-center justify-center shadow-glow">
                                    <span className="material-symbols-outlined text-black text-2xl">person_add</span>
                                </div>
                            </div>
                        </div>
                        <h1 className="text-2xl md:text-3xl font-bold mb-2 text-gray-900 dark:text-white">Create your account</h1>
                        <p className="text-gray-500 dark:text-gray-400 text-sm">Start your visa journey today</p>
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
                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Full Name */}
                        <div className="space-y-1.5">
                            <label htmlFor="fullname" className="block text-sm font-medium text-gray-900 dark:text-white ml-1">
                                Full name
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                                    <span className="material-symbols-outlined text-gray-500 dark:text-gray-400 text-lg">person</span>
                                </div>
                                <input
                                    id="fullname"
                                    name="fullname"
                                    type="text"
                                    required
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="block w-full pl-10 pr-4 py-2.5 text-sm border border-gray-300 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-800/50 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
                                    placeholder="John Doe"
                                />
                            </div>
                        </div>

                        {/* Email */}
                        <div className="space-y-1.5">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-900 dark:text-white ml-1">
                                Email address
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                                    <span className="material-symbols-outlined text-gray-500 dark:text-gray-400 text-lg">mail</span>
                                </div>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="block w-full pl-10 pr-4 py-2.5 text-sm border border-gray-300 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-800/50 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
                                    placeholder="you@example.com"
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div className="space-y-1.5">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-900 dark:text-white ml-1">
                                Password
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                                    <span className="material-symbols-outlined text-gray-500 dark:text-gray-400 text-lg">lock</span>
                                </div>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    className="block w-full pl-10 pr-4 py-2.5 text-sm border border-gray-300 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-800/50 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
                                    placeholder="Create a strong password"
                                />
                            </div>
                        </div>

                        {/* Confirm Password */}
                        <div className="space-y-1.5">
                            <label htmlFor="confirm_password" className="block text-sm font-medium text-gray-900 dark:text-white ml-1">
                                Confirm password
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                                    <span className="material-symbols-outlined text-gray-500 dark:text-gray-400 text-lg">check_circle</span>
                                </div>
                                <input
                                    id="confirm_password"
                                    name="confirm_password"
                                    type="password"
                                    required
                                    value={formData.confirmPassword}
                                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                    className="block w-full pl-10 pr-4 py-2.5 text-sm border border-gray-300 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-800/50 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
                                    placeholder="Re-enter your password"
                                />
                            </div>
                        </div>

                        {/* Terms & Conditions */}
                        <div className="flex items-start mt-4">
                            <div className="flex items-center h-5">
                                <input
                                    id="terms"
                                    name="terms"
                                    type="checkbox"
                                    checked={formData.agreedToTerms}
                                    onChange={(e) => setFormData({ ...formData, agreedToTerms: e.target.checked })}
                                    className="h-4 w-4 text-primary bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-700 rounded focus:ring-primary focus:ring-offset-0 cursor-pointer"
                                />
                            </div>
                            <div className="ml-3 text-sm">
                                <label htmlFor="terms" className="font-light text-gray-600 dark:text-gray-400">
                                    I agree to the{' '}
                                    <a href="#" className="font-medium text-primary hover:underline">
                                        Terms and Conditions
                                    </a>{' '}
                                    and{' '}
                                    <a href="#" className="font-medium text-primary hover:underline">
                                        Privacy Policy
                                    </a>
                                </label>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full flex items-center justify-center gap-2 py-3 px-4 border border-transparent rounded-xl shadow-lg shadow-primary/20 text-sm font-bold text-black bg-primary hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                        >
                            {loading ? (
                                <>
                                    <span className="material-symbols-outlined animate-spin">progress_activity</span>
                                    Creating account...
                                </>
                            ) : (
                                <>
                                    <span className="material-symbols-outlined text-lg">person_add_alt</span>
                                    Create account
                                </>
                            )}
                        </button>
                    </form>

                    {/* Sign In Link */}
                    <div className="mt-6 text-center text-sm">
                        <span className="text-gray-600 dark:text-gray-400">Already have an account?</span>
                        <Link href="/login" className="font-semibold text-primary hover:text-yellow-400 hover:underline ml-1">
                            Sign in
                        </Link>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="w-full py-6 text-center text-xs text-gray-400 dark:text-gray-600 relative z-10">
                <p>© 2024 VisaVerse Assist. All rights reserved.</p>
            </footer>
        </div>
    );
}
