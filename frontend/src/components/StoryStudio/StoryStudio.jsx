import React, { useState } from 'react';
import styles from './StoryStudio.module.css';

const StoryStudio = () => {
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [generatedStory, setGeneratedStory] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [error, setError] = useState('');

  const generateStory = async () => {
    if (!prompt.trim()) {
      setError('Please enter a story prompt');
      return;
    }

    setIsLoading(true);
    setError('');
    setGeneratedStory('');
    setVideoUrl('');

    try {
      // Call our backend API to generate the story
      const response = await fetch('http://localhost:3001/api/generate-story', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt })
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate story');
      }

      setGeneratedStory(data.story);
      
      // In the future, this would be set by the backend when video generation is implemented
      if (data.videoUrl) {
        setVideoUrl(data.videoUrl);
      }
      
    } catch (err) {
      setError('Failed to generate story. Please try again.');
      console.error('Error generating story:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.storyStudio}>
      <h2>Create a Magical Story</h2>
      
      <div className={styles.inputSection}>
        <input
          type="text"
          className={styles.promptInput}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter a story idea (e.g., 'a brave little astronaut' or 'a magical forest')"
          disabled={isLoading}
          aria-label="Story prompt input"
        />
        
        <button 
          className={styles.generateButton}
          onClick={generateStory}
          disabled={isLoading}
          aria-busy={isLoading}
        >
          {isLoading ? 'Creating...' : 'Create Story'}
        </button>
        
        {error && <div className={styles.errorMessage} role="alert">{error}</div>}
      </div>
      
      {(generatedStory || videoUrl) && (
        <div className={styles.outputSection}>
          {generatedStory && (
            <div className={styles.storyPreview}>
              <h3>Your Story</h3>
              <div className={styles.storyText}>
                {generatedStory.split('\n').map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </div>
          )}
          
          {videoUrl ? (
            <div className={styles.videoPreview}>
              <h3>Video Preview</h3>
              <div className={styles.videoContainer}>
                <video controls width="100%" aria-label="Generated story video">
                  <source src={videoUrl} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
          ) : generatedStory && (
            <div className={styles.videoPlaceholder}>
              <p>Video generation coming soon! The story will be turned into an animated video.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default StoryStudio;
