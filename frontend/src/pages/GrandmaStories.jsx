import React, { useState, useRef, useEffect } from 'react';
// Using window.location for navigation in Vite
import styles from './GrandmaStories.module.css';
import { FiArrowLeft, FiPlus, FiPlay, FiClock, FiDownload } from 'react-icons/fi';

// Mock data for stories with video URLs and transcripts
const mockStories = [
  { 
    id: 1, 
    title: 'The Enchanted Forest', 
    duration: '2:45', 
    watched: true,
    videoUrl: null,
    transcript: `Once upon a time, in a magical forest far away, there lived a young girl named Lily. She loved to explore the woods near her home.

One day, while walking through the forest, she discovered a hidden path she had never seen before. The path was lined with glowing mushrooms that lit up as she walked by.

Lily followed the path deeper into the forest, where she found a clearing filled with the most beautiful flowers she had ever seen. In the center of the clearing stood an ancient tree with a door carved into its trunk.

Curious, Lily opened the door and stepped inside. To her amazement, she found herself in a magical world where animals could talk and trees could sing.

The forest welcomed her with open arms, and Lily spent the day making new friends and learning about the magic that lived in the enchanted forest.

As the sun began to set, Lily knew it was time to go home. The animals promised she could return anytime, and the magical door would always be there waiting for her.

And so, Lily returned home with a heart full of wonder and the promise of many more adventures to come.`
  },
  { id: 2, title: 'The Lost Treasure', duration: '3:20', watched: false, videoUrl: 'https://www.youtube.com/embed/RMjr3Uf_Fq8?start=1', transcript: 'Transcript for The Lost Treasure story...' },
  { id: 3, title: 'The Brave Little Tailor', duration: '4:15', watched: false, videoUrl: 'https://www.youtube.com/embed/xSkcbY2Nwxw?start=5', transcript: 'Transcript for The Brave Little Tailor story...' },
  { id: 4, title: 'The Magic Paintbrush', duration: '3:50', watched: false, videoUrl: null, transcript: 'Transcript for The Magic Paintbrush story...' },
  { id: 5, title: 'The Golden Goose', duration: '2:30', watched: false, videoUrl: null, transcript: 'Transcript for The Golden Goose story...' },
];

const GrandmaStories = () => {
  // Navigation function for Vite
  const [stories, setStories] = useState(mockStories);
  const [currentStory, setCurrentStory] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showNewStoryForm, setShowNewStoryForm] = useState(false);
  const [uploadedVideo, setUploadedVideo] = useState(null);
  const [uploadedPDF, setUploadedPDF] = useState(null);
  const [storyVideos, setStoryVideos] = useState({});
  const videoRef = useRef(null);
  const fileInputRef = useRef(null);
  const pdfInputRef = useRef(null);
  const storyVideoInputRef = useRef(null);

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

  const handleStoryVideoUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('video/') && currentStory) {
      const videoURL = URL.createObjectURL(file);
      setStoryVideos(prev => ({
        ...prev,
        [currentStory.id]: videoURL
      }));
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

  const handleDownloadTranscript = () => {
    if (!currentStory || !currentStory.transcript) return;
    
    const element = document.createElement('a');
    const file = new Blob([currentStory.transcript], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `${currentStory.title.replace(/\s+/g, '_')}_transcript.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
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
              <>
                <div className={styles.videoWrapper}>
                  {storyVideos[currentStory.id] ? (
                    <video
                      ref={videoRef}
                      src={storyVideos[currentStory.id]}
                      className={styles.videoPlayer}
                      controls
                      autoPlay
                    />
                  ) : currentStory.videoUrl ? (
                    <iframe
                      src={currentStory.videoUrl}
                      className={styles.videoPlayer}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  ) : (
                    <div className={styles.videoPlaceholder} onClick={() => storyVideoInputRef.current?.click()}>
                      <span style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎬</span>
                      <p>Click to upload video for this story</p>
                    </div>
                  )}
                  <input
                    type="file"
                    ref={storyVideoInputRef}
                    onChange={handleStoryVideoUpload}
                    accept="video/*"
                    style={{ display: 'none' }}
                  />
                </div>
                <div className={styles.videoInfo}>
                  <h2>{currentStory.title}</h2>
                  <div className={styles.videoMeta}>
                    <span><FiClock size={16} /> {currentStory.duration}</span>
                  </div>
                </div>
                
                {currentStory.transcript && (
                  <div className={styles.transcriptSection}>
                    <div className={styles.transcriptHeader}>
                      <h3>Transcript</h3>
                      <button 
                        className={styles.downloadButton}
                        onClick={handleDownloadTranscript}
                      >
                        <FiDownload size={18} /> Download
                      </button>
                    </div>
                    <div className={styles.transcriptContent}>
                      {currentStory.transcript}
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className={styles.videoPlaceholder}>
                <p>Select a story to begin</p>
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
