import React, { useState } from 'react';
import { FiArrowLeft, FiImage, FiPlus, FiTrash2 } from 'react-icons/fi';
import './StorySetup.css';

const StorySetup = () => {
  const [step, setStep] = useState(1);
  const [story, setStory] = useState({
    title: '',
    description: '',
    genre: '',
    style: '',
    characters: [
      { name: '', role: '', image: null },
      { name: '', role: '', image: null },
    ],
  });

  const genres = ['Fantasy', 'Adventure', 'Comedy', 'Mystery', 'Sci-Fi'];
  const styles = ['Epic', 'Comedy', 'Drama', 'Horror', 'Documentary'];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setStory(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCharacterChange = (index, field, value) => {
    const updatedCharacters = [...story.characters];
    updatedCharacters[index] = {
      ...updatedCharacters[index],
      [field]: value
    };
    setStory(prev => ({
      ...prev,
      characters: updatedCharacters
    }));
  };

  const addCharacter = () => {
    setStory(prev => ({
      ...prev,
      characters: [...prev.characters, { name: '', role: '', image: null }]
    }));
  };

  const removeCharacter = (index) => {
    if (story.characters.length > 2) {
      const updatedCharacters = story.characters.filter((_, i) => i !== index);
      setStory(prev => ({
        ...prev,
        characters: updatedCharacters
      }));
    }
  };

  const handleImageUpload = (index, e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        handleCharacterChange(index, 'image', reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Story submitted:', story);
    // Add your submission logic here
  };

  return (
    <div className="story-setup">
      <header className="setup-header">
        <button className="back-button" onClick={prevStep} disabled={step === 1}>
          <FiArrowLeft /> Back
        </button>
        <h1>Story Setup</h1>
        <div className="step-indicator">
          {[1, 2, 3].map((num) => (
            <div 
              key={num} 
              className={`step ${step === num ? 'active' : ''} ${step > num ? 'completed' : ''}`}
              onClick={() => setStep(num)}
            >
              {num}
            </div>
          ))}
        </div>
      </header>

      <main className="setup-content">
        {step === 1 && (
          <div className="setup-step">
            <h2>Basic Information</h2>
            <div className="form-group">
              <label>Story Title</label>
              <input
                type="text"
                name="title"
                value={story.title}
                onChange={handleInputChange}
                placeholder="Enter story title"
              />
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea
                name="description"
                value={story.description}
                onChange={handleInputChange}
                placeholder="Describe your story..."
                rows="4"
              />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Genre</label>
                <select 
                  name="genre" 
                  value={story.genre}
                  onChange={handleInputChange}
                >
                  <option value="">Select Genre</option>
                  {genres.map(genre => (
                    <option key={genre} value={genre}>{genre}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Style</label>
                <select 
                  name="style" 
                  value={story.style}
                  onChange={handleInputChange}
                >
                  <option value="">Select Style</option>
                  {styles.map(style => (
                    <option key={style} value={style}>{style}</option>
                  ))}
                </select>
              </div>
            </div>
            <button className="next-button" onClick={nextStep}>
              Next: Add Characters
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="setup-step">
            <h2>Characters</h2>
            <div className="characters-grid">
              {story.characters.map((char, index) => (
                <div key={index} className="character-card">
                  <div className="character-image-upload">
                    <input
                      type="file"
                      id={`char-image-${index}`}
                      accept="image/*"
                      onChange={(e) => handleImageUpload(index, e)}
                      className="hidden"
                    />
                    <label htmlFor={`char-image-${index}`} className="image-upload-label">
                      {char.image ? (
                        <img src={char.image} alt={`Character ${index + 1}`} />
                      ) : (
                        <div className="image-placeholder">
                          <FiImage size={24} />
                          <span>Add Image</span>
                        </div>
                      )}
                    </label>
                  </div>
                  <div className="character-details">
                    <input
                      type="text"
                      placeholder="Character Name"
                      value={char.name}
                      onChange={(e) => handleCharacterChange(index, 'name', e.target.value)}
                    />
                    <input
                      type="text"
                      placeholder="Role in Story"
                      value={char.role}
                      onChange={(e) => handleCharacterChange(index, 'role', e.target.value)}
                    />
                  </div>
                  {story.characters.length > 2 && (
                    <button 
                      className="remove-character"
                      onClick={() => removeCharacter(index)}
                    >
                      <FiTrash2 />
                    </button>
                  )}
                </div>
              ))}
              <button className="add-character" onClick={addCharacter}>
                <FiPlus size={24} />
                Add Character
              </button>
            </div>
            <div className="form-actions">
              <button className="back-button" onClick={prevStep}>
                Back
              </button>
              <button className="next-button" onClick={nextStep}>
                Next: Review & Create
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="setup-step">
            <h2>Review Your Story</h2>
            <div className="review-card">
              <h3>{story.title || 'Untitled Story'}</h3>
              <p className="description">
                {story.description || 'No description provided.'}
              </p>
              <div className="meta">
                <span>Genre: {story.genre || 'Not specified'}</span>
                <span>Style: {story.style || 'Not specified'}</span>
              </div>
              <h4>Characters</h4>
              <div className="characters-preview">
                {story.characters.map((char, index) => (
                  <div key={index} className="character-preview">
                    {char.image ? (
                      <img src={char.image} alt={char.name || `Character ${index + 1}`} />
                    ) : (
                      <div className="character-avatar">
                        {char.name ? char.name.charAt(0).toUpperCase() : '?'}
                      </div>
                    )}
                    <div>
                      <div className="character-name">{char.name || 'Unnamed Character'}</div>
                      <div className="character-role">{char.role || 'No role specified'}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="form-actions">
              <button className="back-button" onClick={prevStep}>
                Back
              </button>
              <button className="create-button" onClick={handleSubmit}>
                Create Story
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default StorySetup;


