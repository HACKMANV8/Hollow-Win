import React, { useState, useRef, useEffect } from 'react';
import styles from './StoryStudio.module.css';

// API Configuration
const GOOGLE_AI_KEY = 'AIzaSyCNqidDmPF5GnZePQVJZk3Rx_ifSE0mzPE';
const VEO_API_KEY = 'AIzaSyCNqidDmPF5GnZePQVJZk3Rx_ifSE0mzPE';
const GENAI_API_KEY = '1804975933f2aa98b583f5caf74a9e11';

// MagicWand component for the generate button
const MagicWand = () => (
  <span className={styles.magicWand} role="img" aria-label="magic-wand">
    ✨
  </span>
);

const StoryStudio = () => {
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [generatedStory, setGeneratedStory] = useState('');
  const [scenes, setScenes] = useState([]);
  const [currentSceneIndex, setCurrentSceneIndex] = useState(0);
  const [videoUrl, setVideoUrl] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState('');
  const [progress, setProgress] = useState(0);
  const videoRef = useRef(null);

  // Generate story using Google's Gemini API
  const generateStory = async () => {
    if (!prompt.trim()) {
      setError('Please enter a story prompt');
      return;
    }

    setIsLoading(true);
    setError('');
    setGeneratedStory('');
    setScenes([]);
    setVideoUrl(null);

    try {
      // First, let's test if we can get a response from the API
      console.log('Sending request to Gemini API...');
      
      // Using the more widely available Gemini 1.0 Pro model
      const modelName = 'gemini-1.0-pro';
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${GOOGLE_AI_KEY}`;
      
      console.log('Using model:', modelName);
      
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `Create a short story (3-5 paragraphs) based on: "${prompt}". 
              Then, divide this story into 3 scenes, each with a brief description that would be good for a video. 
              Format the output as a valid JSON object with this exact structure: 
              {
                "story": "The full story text goes here...",
                "scenes": [
                  {"description": "Scene 1 description", "prompt": "Detailed prompt for generating an image of scene 1"},
                  {"description": "Scene 2 description", "prompt": "Detailed prompt for generating an image of scene 2"},
                  {"description": "Scene 3 description", "prompt": "Detailed prompt for generating an image of scene 3"}
                ]
              }`
            }]
          }],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 2048,
          },
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('API Error:', errorData);
        throw new Error(errorData.error?.message || 'Failed to generate story');
      }

      const data = await response.json();
      console.log('API Response:', data);
      
      // Extract the text from the response
      const responseText = data.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!responseText) {
        throw new Error('No valid response from the API');
      }

      // Try to extract JSON from the response
      let storyData;
      try {
        // Try to parse the entire response as JSON first
        storyData = JSON.parse(responseText);
      } catch (e) {
        // If that fails, try to extract JSON from a code block
        const jsonMatch = responseText.match(/```(?:json)?\n([\s\S]*?)\n```/);
        if (jsonMatch) {
          storyData = JSON.parse(jsonMatch[1]);
        } else {
          // If still no luck, try to find JSON in the response
          const jsonStart = responseText.indexOf('{');
          const jsonEnd = responseText.lastIndexOf('}') + 1;
          if (jsonStart >= 0 && jsonEnd > jsonStart) {
            const jsonStr = responseText.slice(jsonStart, jsonEnd);
            storyData = JSON.parse(jsonStr);
          } else {
            throw new Error('Could not parse story data from response');
          }
        }
      }

      console.log('Parsed Story Data:', storyData);
      
      if (!storyData.story || !Array.isArray(storyData.scenes)) {
        throw new Error('Invalid story format received from API');
      }

      setGeneratedStory(storyData.story);
      setScenes(storyData.scenes);
      
      // For now, just show the first scene's video (if any)
      if (storyData.scenes.length > 0) {
        // In a real app, you would generate videos for each scene here
        // For now, we'll just simulate a video URL
        setVideoUrl('https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4');
      }
      
    } catch (err) {
      console.error('Error in generateStory:', err);
      setError(`Failed to generate story: ${err.message}. Please try again with a different prompt.`);
    } finally {
      setIsLoading(false);
    }
  };

  // Generate videos for each scene using Veo 3.1
  const generateSceneVideos = async (scenes) => {
    setIsGenerating(true);
    setProgress(0);
    
    try {
      const videoPromises = scenes.map(async (scene, index) => {
        // First generate an image for the scene
        const imageResponse = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro-vision:generateContent?key=${GOOGLE_AI_KEY}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{
              parts: [
                { text: `Generate a detailed image prompt for: ${scene.prompt}` },
                { text: "output" },
                { text: "A high-quality, detailed prompt for an image generation model" }
              ]
            }]
          })
        });
        
        const imageData = await imageResponse.json();
        const imagePrompt = imageData.candidates[0].content.parts[0].text;
        
        // Then generate video using Veo 3.1
        const videoResponse = await fetch(`https://veo3-api.example.com/generate`, {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${VEO_API_KEY}`
          },
          body: JSON.stringify({
            prompt: imagePrompt,
            model: "veo-3.1-generate-preview"
          })
        });
        
        const videoData = await videoResponse.json();
        
        // Update progress
        setProgress(((index + 1) / scenes.length) * 100);
        
        return {
          ...scene,
          videoUrl: videoData.url,
          thumbnail: videoData.thumbnail
        };
      });
      
      // Wait for all videos to be generated
      const generatedScenes = await Promise.all(videoPromises);
      setScenes(generatedScenes);
      
      // Set the first scene as active
      if (generatedScenes.length > 0) {
        setVideoUrl(generatedScenes[0].videoUrl);
      }
      
    } catch (err) {
      setError('Error generating videos. ' + err.message);
      console.error('Error generating videos:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  const downloadVideo = () => {
    if (!videoUrl) return;
    
    const link = document.createElement('a');
    link.href = videoUrl;
    link.download = `story-${Date.now()}.mp4`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className={styles.storyStudio}>
      <h2>Create a Magical Story</h2>
      <p className={styles.subtitle}>Turn your ideas into an amazing animated story!</p>
      
      <div className={styles.inputGroup}>
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter a story idea (e.g., 'A dragon who loves ice cream')"
          className={styles.promptInput}
          onKeyPress={(e) => e.key === 'Enter' && !isLoading && generateStory()}
          disabled={isLoading}
        />
        <button 
          onClick={generateStory} 
          disabled={isLoading}
          className={`${styles.generateBtn} ${isLoading ? styles.loading : ''}`}
        >
          {isLoading ? (
            <span>Creating...</span>
          ) : (
            <>
              <MagicWand />
              <span>Create Story</span>
            </>
          )}
        </button>
      </div>
      
      {error && <p className={styles.error}>{error}</p>}
      
      {(generatedStory || videoUrl) && (
        <div className={styles.storyOutput}>
          <div className={styles.storyContent}>
            <h3>Your Story</h3>
            <div className={styles.storyText}>
              {generatedStory.split('\n').map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
            
            {scenes.length > 0 && (
              <div className={styles.sceneList}>
                <h4>Scenes</h4>
                <div className={styles.sceneThumbnails}>
                  {scenes.map((scene, index) => (
                    <div 
                      key={index} 
                      className={`${styles.sceneThumbnail} ${currentSceneIndex === index ? styles.active : ''}`}
                      onClick={() => {
                        setCurrentSceneIndex(index);
                        if (scene.videoUrl) setVideoUrl(scene.videoUrl);
                      }}
                    >
                      {scene.thumbnail ? (
                        <img src={scene.thumbnail} alt={`Scene ${index + 1}`} />
                      ) : (
                        <div className={styles.scenePlaceholder}>
                          {index + 1}
                        </div>
                      )}
                      <span>Scene {index + 1}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          <div className={styles.videoContainer}>
            <h3>Story Video</h3>
            {isGenerating ? (
              <div className={styles.loadingContainer}>
                <div className={styles.loadingBarContainer}>
                  <div 
                    className={styles.loadingBar} 
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <p>Generating video {Math.round(progress)}% complete...</p>
                <p>This may take a few moments. Please wait.</p>
              </div>
            ) : videoUrl ? (
              <div className={styles.videoWrapper}>
                <video 
                  ref={videoRef}
                  src={videoUrl} 
                  controls 
                  className={styles.videoPlayer}
                >
                  Your browser does not support the video tag.
                </video>
                <div className={styles.videoControls}>
                  <button 
                    onClick={downloadVideo}
                    className={styles.downloadBtn}
                  >
                    <span role="img" aria-label="download">⬇️</span> Download
                  </button>
                  <button 
                    onClick={() => {
                      if (navigator.share) {
                        navigator.share({
                          title: 'Check out my story!',
                          text: `I created this story with Story Studio: ${prompt}`,
                          url: window.location.href,
                        }).catch(console.error);
                      } else {
                        navigator.clipboard.writeText(window.location.href);
                        alert('Link copied to clipboard!');
                      }
                    }}
                    className={styles.shareBtn}
                  >
                    <span role="img" aria-label="share">🔗</span> Share
                  </button>
                </div>
              </div>
            ) : (
              <div className={styles.videoPlaceholder}>
                <p>Your video will appear here</p>
              </div>
            )}
            
            <div className={styles.tipBox}>
              <p>💡 <strong>Tip:</strong> Try another story idea to see more magical creations!</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StoryStudio;
