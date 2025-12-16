import express from 'express';

const router = express.Router();

/**
 * GET /api/health
 * Health check endpoint to verify server status
 */
router.get('/health', (req, res) => {
    res.json({
        success: true,
        status: 'healthy',
        timestamp: new Date().toISOString(),
        service: 'VisaVerse Backend API',
        version: '1.0.0'
    });
});

export default router;
