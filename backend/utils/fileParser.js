import pdfParse from 'pdf-parse';
import fs from 'fs/promises';

/**
 * Extract text from PDF file
 * @param {string} filePath - Path to PDF file
 * @returns {Promise<string>} Extracted text
 */
export async function extractTextFromPDF(filePath) {
    try {
        const dataBuffer = await fs.readFile(filePath);
        const data = await pdfParse(dataBuffer);
        return data.text;
    } catch (error) {
        console.error('Error extracting text from PDF:', error);
        throw new Error('Failed to extract text from PDF: ' + error.message);
    }
}

/**
 * Prepare image for AI Vision API (returns base64)
 * @param {string} filePath - Path to image file
 * @returns {Promise<string>} Base64 encoded image
 */
export async function prepareImageForGemini(filePath) {
    try {
        const imageBuffer = await fs.readFile(filePath);
        const base64Image = imageBuffer.toString('base64');
        return base64Image;
    } catch (error) {
        console.error('Error preparing image:', error);
        throw new Error('Failed to prepare image: ' + error.message);
    }
}

/**
 * Validate uploaded file
 * @param {Object} file - Multer file object
 * @returns {Object} Validation result
 */
export function validateFile(file) {
    const allowedTypes = ['application/pdf', 'image/png', 'image/jpeg', 'image/jpg'];
    const maxSize = 10 * 1024 * 1024; // 10MB

    if (!file) {
        return { valid: false, error: 'No file uploaded' };
    }

    if (!allowedTypes.includes(file.mimetype)) {
        return { valid: false, error: 'Invalid file type. Only PDF, PNG, and JPEG are allowed.' };
    }

    if (file.size > maxSize) {
        return { valid: false, error: 'File size exceeds 10MB limit' };
    }

    return { valid: true };
}
