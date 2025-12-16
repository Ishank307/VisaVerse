export default function Footer() {
    return (
        <footer className="w-full border-t border-[#e6e6dd] bg-background-light dark:border-white/10 dark:bg-background-dark pt-12 pb-8">
            <div className="layout-container mx-auto max-w-[1280px] px-6 lg:px-10">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
                    <div className="col-span-2 md:col-span-1 flex flex-col gap-4">
                        <div className="flex items-center gap-2 text-text-main dark:text-white">
                            <div className="flex size-6 items-center justify-center rounded-full bg-primary text-black">
                                <span className="material-symbols-outlined" style={{ fontSize: '16px', fontWeight: 600 }}>
                                    travel_explore
                                </span>
                            </div>
                            <span className="text-base font-bold">VisaVerse Assist</span>
                        </div>
                        <p className="text-sm text-text-secondary dark:text-gray-400">
                            Making global mobility accessible for everyone through the power of AI.
                        </p>
                    </div>

                    <div className="flex flex-col gap-3">
                        <h4 className="text-sm font-bold text-text-main dark:text-white">Platform</h4>
                        <a href="#" className="text-sm text-text-secondary hover:text-primary dark:text-gray-400 dark:hover:text-primary transition-colors">
                            Visa Assistant
                        </a>
                        <a href="#" className="text-sm text-text-secondary hover:text-primary dark:text-gray-400 dark:hover:text-primary transition-colors">
                            Document Check
                        </a>
                        <a href="#" className="text-sm text-text-secondary hover:text-primary dark:text-gray-400 dark:hover:text-primary transition-colors">
                            Country Guides
                        </a>
                    </div>

                    <div className="flex flex-col gap-3">
                        <h4 className="text-sm font-bold text-text-main dark:text-white">Company</h4>
                        <a href="#" className="text-sm text-text-secondary hover:text-primary dark:text-gray-400 dark:hover:text-primary transition-colors">
                            About Us
                        </a>
                        <a href="#" className="text-sm text-text-secondary hover:text-primary dark:text-gray-400 dark:hover:text-primary transition-colors">
                            Careers
                        </a>
                        <a href="#" className="text-sm text-text-secondary hover:text-primary dark:text-gray-400 dark:hover:text-primary transition-colors">
                            Press
                        </a>
                    </div>

                    <div className="flex flex-col gap-3">
                        <h4 className="text-sm font-bold text-text-main dark:text-white">Legal</h4>
                        <a href="#" className="text-sm text-text-secondary hover:text-primary dark:text-gray-400 dark:hover:text-primary transition-colors">
                            Terms of Service
                        </a>
                        <a href="#" className="text-sm text-text-secondary hover:text-primary dark:text-gray-400 dark:hover:text-primary transition-colors">
                            Privacy Policy
                        </a>
                        <a href="#" className="text-sm text-text-secondary hover:text-primary dark:text-gray-400 dark:hover:text-primary transition-colors">
                            Cookie Policy
                        </a>
                    </div>
                </div>

                <div className="border-t border-[#e6e6dd] dark:border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-xs text-text-secondary dark:text-gray-500 text-center md:text-left">
                        © 2024 VisaVerse Assist Inc. All rights reserved.
                    </p>
                    <p className="text-xs text-text-secondary dark:text-gray-500 text-center md:text-right max-w-lg">
                        Disclaimer: VisaVerse Assist is an AI-powered tool and does not constitute legal advice. Please consult a qualified immigration attorney for complex cases or official legal representation.
                    </p>
                </div>
            </div>
        </footer>
    );
}
