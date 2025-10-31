import React, { useState, useRef, useEffect } from 'react';
// Using window.location for navigation in Vite
import styles from './GrandmaStories.module.css';
import { FiArrowLeft, FiPlus, FiPlay, FiClock } from 'react-icons/fi';

// Mock data for stories
const mockStories = [
  { id: 1, title: 'The Enchanted Forest', duration: '2:45', watched: true },
  { id: 2, title: 'The Lost Treasure', duration: '3:20', watched: false },
  { id: 3, title: 'The Brave Little Tailor', duration: '4:15', watched: false },
  { id: 4, title: 'The Magic Paintbrush', duration: '3:50', watched: false },
  { id: 5, title: 'The Golden Goose', duration: '2:30', watched: false },
];

const GrandmaStories = () => {
  // Navigation function for Vite
  const [stories, setStories] = useState(mockStories);
  const [currentStory, setCurrentStory] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showNewStoryForm, setShowNewStoryForm] = useState(false);
  const [uploadedVideo, setUploadedVideo] = useState(null);
  const [uploadedPDF, setUploadedPDF] = useState(null);
  const videoRef = useRef(null);
  const fileInputRef = useRef(null);
  const pdfInputRef = useRef(null);

  const handleStorySelect = (story) => {
    setCurrentStory(story);
    setIsPlaying(true);
    // In a real app, you would load the actual video here
  };

  const handleNewStory = () => {
    setShowNewStoryForm(true);
  };

  const handleBack = () => {
    if (showNewStoryForm) {
      setShowNewStoryForm(false);
    } else {
      window.history.back();
    }
  };

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleVideoUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('video/')) {
      const videoURL = URL.createObjectURL(file);
      setUploadedVideo(videoURL);
    }
  };

  const handlePDFUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'application/pdf') {
      setUploadedPDF(file);
    }
  };

  const handleGenerateVideo = async () => {
    if (!uploadedPDF) {
      alert('Please upload a PDF file first');
      return;
    }
    // TODO: Implement D-ID API integration
    alert('Video generation will be implemented with D-ID API');
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <button onClick={handleBack} className={styles.backButton}>
          <FiArrowLeft size={24} />
        </button>
        <h1>Grandma's Stories</h1>
        <div style={{ width: '40px' }}></div> {/* Spacer for flex alignment */}
      </header>

      <div className={styles.content}>
        <div className={styles.leftColumn}>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleVideoUpload}
            accept="video/*"
            style={{ display: 'none' }}
          />
          <input
            type="file"
            ref={pdfInputRef}
            onChange={handlePDFUpload}
            accept=".pdf"
            style={{ display: 'none' }}
          />
          
          {uploadedVideo ? (
            <div className={styles.videoPreview}>
              <video
                src={uploadedVideo}
                className={styles.previewVideo}
                loop
                autoPlay
                muted
              />
            </div>
          ) : (
            <div className={styles.uploadPlaceholder} onClick={() => fileInputRef.current?.click()}>
              <span>📹</span>
              <p>Click to upload video</p>
            </div>
          )}
        </div>

        <div className={styles.videoSection}>
          <div className={styles.videoContainer}>
            {currentStory ? (
              <div className={styles.videoWrapper}>
                <video
                  ref={videoRef}
                  src={`/videos/story-${currentStory.id}.mp4`}
                  className={styles.videoPlayer}
                  onClick={handlePlayPause}
                />
                {!isPlaying && (
                  <button className={styles.playButton} onClick={handlePlayPause}>
                    <FiPlay size={48} />
                  </button>
                )}
              </div>
            ) : (
              <div className={styles.videoPlaceholder}>
                <p>Select a story to begin</p>
              </div>
            )}
            {currentStory && (
              <div className={styles.videoInfo}>
                <h2>{currentStory.title}</h2>
                <div className={styles.videoMeta}>
                  <span><FiClock size={16} /> {currentStory.duration}</span>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className={styles.sidebar}>
          <div className={styles.sidebarHeader}>
            <h3>Your Stories</h3>
            <button onClick={handleNewStory} className={styles.newStoryButton}>
              <FiPlus size={20} /> New Story
            </button>
          </div>
          
          <div className={styles.storyList}>
            {stories.map((story) => (
              <div 
                key={story.id}
                className={`${styles.storyItem} ${currentStory?.id === story.id ? styles.active : ''}`}
                onClick={() => handleStorySelect(story)}
              >
                <div className={styles.storyIcon}>
                  {story.watched ? '✓' : '📖'}
                </div>
                <div className={styles.storyInfo}>
                  <h4>{story.title}</h4>
                  <span>{story.duration}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {showNewStoryForm && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h3>Create New Story</h3>
            <p>Upload a story for Grandma to read</p>
            <div className={styles.uploadArea}>
              <p>Drag & drop your story file here</p>
              <p>or</p>
              <button className={styles.browseButton}>Browse Files</button>
              <p className={styles.fileTypes}>Supported formats: .txt, .pdf, .doc, .docx</p>
            </div>
            <div className={styles.modalActions}>
              <button 
                className={styles.cancelButton}
                onClick={() => setShowNewStoryForm(false)}
              >
                Cancel
              </button>
              <button className={styles.uploadButton}>
                Upload & Create
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GrandmaStories;
