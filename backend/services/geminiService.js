import dotenv from 'dotenv';

dotenv.config();

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;

// Helper function to add delay
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Helper function to retry API calls with exponential backoff
async function fetchWithRetry(url, options, maxRetries = 3) {
    for (let i = 0; i < maxRetries; i++) {
        try {
            const response = await fetch(url, options);

            // If 503 (overloaded), retry with exponential backoff
            if (response.status === 503 && i < maxRetries - 1) {
                const delay = Math.pow(2, i) * 1000; // 1s, 2s, 4s
                console.log(`API overloaded, retrying in ${delay}ms... (attempt ${i + 1}/${maxRetries})`);
                await sleep(delay);
                continue;
            }

            return response;
        } catch (error) {
            if (i === maxRetries - 1) throw error;
            const delay = Math.pow(2, i) * 1000;
            console.log(`Request failed, retrying in ${delay}ms...`);
            await sleep(delay);
        }
    }
}

/**
 * Get visa guidance using Google Gemini AI (REST API)
 * @param {Object} params - Visa guidance parameters
 * @param {string} params.origin - Country of origin
 * @param {string} params.destination - Destination country
 * @param {string} params.purpose - Purpose of travel (study/work/travel)
 * @returns {Promise<Object>} Structured visa guidance
 */
export async function getVisaGuidance({ origin, destination, purpose }) {
    const prompt = `You are an AI visa assistant. Provide CONCISE visa guidance for easy reading (max 300 words).

User Details:
- From: ${origin}
- To: ${destination}  
- Purpose: ${purpose}

Provide in this EXACT format:

## 🎯 Visa Type
[1-2 sentences about the specific visa needed]

## 📋 Key Documents
- Document 1
- Document 2
- Document 3
- Document 4
[List ONLY top 5-6 most critical documents]

## ✅ Quick Steps
1. [Brief step - max 8 words]
2. [Brief step - max 8 words]
3. [Brief step - max 8 words]
4. [Brief step - max 8 words]
[ONLY 4-5 most important steps]

## ⚠️ Common Pitfalls
- [One key reason - max 10 words]
- [One key reason - max 10 words]
- [One key reason - max 10 words]
[ONLY top 3 rejection reasons]

## 💡 Pro Tip
[One actionable insider tip in 1-2 sentences]

IMPORTANT:
- Keep it SHORT and SCANNABLE
- Use simple words, no jargon
- Skip disclaimers and fluff
- Be specific to ${destination} from ${origin}`;

    try {
        const response = await fetchWithRetry(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GOOGLE_API_KEY}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    contents: [{
                        parts: [{
                            text: prompt
                        }]
                    }]
                })
            }
        );

        if (!response.ok) {
            const errorText = await response.text();
            console.error('API Error:', response.status, errorText);
            throw new Error(`API returned ${response.status}`);
        }

        const data = await response.json();
        const guidance = data.candidates?.[0]?.content?.parts?.[0]?.text || 'No response generated';

        return {
            success: true,
            guidance,
            metadata: {
                origin,
                destination,
                purpose,
                timestamp: new Date().toISOString()
            }
        };
    } catch (error) {
        console.error('Error in getVisaGuidance:', error.message);
        return {
            success: false,
            error: 'Failed to generate visa guidance. Please try again later.'
        };
    }
}

/**
 * Analyze document using Google Gemini AI (REST API)
 * @param {string} documentText - Extracted text from document
 * @param {string} fileType - Type of file (pdf/image)
 * @returns {Promise<Object>} Document analysis results
 */
export async function analyzeDocument(documentText, fileType = 'text') {
    const prompt = `Analyze this visa/immigration document. Be CONCISE (max 250 words).

Document Content:
${documentText}

Provide in this format:

## 📄 Document Type
[What document this is in 1 sentence]

## ✅ Strengths
- [Good point 1]
- [Good point 2]
[2-3 strengths only]

## ⚠️ Issues Found
- [Problem 1]
- [Problem 2]
- [Problem 3]
[Top 3-4 issues only]

## 💡 Quick Fixes
1. [Action item - max 10 words]
2. [Action item - max 10 words]
3. [Action item - max 10 words]
[3-4 actionable fixes]

IMPORTANT:
- Keep it SHORT and ACTIONABLE
- No legal disclaimers
- Focus on what matters most`;

    try {
        const response = await fetchWithRetry(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GOOGLE_API_KEY}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    contents: [{
                        parts: [{
                            text: prompt
                        }]
                    }]
                })
            }
        );

        if (!response.ok) {
            const errorText = await response.text();
            console.error('API Error:', response.status, errorText);
            throw new Error(`API returned ${response.status}`);
        }

        const data = await response.json();
        const analysis = data.candidates?.[0]?.content?.parts?.[0]?.text || 'No response generated';

        return {
            success: true,
            analysis,
            metadata: {
                fileType,
                documentLength: documentText.length,
                timestamp: new Date().toISOString()
            }
        };
    } catch (error) {
        console.error('Error in analyzeDocument:', error.message);
        return {
            success: false,
            error: 'Failed to analyze document. Please try again later.'
        };
    }
}

/**
 * Analyze document with vision (for images) using Google Gemini AI
 * @param {string} imageBase64 - Base64 encoded image
 * @param {string} mimeType - MIME type of the image
 * @returns {Promise<Object>} Document analysis results
 */
export async function analyzeDocumentWithVision(imageBase64, mimeType) {
    const prompt = `You are an AI document analyzer for visa/immigration applications. Analyze this document image and provide actionable feedback.

Extract and analyze the content, then provide:
1. DOCUMENT TYPE: What type of document this appears to be
2. EXTRACTED KEY INFORMATION: Main details found in the document
3. MISSING INFORMATION: Key details that seem to be missing or unclear
4. CLARITY ISSUES: Parts that are hard to read or poorly formatted
5. ACTIONABLE SUGGESTIONS: Specific recommendations to improve this document

Important:
- Be constructive and helpful
- Use bullet points for easy reading
- Focus on practical improvements
- Avoid legal claims or guarantees
- Include a disclaimer that this is AI-generated feedback, not legal advice`;

    try {
        const response = await fetchWithRetry(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GOOGLE_API_KEY}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    contents: [{
                        parts: [
                            {
                                text: prompt
                            },
                            {
                                inline_data: {
                                    mime_type: mimeType,
                                    data: imageBase64
                                }
                            }
                        ]
                    }]
                })
            }
        );

        if (!response.ok) {
            const errorText = await response.text();
            console.error('API Error:', response.status, errorText);
            throw new Error(`API returned ${response.status}`);
        }

        const data = await response.json();
        const analysis = data.candidates?.[0]?.content?.parts?.[0]?.text || 'No response generated';

        return {
            success: true,
            analysis,
            metadata: {
                fileType: 'image',
                timestamp: new Date().toISOString()
            }
        };
    } catch (error) {
        console.error('Error in analyzeDocumentWithVision:', error.message);
        return {
            success: false,
            error: 'Failed to analyze document image. Please try again later.'
        };
    }
}
