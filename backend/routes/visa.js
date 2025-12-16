import express from 'express';
import { getVisaGuidance } from '../services/geminiService.js';

const router = express.Router();

/**
 * POST /api/visa-guidance
 * Get AI-powered visa guidance based on user inputs
 */
router.post('/visa-guidance', async (req, res) => {
    try {
        const { origin, destination, purpose } = req.body;

        // Validate inputs
        if (!origin || !destination || !purpose) {
            return res.status(400).json({
                success: false,
                error: 'Missing required fields: origin, destination, and purpose are required'
            });
        }

        // Validate purpose
        const validPurposes = ['study', 'work', 'travel', 'business', 'tourism'];
        if (!validPurposes.includes(purpose.toLowerCase())) {
            return res.status(400).json({
                success: false,
                error: 'Invalid purpose. Must be one of: study, work, travel, business, tourism'
            });
        }

        // Get visa guidance from Gemini
        const result = await getVisaGuidance({ origin, destination, purpose });

        res.json(result);
    } catch (error) {
        console.error('Error in visa-guidance endpoint:', error);

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
            error: 'Failed to generate visa guidance. Please try again later.'
        });
    }
});

export default router;
