require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const { generateVideoFromStory } = require('./services/videoGenerator');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Serve static files from the temp directory
const TEMP_DIR = path.join(__dirname, '../../temp');
if (!fs.existsSync(TEMP_DIR)) {
  fs.mkdirSync(TEMP_DIR, { recursive: true });
}
app.use('/videos', express.static(TEMP_DIR));

// Initialize Google's Generative AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || 'AIzaSyB02zIwasT7-z1lBp025Je0mmsE-qjEzrc');

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Story Studio API is running' });
});

// Generate story and video endpoint
app.post('/api/generate-story', async (req, res) => {
  try {
    const { prompt } = req.body;
    
    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    // For text-only input, use the gemini-pro model
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    
    // Generate the story
    const result = await model.generateContent(
      `Create a fun, engaging, and educational story for kids about: ${prompt}. 
      Make it 4-5 paragraphs long with a clear beginning, middle, and end.
      Use simple language suitable for children aged 5-10 years old.`
    );
    
    const response = await result.response;
    const story = response.text();
    
    // Generate video from the story
    const videoData = await generateVideoFromStory(story);
    
    res.status(200).json({ 
      success: true, 
      story,
      videoUrl: videoData.videoUrl,
      message: 'Story and video generated successfully!'
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
