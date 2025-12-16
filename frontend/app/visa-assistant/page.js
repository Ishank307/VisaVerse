'use client';

import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import ProtectedRoute from '../../components/ProtectedRoute';

function VisaAssistantContent() {
    const [formData, setFormData] = useState({
        origin: '',
        destination: '',
        purpose: 'work',
        duration: 'more-than-90'
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [roadmapData, setRoadmapData] = useState(null);

    const handleGenerateRoadmap = async () => {
        // Validate form
        if (!formData.origin || !formData.destination) {
            setError('Please select both origin and destination countries');
            return;
        }

        setLoading(true);
        setError('');

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/visa-guidance`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    origin: formData.origin,
                    destination: formData.destination,
                    purpose: formData.purpose,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to generate roadmap');
            }

            if (data.success) {
                setRoadmapData(data);  // Backend returns {success, guidance, metadata}
            } else {
                throw new Error(data.error || 'Failed to generate roadmap');
            }
        } catch (err) {
            console.error('Error generating roadmap:', err);
            setError(err.message || 'Failed to generate roadmap. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col lg:flex-row min-h-screen w-full">
            {/* Left Column: Input Panel */}
            <aside className="w-full lg:w-[480px] flex flex-col border-r border-[#e9e8ce] dark:border-[#3a392a] bg-white dark:bg-[#1c1c0c] overflow-y-auto shadow-lg">
                <div className="p-8 flex flex-col h-full">
                    <div className="mb-8">
                        <h1 className="text-3xl font-black tracking-tight mb-2">Plan Your Journey</h1>
                        <p className="text-text-muted text-sm leading-relaxed">
                            Our AI analyzes thousands of regulations to provide you with the most accurate visa roadmap.
                        </p>
                    </div>

                    <form className="flex flex-col gap-6 flex-1">
                        {/* Origin */}
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-wider text-text-muted ml-2">Traveling From</label>
                            <div className="relative group">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted group-focus-within:text-primary transition-colors">
                                    <span className="material-symbols-outlined">flight_takeoff</span>
                                </span>
                                <select
                                    className="w-full h-14 pl-12 pr-10 bg-background-light dark:bg-background-dark border-none rounded-xl text-text-main dark:text-white font-medium focus:ring-2 focus:ring-primary transition-shadow cursor-pointer"
                                    value={formData.origin}
                                    onChange={(e) => setFormData({ ...formData, origin: e.target.value })}
                                >
                                    <option value="">Select Origin Country</option>
                                    <option value="in">India</option>
                                    <option value="br">Brazil</option>
                                    <option value="ng">Nigeria</option>
                                    <option value="cn">China</option>
                                    <option value="us">United States</option>
                                </select>
                            </div>
                        </div>

                        {/* Destination */}
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-wider text-text-muted ml-2">Traveling To</label>
                            <div className="relative group">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted group-focus-within:text-primary transition-colors">
                                    <span className="material-symbols-outlined">flight_land</span>
                                </span>
                                <select
                                    className="w-full h-14 pl-12 pr-10 bg-background-light dark:bg-background-dark border-none rounded-xl text-text-main dark:text-white font-medium focus:ring-2 focus:ring-primary transition-shadow cursor-pointer"
                                    value={formData.destination}
                                    onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                                >
                                    <option value="">Select Destination</option>
                                    <option value="ca">Canada</option>
                                    <option value="uk">United Kingdom</option>
                                    <option value="de">Germany</option>
                                    <option value="au">Australia</option>
                                    <option value="ae">UAE</option>
                                </select>
                            </div>
                        </div>

                        {/* Purpose */}
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-wider text-text-muted ml-2">Purpose of Visit</label>
                            <div className="grid grid-cols-3 gap-3">
                                {['school', 'work', 'beach_access'].map((icon, idx) => {
                                    const labels = ['Study', 'Work', 'Tourism'];
                                    const value = labels[idx].toLowerCase();
                                    return (
                                        <label key={value} className="cursor-pointer">
                                            <input
                                                type="radio"
                                                name="purpose"
                                                value={value}
                                                checked={formData.purpose === value}
                                                onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
                                                className="peer sr-only"
                                            />
                                            <div className="flex flex-col items-center justify-center h-24 rounded-xl border-2 border-transparent bg-background-light dark:bg-background-dark peer-checked:border-primary peer-checked:bg-primary/10 transition-all hover:bg-black/5 dark:hover:bg-white/5">
                                                <span className="material-symbols-outlined mb-1 text-text-muted peer-checked:text-text-main">{icon}</span>
                                                <span className="text-sm font-bold text-text-muted peer-checked:text-text-main">{labels[idx]}</span>
                                            </div>
                                        </label>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Duration */}
                        <div className="space-y-2 mt-2">
                            <label className="text-xs font-bold uppercase tracking-wider text-text-muted ml-2">Duration</label>
                            <div className="relative group">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted group-focus-within:text-primary transition-colors">
                                    <span className="material-symbols-outlined">calendar_month</span>
                                </span>
                                <select
                                    className="w-full h-14 pl-12 pr-10 bg-background-light dark:bg-background-dark border-none rounded-xl text-text-main dark:text-white font-medium focus:ring-2 focus:ring-primary transition-shadow cursor-pointer"
                                    value={formData.duration}
                                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                                >
                                    <option value="less-than-90">Less than 90 days</option>
                                    <option value="more-than-90">More than 90 days</option>
                                </select>
                            </div>
                        </div>

                        <div className="mt-auto pt-6">
                            {error && (
                                <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-700 dark:text-red-300 text-sm">
                                    {error}
                                </div>
                            )}
                            <button
                                type="button"
                                onClick={handleGenerateRoadmap}
                                disabled={loading}
                                className="w-full h-14 bg-primary hover:bg-primary/90 text-black text-base font-bold rounded-full shadow-lg shadow-primary/25 flex items-center justify-center gap-2 transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? (
                                    <>
                                        <span className="material-symbols-outlined animate-spin">progress_activity</span>
                                        Generating...
                                    </>
                                ) : (
                                    <>
                                        <span className="material-symbols-outlined">auto_awesome</span>
                                        Generate Visa Roadmap
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </aside>

            {/* Right Column: Results Panel */}
            <section className="flex-1 overflow-y-auto bg-background-light dark:bg-background-dark relative">
                <div className="max-w-4xl mx-auto p-8 lg:p-12 pb-24">
                    {roadmapData ? (
                        <>
                            {/* AI Generated Guidance */}
                            <div className="mb-6">
                                <div className="flex items-center gap-2 mb-4">
                                    <span className="material-symbols-outlined text-primary">auto_awesome</span>
                                    <h2 className="text-2xl font-bold">AI-Generated Visa Roadmap</h2>
                                </div>
                                <div className="bg-white dark:bg-[#1c1c0c] rounded-lg border border-[#e9e8ce] dark:border-[#3a392a] p-8 shadow-sm">
                                    <ReactMarkdown
                                        components={{
                                            h2: ({ node, ...props }) => <h2 className="text-xl font-bold mb-3 mt-6 first:mt-0 flex items-center gap-2" {...props} />,
                                            h3: ({ node, ...props }) => <h3 className="text-lg font-semibold mb-2 mt-4" {...props} />,
                                            ul: ({ node, ...props }) => <ul className="space-y-2 mb-4 ml-4" {...props} />,
                                            ol: ({ node, ...props }) => <ol className="space-y-2 mb-4 ml-4 list-decimal" {...props} />,
                                            li: ({ node, ...props }) => <li className="text-text-main dark:text-gray-300 leading-relaxed" {...props} />,
                                            p: ({ node, ...props }) => <p className="text-text-main dark:text-gray-300 mb-3 leading-relaxed" {...props} />,
                                            strong: ({ node, ...props }) => <strong className="font-bold text-text-main dark:text-white" {...props} />,
                                        }}
                                    >
                                        {roadmapData.guidance}
                                    </ReactMarkdown>
                                    <div className="mt-6 pt-4 border-t border-[#e9e8ce] dark:border-[#3a392a] flex items-center gap-4 text-xs text-text-muted">
                                        <span>📍 From: {roadmapData.metadata?.origin?.toUpperCase()}</span>
                                        <span>→</span>
                                        <span>📍 To: {roadmapData.metadata?.destination?.toUpperCase()}</span>
                                        <span>•</span>
                                        <span>Purpose: {roadmapData.metadata?.purpose}</span>
                                    </div>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
                            <div className="size-24 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                                <span className="material-symbols-outlined text-5xl text-primary">flight</span>
                            </div>
                            <h3 className="text-2xl font-bold mb-2">Ready to Plan Your Journey?</h3>
                            <p className="text-text-muted max-w-md mb-8">
                                Fill in your travel details on the left and click "Generate Visa Roadmap" to get personalized AI-powered visa guidance.
                            </p>
                            <div className="flex gap-3 text-sm text-text-muted">
                                <div className="flex items-center gap-2">
                                    <span className="material-symbols-outlined text-primary">check_circle</span>
                                    <span>Instant Analysis</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="material-symbols-outlined text-primary">check_circle</span>
                                    <span>Personalized Guide</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="material-symbols-outlined text-primary">check_circle</span>
                                    <span>AI-Powered</span>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Visa Cards Grid - Removed, now showing AI-generated content */}

                </div>
            </section>
        </div>
    );
}

export default function VisaAssistantPage() {
    return (
        <ProtectedRoute>
            <VisaAssistantContent />
        </ProtectedRoute>
    );
}
