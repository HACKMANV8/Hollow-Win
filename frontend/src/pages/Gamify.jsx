import React, { useState } from 'react';
import styles from './Gamify.module.css';

const games = [
  {
    id: 1,
    title: 'Memory Match',
    description: 'Test your memory with this fun matching game!',
    icon: '🧠',
    color: '#4F46E5',
    category: 'Brain Games',
    progress: 75,
    time: '15 min',
    lessons: 12,
    completed: 8
  },
  {
    id: 2,
    title: 'Word Search',
    description: 'Find hidden words in a grid of letters!',
    icon: '🔍',
    color: '#10B981',
    category: 'Word Games',
    progress: 40,
    time: '10 min',
    lessons: 10,
    completed: 4
  },
  {
    id: 3,
    title: 'Math Challenge',
    description: 'Solve math problems against the clock!',
    icon: '➕',
    color: '#F59E0B',
    category: 'Educational',
    progress: 20,
    time: '20 min',
    lessons: 15,
    completed: 3
  },
  {
    id: 4,
    title: 'Puzzle Master',
    description: 'Put the pieces together to complete the picture!',
    icon: '🧩',
    color: '#8B5CF6',
    category: 'Puzzles',
    progress: 90,
    time: '25 min',
    lessons: 8,
    completed: 7
  },
  {
    id: 5,
    title: 'Trivia Time',
    description: 'Test your knowledge with fun trivia questions!',
    icon: '🎯',
    color: '#EC4899',
    category: 'Trivia',
    progress: 60,
    time: '12 min',
    lessons: 10,
    completed: 6
  },
  {
    id: 6,
    title: 'Word Builder',
    description: 'Create as many words as you can from given letters!',
    icon: '🔤',
    color: '#3B82F6',
    category: 'Word Games',
    progress: 30,
    time: '18 min',
    lessons: 12,
    completed: 4
  },
];

const categories = [
  { id: 'all', name: 'All', count: games.length },
  { id: 'brain', name: 'Brain Games', count: 1 },
  { id: 'word', name: 'Word Games', count: 2 },
  { id: 'educational', name: 'Educational', count: 1 },
  { id: 'puzzles', name: 'Puzzles', count: 1 },
  { id: 'trivia', name: 'Trivia', count: 1 },
];

const Gamify = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredGames = games.filter(game => {
    const matchesSearch = game.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         game.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || 
                          (selectedCategory === 'word' && game.category === 'Word Games') ||
                          (selectedCategory === 'brain' && game.category === 'Brain Games') ||
                          (selectedCategory === 'educational' && game.category === 'Educational') ||
                          (selectedCategory === 'puzzles' && game.category === 'Puzzles') ||
                          (selectedCategory === 'trivia' && game.category === 'Trivia');
    return matchesSearch && matchesCategory;
  });

  return (
    <div className={styles.gamifyContainer}>
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <h1>My Learning</h1>
          <div className={styles.searchBar}>
            <span>🔍</span>
            <input
              type="text"
              placeholder="Search for courses"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div className={styles.headerRight}>
          <button className={styles.filterButton}>Filter</button>
          <button className={styles.sortButton}>Sort by: Newest</button>
        </div>
      </div>

      <div className={styles.categories}>
        {categories.map((category) => (
          <button
            key={category.id}
            className={`${styles.categoryButton} ${selectedCategory === category.id ? styles.active : ''}`}
            onClick={() => setSelectedCategory(category.id)}
          >
            {category.name}
            <span className={styles.categoryCount}>{category.count}</span>
          </button>
        ))}
      </div>

      <div className={styles.coursesGrid}>
        {filteredGames.map((course) => (
          <div key={course.id} className={styles.courseCard}>
            <div className={styles.courseImage} style={{ backgroundColor: `${course.color}20` }}>
              <div className={styles.courseIcon} style={{ backgroundColor: course.color }}>
                {course.icon}
              </div>
              <div className={styles.courseProgress}>
                <div 
                  className={styles.progressBar} 
                  style={{ 
                    width: `${course.progress}%`,
                    backgroundColor: course.color
                  }}
                ></div>
              </div>
              <div className={styles.progressText}>{course.progress}% Complete</div>
            </div>
            <div className={styles.courseInfo}>
              <div className={styles.courseMeta}>
                <span className={styles.lessons}>{course.completed}/{course.lessons} Lessons</span>
                <span className={styles.time}>⏱️ {course.time}</span>
              </div>
              <h3>{course.title}</h3>
              <p>{course.description}</p>
              <div className={styles.courseFooter}>
                <a 
                  href={course.id % 2 === 0 ? 'https://ferociter.itch.io/pents-road-trip' : 'https://mrstahlfelge.itch.io/lightblocks'}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={styles.continueButton}
                >
                  Continue
                </a>
                <div className={styles.difficulty}>
                  <span className={styles.difficultyDot} style={{ backgroundColor: course.color }}></span>
                  {course.category}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gamify;
