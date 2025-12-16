import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import visaRouter from './routes/visa.js';
import documentRouter from './routes/document.js';
import healthRouter from './routes/health.js';
import authRouter from './routes/auth.js';

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 8000;

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || '')
    .then(() => console.log('✅ MongoDB Connected'))
    .catch((err) => console.error('❌ MongoDB Connection Error:', err));

// Middleware
app.use(cors()); // Enable CORS for frontend
app.use(express.json()); // Parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Routes
app.use('/api', healthRouter);
app.use('/api', visaRouter);
app.use('/api', documentRouter);
app.use('/api/auth', authRouter);

// Root endpoint
app.get('/', (req, res) => {
    res.json({
        message: 'VisaVerse Backend API',
        version: '1.0.0',
        endpoints: {
            health: 'GET /api/health',
            visaGuidance: 'POST /api/visa-guidance',
            documentAnalyze: 'POST /api/document-analyze'
        }
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Unhandled error:', err);
    res.status(500).json({
        success: false,
        error: 'Internal server error'
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 VisaVerse Backend running on http://localhost:${PORT}`);
    console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
    console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);

    if (!process.env.GOOGLE_API_KEY) {
        console.warn('⚠️  WARNING: GOOGLE_API_KEY not set in environment variables!');
    }
});

export default app;
