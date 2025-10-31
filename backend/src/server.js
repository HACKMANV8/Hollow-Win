require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize Google's Generative AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Story Studio API is running' });
});

// Generate story endpoint
app.post('/api/generate-story', async (req, res) => {
  try {
    const { prompt } = req.body;
    
    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    // For text-only input, use the gemini-pro model
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    
    const result = await model.generateContent(
      `Create a fun, engaging, and educational story for kids about: ${prompt}. 
      Make it 4-5 paragraphs long with a clear beginning, middle, and end.`
    );
    
    const response = await result.response;
    const story = response.text();
    
    res.status(200).json({ 
      success: true, 
      story,
      // In a real app, you would generate a video here using another service
      videoUrl: null,
      message: 'Story generated successfully. Video generation is not implemented yet.'
    });
    
  } catch (error) {
    console.error('Error generating story:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to generate story',
      details: error.message 
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

module.exports = app;
