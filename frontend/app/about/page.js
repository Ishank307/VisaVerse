export default function AboutPage() {
    return (
        <div className="min-h-screen flex flex-col items-center w-full">
            <div className="w-full max-w-[1200px] px-4 md:px-10 flex flex-col gap-12 py-10">
                {/* Hero Section */}
                <section className="flex flex-col gap-8 md:flex-row items-center py-10 md:py-16">
                    <div className="flex-1 flex flex-col gap-6 text-left">
                        <h1 className="text-4xl md:text-6xl font-black leading-tight tracking-tight text-text-main dark:text-white">
                            Simplifying Global{' '}
                            <span className="relative whitespace-nowrap">
                                Mobility
                                <span className="absolute bottom-1 left-0 w-full h-3 bg-primary/40 -z-10 rounded-sm"></span>
                            </span>
                        </h1>
                        <p className="text-lg md:text-xl font-normal leading-relaxed text-text-secondary dark:text-gray-400 max-w-xl">
                            VisaVerse Assist is your AI Co-pilot for international travel. We help students and professionals navigate complex visa processes with confidence and ease.
                        </p>
                        <div className="flex gap-4 pt-2">
                            <button className="h-12 px-8 rounded-full bg-primary text-black text-base font-bold shadow-lg hover:translate-y-[-2px] transition-transform">
                                Read Our Mission
                            </button>
                            <button className="h-12 px-8 rounded-full border border-border-light dark:border-border-dark bg-transparent text-text-main dark:text-white text-base font-bold hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                                View Features
                            </button>
                        </div>
                    </div>
                    <div className="flex-1 w-full relative">
                        <div className="aspect-[4/3] w-full bg-gray-200 rounded-xl overflow-hidden shadow-2xl relative">
                            <img
                                src="/global_mobility.jpg"
                                alt="Global Mobility"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-tr from-black/10 to-transparent z-10"></div>
                        </div>
                    </div>
                </section>

                {/* Mission Section */}
                <section className="w-full" id="mission">
                    <div className="bg-white dark:bg-[#1a190b] border border-border-light dark:border-border-dark rounded-xl p-6 md:p-10 shadow-sm flex flex-col-reverse md:flex-row gap-8 items-center">
                        <div className="flex-1 flex flex-col gap-4">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 text-xs font-bold uppercase tracking-wider text-black dark:text-primary w-fit">
                                <span className="size-2 rounded-full bg-primary"></span>
                                Our Mission
                            </div>
                            <h2 className="text-3xl font-bold leading-tight">Democratizing Access to Opportunity</h2>
                            <p className="text-text-secondary dark:text-gray-400 text-base leading-relaxed">
                                Borders shouldn't be barriers. Our mission is to democratize access to visa information for students and first-time travelers worldwide. By leveraging advanced AI, we translate bureaucratic complexity into clear, actionable guidance, ensuring that opportunity is defined by talent, not geography.
                            </p>
                        </div>
                        <div className="flex-1 w-full">
                            <div className="aspect-video w-full rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800">
                                <img
                                    src="/opportunity.jpg"
                                    alt="Democratizing Access to Opportunity"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Why Global Mobility Matters */}
                <section className="py-10" id="impact">
                    <div className="flex flex-col items-center text-center gap-4 mb-10">
                        <h2 className="text-3xl md:text-4xl font-bold leading-tight">Why Global Mobility Matters</h2>
                        <p className="text-text-secondary dark:text-gray-400 max-w-2xl">
                            Open borders foster innovation, cultural exchange, and educational growth. However, the process remains broken. We are here to fix the friction points.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Feature 1 */}
                        <div className="group flex flex-col gap-4 p-6 rounded-xl bg-white dark:bg-[#1a190b] border border-border-light dark:border-border-dark hover:border-primary/50 transition-colors shadow-sm">
                            <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center text-text-main group-hover:bg-primary transition-colors">
                                <span className="material-symbols-outlined">description</span>
                            </div>
                            <div className="flex flex-col gap-2">
                                <h3 className="text-lg font-bold">Complex Paperwork</h3>
                                <p className="text-text-secondary dark:text-gray-400 text-sm leading-relaxed">
                                    We decode the confusion of endless forms, ensuring you understand exactly what is needed and when.
                                </p>
                            </div>
                        </div>

                        {/* Feature 2 */}
                        <div className="group flex flex-col gap-4 p-6 rounded-xl bg-white dark:bg-[#1a190b] border border-border-light dark:border-border-dark hover:border-primary/50 transition-colors shadow-sm">
                            <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center text-text-main group-hover:bg-primary transition-colors">
                                <span className="material-symbols-outlined">gavel</span>
                            </div>
                            <div className="flex flex-col gap-2">
                                <h3 className="text-lg font-bold">Unclear Rules</h3>
                                <p className="text-text-secondary dark:text-gray-400 text-sm leading-relaxed">
                                    Immigration policies change frequently. Our AI clarifies ambiguous rules for first-time applicants.
                                </p>
                            </div>
                        </div>

                        {/* Feature 3 */}
                        <div className="group flex flex-col gap-4 p-6 rounded-xl bg-white dark:bg-[#1a190b] border border-border-light dark:border-border-dark hover:border-primary/50 transition-colors shadow-sm">
                            <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center text-text-main group-hover:bg-primary transition-colors">
                                <span className="material-symbols-outlined">school</span>
                            </div>
                            <div className="flex flex-col gap-2">
                                <h3 className="text-lg font-bold">Education Access</h3>
                                <p className="text-text-secondary dark:text-gray-400 text-sm leading-relaxed">
                                    Enabling seamless movement for students worldwide to access the best education opportunities.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Responsible AI Disclaimer */}
                <section className="w-full" id="responsibility">
                    <div className="rounded-xl overflow-hidden bg-border-light/30 dark:bg-border-dark/30 border border-border-light dark:border-border-dark">
                        <div className="flex flex-col md:flex-row">
                            <div className="p-8 md:p-10 flex-[3] flex flex-col justify-center gap-4">
                                <div className="flex items-center gap-2 text-text-main dark:text-white">
                                    <span className="material-symbols-outlined">shield</span>
                                    <h3 className="text-xl font-bold">Responsible AI Disclaimer</h3>
                                </div>
                                <p className="text-text-secondary dark:text-gray-400 text-sm leading-relaxed">
                                    VisaVerse Assist is an advanced AI-powered guide designed to simplify information gathering. However, it is <strong>not</strong> a substitute for professional legal advice or official government counsel. While we strive for real-time accuracy, immigration laws are subject to rapid change. Users should always verify critical documents with official embassy sources.
                                </p>
                                <div className="mt-2">
                                    <a className="text-sm font-bold underline decoration-primary decoration-2 underline-offset-4 hover:decoration-4 transition-all" href="#">
                                        Read our full Terms of Service
                                    </a>
                                </div>
                            </div>
                            <div className="flex-[2] min-h-[200px] md:min-h-0 relative">
                                <img
                                    src="/frontend_page.jpg"
                                    alt="Responsible AI"
                                    className="absolute inset-0 w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-l from-transparent to-background-light dark:to-background-dark opacity-80 md:opacity-0 md:bg-gradient-to-r md:from-background-light dark:md:from-background-dark md:to-transparent"></div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
