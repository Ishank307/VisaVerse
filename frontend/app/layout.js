import './globals.css';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

export const metadata = {
    title: 'VisaVerse Assist - Simplifying Visas and Global Mobility',
    description: 'Navigate complex immigration rules with confidence. Our AI provides tailored guidance for students, professionals, and first-time travelers.',
};

export default function RootLayout({ children }) {
    return (
        <html lang="en" className="light">
            <head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link
                    href="https://fonts.googleapis.com/css2?family=Spline+Sans:wght@300;400;500;600;700&display=swap"
                    rel="stylesheet"
                />
                <link
                    href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
                    rel="stylesheet"
                />
            </head>
            <body className="bg-background-light dark:bg-background-dark text-text-main dark:text-white font-display overflow-x-hidden antialiased selection:bg-primary selection:text-black">
                <div className="relative flex min-h-screen w-full flex-col">
                    <Navigation />
                    <main className="flex flex-col items-center w-full">
                        {children}
                    </main>
                    <Footer />
                </div>
            </body>
        </html>
    );
}
