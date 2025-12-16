import Link from 'next/link';

export default function Home() {
    return (
        <div className="min-h-screen w-full">
            {/* Hero Section */}
            <section className="w-full max-w-[1280px] px-6 lg:px-10 py-12 lg:py-20 mx-auto">
                <div className="flex flex-col-reverse lg:flex-row gap-12 items-center">
                    {/* Text Content */}
                    <div className="flex flex-col gap-6 flex-1 text-center lg:text-left items-center lg:items-start">
                        <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white dark:bg-white/5 dark:border-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-text-secondary dark:text-gray-300">
                            <span className="size-2 rounded-full bg-primary"></span>
                            AI-Powered Visa Guidance
                        </div>
                        <h1 className="text-4xl lg:text-6xl font-bold leading-[1.1] tracking-tight text-text-main dark:text-white">
                            Simplifying Visas and <br className="hidden lg:block" />Global Mobility with AI
                        </h1>
                        <p className="text-lg text-text-secondary dark:text-gray-300 max-w-[540px] leading-relaxed">
                            Navigate complex immigration rules with confidence. Our AI provides tailored guidance for students, professionals, and first-time travelers.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto pt-4">
                            <Link
                                href="/visa-assistant"
                                className="flex h-12 items-center justify-center gap-2 rounded-full bg-primary px-8 text-base font-bold text-black transition-all hover:bg-[#ece805] shadow-lg shadow-primary/25"
                            >
                                Start Visa Check
                                <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>arrow_forward</span>
                            </Link>
                            <button className="flex h-12 items-center justify-center gap-2 rounded-full border border-black/10 bg-white dark:bg-white/5 dark:border-white/10 px-8 text-base font-bold text-text-main dark:text-white transition-all hover:bg-gray-50 dark:hover:bg-white/10">
                                How it works
                            </button>
                        </div>
                        <div className="flex items-center gap-2 pt-2 text-sm text-text-secondary dark:text-gray-400">
                            <span className="material-symbols-outlined text-green-600" style={{ fontSize: '18px' }}>check_circle</span>
                            <span>Trusted by 10,000+ travelers worldwide</span>
                        </div>
                    </div>

                    {/* Hero Image */}
                    <div className="flex-1 w-full max-w-[600px]">
                        <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl bg-gray-100 dark:bg-gray-800">
                            {/* Decorative elements */}
                            <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/30 rounded-full blur-3xl z-0"></div>
                            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-400/20 rounded-full blur-3xl z-0"></div>

                            {/* Hero Image */}
                            <img
                                src="/frontend_page.jpg"
                                alt="Traveler with passport and documents planning journey"
                                className="absolute inset-0 w-full h-full object-cover z-10"
                            />

                            {/* Floating UI Card Overlay */}
                            <div className="absolute bottom-6 left-6 right-6 z-20 bg-white/90 dark:bg-black/80 backdrop-blur-sm p-4 rounded-xl border border-white/20 shadow-lg flex items-center gap-4">
                                <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-lg text-green-700 dark:text-green-400">
                                    <span className="material-symbols-outlined">verified</span>
                                </div>
                                <div>
                                    <p className="text-xs font-semibold text-text-secondary dark:text-gray-400 uppercase">Status</p>
                                    <p className="text-sm font-bold text-text-main dark:text-white">Documents Verified</p>
                                </div>
                                <div className="ml-auto">
                                    <div className="h-1.5 w-16 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                        <div className="h-full bg-green-500 w-[80%]"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Header */}
            <section className="w-full max-w-[1280px] px-6 lg:px-10 pt-10 mx-auto">
                <div className="flex flex-col items-center text-center gap-4">
                    <h2 className="text-3xl font-bold tracking-tight">Everything you need for a smooth journey</h2>
                    <p className="text-text-secondary dark:text-gray-400 max-w-2xl">
                        We combine advanced AI with up-to-date immigration data to help you navigate the process seamlessly and securely.
                    </p>
                </div>
            </section>

            {/* Features Grid */}
            <section className="w-full max-w-[1280px] px-6 lg:px-10 py-12 mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Feature 1 */}
                    <div className="group flex flex-col gap-4 rounded-2xl border border-[#e6e6dd] bg-white p-6 shadow-soft transition-all hover:border-primary/50 hover:shadow-md dark:border-white/10 dark:bg-white/5">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/20 text-text-main group-hover:bg-primary transition-colors">
                            <span className="material-symbols-outlined">explore</span>
                        </div>
                        <div className="flex flex-col gap-2">
                            <h3 className="text-xl font-bold text-text-main dark:text-white">Smart Visa Guidance</h3>
                            <p className="text-sm leading-relaxed text-text-secondary dark:text-gray-400">
                                Step-by-step application walkthroughs tailored to your specific destination, purpose of travel, and citizenship.
                            </p>
                        </div>
                    </div>

                    {/* Feature 2 */}
                    <div className="group flex flex-col gap-4 rounded-2xl border border-[#e6e6dd] bg-white p-6 shadow-soft transition-all hover:border-primary/50 hover:shadow-md dark:border-white/10 dark:bg-white/5">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/20 text-text-main group-hover:bg-primary transition-colors">
                            <span className="material-symbols-outlined">document_scanner</span>
                        </div>
                        <div className="flex flex-col gap-2">
                            <h3 className="text-xl font-bold text-text-main dark:text-white">Document Analysis</h3>
                            <p className="text-sm leading-relaxed text-text-secondary dark:text-gray-400">
                                AI-powered scanning to automatically detect potential errors, typos, and missing fields in your documents before submission.
                            </p>
                        </div>
                    </div>

                    {/* Feature 3 */}
                    <div className="group flex flex-col gap-4 rounded-2xl border border-[#e6e6dd] bg-white p-6 shadow-soft transition-all hover:border-primary/50 hover:shadow-md dark:border-white/10 dark:bg-white/5">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/20 text-text-main group-hover:bg-primary transition-colors">
                            <span className="material-symbols-outlined">public</span>
                        </div>
                        <div className="flex flex-col gap-2">
                            <h3 className="text-xl font-bold text-text-main dark:text-white">Global Insights</h3>
                            <p className="text-sm leading-relaxed text-text-secondary dark:text-gray-400">
                                Real-time regulation updates and specific insights for over 190 countries worldwide to keep you compliant.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="w-full max-w-[1280px] px-6 lg:px-10 py-16 mx-auto">
                <div className="relative overflow-hidden rounded-3xl px-6 py-16 text-center text-white md:px-12 lg:py-24">
                    {/* Background Image */}
                    {/* Background Image */}
                    <div className="absolute inset-0 z-0">
                        <img
                            src="/Ready_to_start.jpg"
                            alt="People planning travel journey"
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/60"></div>
                    </div>

                    {/* Pattern */}
                    <div
                        className="absolute inset-0 z-10 opacity-5"
                        style={{
                            backgroundImage: 'radial-gradient(#f9f506 1px, transparent 1px)',
                            backgroundSize: '24px 24px',
                        }}
                    ></div>


                    {/* Background Pattern */}
                    <div
                        className="absolute top-0 left-0 h-full w-full opacity-10 z-10"
                        style={{
                            backgroundImage: 'radial-gradient(#f9f506 1px, transparent 1px)',
                            backgroundSize: '24px 24px'
                        }}
                    ></div>
                    <div className="relative z-20 flex flex-col items-center gap-6">
                        <h2 className="max-w-[720px] text-3xl font-bold leading-tight md:text-5xl">
                            Ready to start your journey?
                        </h2>
                        <p className="max-w-[600px] text-lg text-gray-300">
                            Join thousands of travelers who have simplified their visa process with VisaVerse Assist.
                        </p>
                        <div className="mt-4 flex w-full max-w-md flex-col gap-3 sm:flex-row sm:justify-center">
                            <Link
                                href="/visa-assistant"
                                className="flex h-12 w-full sm:w-auto min-w-[160px] cursor-pointer items-center justify-center rounded-full bg-primary px-6 text-base font-bold text-black transition-transform hover:scale-105 active:scale-95"
                            >
                                Start Visa Check
                            </Link>
                            <button className="flex h-12 w-full sm:w-auto min-w-[160px] cursor-pointer items-center justify-center rounded-full border border-white/20 bg-white/10 px-6 text-base font-bold text-white transition-colors hover:bg-white/20">
                                Contact Sales
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
