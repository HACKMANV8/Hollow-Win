const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const { v4: uuidv4 } = require('uuid');
const { GoogleGenerativeAI } = require('@google/generative-ai');

// Initialize Google's Generative AI with the provided API key
const genAI = new GoogleGenerativeAI('AIzaSyB02zIwasT7-z1lBp025Je0mmsE-qjEzrc');

// Directory to store temporary files
const TEMP_DIR = path.join(__dirname, '../../temp');
if (!fs.existsSync(TEMP_DIR)) {
  fs.mkdirSync(TEMP_DIR, { recursive: true });
}

// Function to split story into scenes
function splitIntoSentences(story) {
  // Simple sentence splitter - can be enhanced
  return story.match(/[^.!?]+[.!?]+/g) || [story];
}

// Function to generate image prompt for a sentence
async function generateImagePrompt(sentence) {
  const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
  const prompt = `Generate a detailed, child-friendly visual description for this story sentence in one line: "${sentence}"`;
  
  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text().trim();
  } catch (error) {
    console.error('Error generating image prompt:', error);
    return `A colorful illustration for: ${sentence}`;
  }
}

// Function to generate video from story
async function generateVideoFromStory(story) {
  const videoId = uuidv4();
  const videoPath = path.join(TEMP_DIR, `${videoId}.mp4`);
  
  // Split story into sentences
  const sentences = splitIntoSentences(story);
  
  // Generate image prompts for each sentence
  const imagePrompts = [];
  for (const sentence of sentences) {
    const prompt = await generateImagePrompt(sentence);
    imagePrompts.push({
      text: sentence,
      prompt: prompt
    });
  }
  
  // For now, we'll return a placeholder video URL
  // In a real implementation, you would:
  // 1. Generate images using an image generation API
  // 2. Convert text to speech
  // 3. Combine images and audio into a video
  
  // This is a placeholder - in a real app, you would generate the actual video
  return new Promise((resolve) => {
    // Simulate video generation delay
    setTimeout(() => {
      resolve({
        videoUrl: `/videos/${videoId}.mp4`,
        videoPath,
        sentences: imagePrompts
      });
    }, 2000);
  });
}

module.exports = {
  generateVideoFromStory
};
