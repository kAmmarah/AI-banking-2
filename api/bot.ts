import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Gemini API
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export default async function handler(req, res) {
    // CORS Headers
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );

    // Handle OPTIONS request for CORS
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    // Only allow POST
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    const { message } = req.body || {};

    if (typeof message !== 'string') {
        return res.status(400).json({
            error: 'Invalid request: "message" must be a string.',
        });
    }

    try {
        const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

        // Provide context to the AI about its role
        const prompt = `
      You are an expert AI Fraud Detection Assistant for a banking dashboard.
      Your role is to help users understand fraud risks, analyze transaction patterns, and explain dashboard features.
      
      Dashboard Context:
      - Total Transactions: 12,500
      - Flagged Transactions: 32
      - Confirmed Fraud: 8
      - Prevented Losses: $45,600
      - Features: Transaction Feed, Fraud Analysis Charts, Risk Scoring, Customer Profiles.
      
      User Question: ${message}
      
      Please provide a helpful, professional, and concise response related to banking fraud detection.
    `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        return res.status(200).json({ reply: text });
    } catch (error: any) {
        console.error('Gemini API Error:', error);
        return res.status(500).json({
            reply: 'I apologize, but I am having trouble connecting to the AI service at the moment.',
            error: error.message || 'Failed to generate response'
        });
    }
}
