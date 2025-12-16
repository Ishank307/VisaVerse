'use client';

import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import ProtectedRoute from '../../components/ProtectedRoute';

function DocumentAnalyzerContent() {
    const [file, setFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [analyzing, setAnalyzing] = useState(false);
    const [analysis, setAnalysis] = useState(null);
    const [error, setError] = useState('');

    const handleFileSelect = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            // Validate file type
            const validTypes = ['application/pdf', 'image/png', 'image/jpeg', 'image/jpg'];
            if (!validTypes.includes(selectedFile.type)) {
                setError('Please upload a PDF, PNG, or JPEG file');
                return;
            }

            // Validate file size (10MB)
            if (selectedFile.size > 10 * 1024 * 1024) {
                setError('File size must be less than 10MB');
                return;
            }

            setFile(selectedFile);
            setError('');
            // Auto-analyze on file select
            analyzeDocument(selectedFile);
        }
    };

    const analyzeDocument = async (fileToAnalyze) => {
        setAnalyzing(true);
        setError('');
        setAnalysis(null);

        try {
            const formData = new FormData();
            formData.append('document', fileToAnalyze);

            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/document-analyze`, {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to analyze document');
            }

            if (data.success) {
                setAnalysis(data);
            } else {
                throw new Error(data.error || 'Analysis failed');
            }
        } catch (err) {
            console.error('Error analyzing document:', err);
            setError(err.message || 'Failed to analyze document. Please try again.');
        } finally {
            setAnalyzing(false);
        }
    };

    return (
        <div className="flex-1 flex justify-center py-8 px-4 md:px-8 lg:px-20 w-full">
            <div className="w-full max-w-7xl flex flex-col gap-8">
                {/* Progress & Heading */}
                <div className="flex flex-col gap-6">
                    <div className="flex flex-col gap-2 max-w-2xl">
                        <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-[1.1]">Document Analysis</h1>
                        <p className="text-lg text-text-secondary dark:text-text-sub-dark">
                            Upload your visa documents. Our AI checks for clarity, validity, and completeness.
                        </p>
                    </div>
                </div>

                {/* Two Column Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-4">
                    {/* Left Column: Upload Zone */}
                    <div className="lg:col-span-5 flex flex-col gap-6">
                        <div className="group relative flex flex-col items-center justify-center gap-6 rounded-2xl border-3 border-dashed border-border-light dark:border-border-dark bg-white dark:bg-[#2e2d15] p-10 transition-all hover:border-primary/50 hover:bg-background-light/50 dark:hover:bg-background-dark/50">
                            <input
                                type="file"
                                id="file-upload"
                                className="hidden"
                                accept=".pdf,.png,.jpg,.jpeg"
                                onChange={handleFileSelect}
                                disabled={analyzing}
                            />
                            <div className="relative size-20 flex items-center justify-center rounded-full bg-primary/10 text-primary mb-2 group-hover:scale-110 transition-transform duration-300">
                                <span className="material-symbols-outlined text-5xl">
                                    {analyzing ? 'hourglass_empty' : 'cloud_upload'}
                                </span>
                            </div>
                            <div className="text-center space-y-2">
                                <h3 className="text-xl font-bold">
                                    {analyzing ? 'Analyzing...' : 'Upload Document'}
                                </h3>
                                <p className="text-sm text-text-secondary dark:text-text-sub-dark max-w-[280px] mx-auto">
                                    PDF, PNG, or JPG <br /> (Max 10MB)
                                </p>
                            </div>
                            <label
                                htmlFor="file-upload"
                                className="mt-2 flex items-center justify-center gap-2 rounded-full bg-primary px-8 py-3 text-sm font-bold text-black hover:bg-primary/90 hover:shadow-glow transition-all active:scale-95 cursor-pointer"
                            >
                                <span className="material-symbols-outlined text-lg">folder_open</span>
                                {analyzing ? 'Analyzing...' : 'Browse Files'}
                            </label>
                        </div>

                        {/* Currently Uploaded */}
                        {file && (
                            <div className="rounded-2xl bg-white dark:bg-[#2e2d15] p-6 shadow-soft border border-border-light dark:border-border-dark">
                                <h4 className="text-sm font-bold uppercase tracking-wider text-text-secondary dark:text-text-sub-dark mb-4">
                                    Current Document
                                </h4>
                                <div className="flex flex-col gap-3">
                                    <div className="flex items-center justify-between gap-3 p-3 rounded-xl bg-background-light dark:bg-background-dark">
                                        <div className="flex items-center gap-3 overflow-hidden">
                                            <div className="flex-shrink-0 size-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                                                <span className="material-symbols-outlined">
                                                    {file.type === 'application/pdf' ? 'picture_as_pdf' : 'image'}
                                                </span>
                                            </div>
                                            <div className="flex flex-col overflow-hidden">
                                                <span className="text-sm font-semibold truncate">{file.name}</span>
                                                <span className="text-xs text-text-secondary dark:text-text-sub-dark">
                                                    {(file.size / 1024 / 1024).toFixed(2)} MB
                                                </span>
                                            </div>
                                        </div>
                                        {analyzing ? (
                                            <span className="flex-shrink-0 material-symbols-outlined text-primary animate-spin">progress_activity</span>
                                        ) : (
                                            <span className="flex-shrink-0 material-symbols-outlined text-green-500 icon-filled">check_circle</span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Error Display */}
                        {error && (
                            <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-700 dark:text-red-300 text-sm">
                                {error}
                            </div>
                        )}
                    </div>

                    {/* Right Column: Analysis Results */}
                    <div className="lg:col-span-7 flex flex-col gap-6">
                        {analysis ? (
                            <>
                                <div className="rounded-2xl bg-white dark:bg-[#2e2d15] p-6 shadow-soft border border-border-light dark:border-border-dark">
                                    <div className="flex items-center gap-3 mb-4">
                                        <span className="material-symbols-outlined text-primary text-3xl">auto_awesome</span>
                                        <h3 className="text-xl font-bold">AI Analysis Results</h3>
                                    </div>
                                    <ReactMarkdown
                                        components={{
                                            h2: ({ node, ...props }) => <h2 className="text-lg font-bold mb-2 mt-4 first:mt-0" {...props} />,
                                            h3: ({ node, ...props }) => <h3 className="text-base font-semibold mb-2 mt-3" {...props} />,
                                            ul: ({ node, ...props }) => <ul className="space-y-1 mb-3 ml-4 list-disc" {...props} />,
                                            ol: ({ node, ...props }) => <ol className="space-y-1 mb-3 ml-4 list-decimal" {...props} />,
                                            li: ({ node, ...props }) => <li className="text-text-main dark:text-gray-300 text-sm leading-relaxed" {...props} />,
                                            p: ({ node, ...props }) => <p className="text-text-main dark:text-gray-300 mb-2 text-sm leading-relaxed" {...props} />,
                                            strong: ({ node, ...props }) => <strong className="font-bold text-text-main dark:text-white" {...props} />,
                                        }}
                                    >
                                        {analysis.analysis}
                                    </ReactMarkdown>
                                </div>
                            </>
                        ) : (
                            <div className="flex flex-col items-center justify-center min-h-[400px] text-center rounded-2xl bg-white dark:bg-[#2e2d15] p-8 border border-border-light dark:border-border-dark">
                                <div className="size-20 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                                    <span className="material-symbols-outlined text-4xl text-primary">description</span>
                                </div>
                                <h3 className="text-xl font-bold mb-2">No Document Analyzed Yet</h3>
                                <p className="text-text-secondary dark:text-text-sub-dark max-w-md">
                                    Upload a document to get AI-powered analysis of its quality, completeness, and potential issues.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function DocumentAnalyzerPage() {
    return (
        <ProtectedRoute>
            <DocumentAnalyzerContent />
        </ProtectedRoute>
    );
}
