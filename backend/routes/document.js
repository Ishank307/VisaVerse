import express from 'express';
import multer from 'multer';
import { analyzeDocument, analyzeDocumentWithVision } from '../services/geminiService.js';
import { extractTextFromPDF, prepareImageForGemini, validateFile } from '../utils/fileParser.js';
import fs from 'fs/promises';

const router = express.Router();

// Configure multer for file uploads
const upload = multer({
    dest: 'uploads/',
    limits: {
        fileSize: 10 * 1024 * 1024 // 10MB limit
    }
});

/**
 * POST /api/document-analyze
 * Analyze uploaded visa/immigration document using AI
 */
router.post('/document-analyze', upload.single('document'), async (req, res) => {
    let filePath = null;

    try {
        const file = req.file;

        // Validate file
        const validation = validateFile(file);
        if (!validation.valid) {
            return res.status(400).json({
                success: false,
                error: validation.error
            });
        }

        filePath = file.path;
        let result;

        // Process based on file type
        if (file.mimetype === 'application/pdf') {
            // Extract text from PDF
            const text = await extractTextFromPDF(filePath);

            if (!text || text.trim().length === 0) {
                return res.status(400).json({
                    success: false,
                    error: 'Could not extract text from PDF. Please ensure the PDF contains readable text.'
                });
            }

            // Analyze with AI
            result = await analyzeDocument(text, 'pdf');
        } else {
            // Process image with AI Vision
            const imageBase64 = await prepareImageForGemini(filePath);
            result = await analyzeDocumentWithVision(imageBase64, file.mimetype);
        }

        // Clean up uploaded file
        await fs.unlink(filePath);

        res.json(result);
    } catch (error) {
        console.error('Error in document-analyze endpoint:', error);

        // Clean up file if it exists
        if (filePath) {
            try {
                await fs.unlink(filePath);
            } catch (unlinkError) {
                console.error('Error deleting file:', unlinkError);
            }
        }

        // Handle rate limit exceeded
        if (error.message === 'RATE_LIMIT_EXCEEDED') {
            return res.status(429).json({
                success: false,
                error: '⏰ Daily AI quota reached! Our free tier allows 20 requests per day. Please try again tomorrow or contact support for increased limits.',
                retryAfter: '24 hours'
            });
        }

        res.status(500).json({
            success: false,
            error: 'Failed to analyze document. Please try again later.'
        });
    }
});

export default router;
