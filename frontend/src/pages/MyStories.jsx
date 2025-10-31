import React from 'react';
import styles from './MyStories.module.css';

export default function MyStories({ navigate }) {
  // Sample data - replace with actual data from your state/API
  const stories = [
    { id: 1, title: 'My First Story', lastEdited: '2023-05-15' },
    { id: 2, title: 'Adventure Time', lastEdited: '2023-05-10' },
    { id: 3, title: 'Space Explorer', lastEdited: '2023-05-05' },
  ];

  return (
    <div className={styles.myStories}>
      <h1>My Stories</h1>
      
      <div className={styles.storiesGrid}>
        {stories.map(story => (
          <div key={story.id} className={styles.storyCard}>
            <h3>{story.title}</h3>
            <p>Last edited: {story.lastEdited}</p>
            <div className={styles.actions}>
              <button 
                className={styles.editButton}
                onClick={() => navigate(`/story-studio/${story.id}`)}
              >
                Edit
              </button>
              <button className={styles.deleteButton}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      
      <button 
        className={styles.newStoryButton}
        onClick={() => navigate('/story-setup')}
      >
        + Create New Story
      </button>
    </div>
  );
}
