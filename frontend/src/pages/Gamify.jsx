import React, { useState } from 'react';
import styles from './Gamify.module.css';

const games = [
  {
    id: 1,
    title: 'Memory Match',
    description: 'Test your memory with this fun matching game!',
    icon: '🧠',
    color: '#FF9F43',
    category: 'Brain Games'
  },
  {
    id: 2,
    title: 'Word Search',
    description: 'Find hidden words in a grid of letters!',
    icon: '🔍',
    color: '#26C6DA',
    category: 'Word Games'
  },
  {
    id: 3,
    title: 'Math Challenge',
    description: 'Solve math problems against the clock!',
    icon: '➕',
    color: '#66BB6A',
    category: 'Educational'
  },
  {
    id: 4,
    title: 'Puzzle Master',
    description: 'Put the pieces together to complete the picture!',
    icon: '🧩',
    color: '#AB47BC',
    category: 'Puzzles'
  },
  {
    id: 5,
    title: 'Trivia Time',
    description: 'Test your knowledge with fun trivia questions!',
    icon: '🎯',
    color: '#FF7043',
    category: 'Trivia'
  },
  {
    id: 6,
    title: 'Word Builder',
    description: 'Create as many words as you can from given letters!',
    icon: '🔤',
    color: '#26A69A',
    category: 'Word Games'
  }
];

const Gamify = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  
  const categories = ['All', ...new Set(games.map(game => game.category))];
  
  const filteredGames = activeCategory === 'All' 
    ? games 
    : games.filter(game => game.category === activeCategory);

  return (
    <div className={styles.gamifyContainer}>
      <header className={styles.header}>
        <h1>Games</h1>
        <div className={styles.searchBar}>
          <input type="text" placeholder="Search games..." />
          <span role="img" aria-label="search">🔍</span>
        </div>
      </header>
      
      <div className={styles.categories}>
        {categories.map(category => (
          <button
            key={category}
            className={`${styles.categoryBtn} ${activeCategory === category ? styles.active : ''}`}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>
      
      <div className={styles.gamesGrid}>
        {filteredGames.map(game => (
          <div key={game.id} className={styles.gameCard} style={{ '--card-color': game.color }}>
            <div className={styles.gameIcon} style={{ backgroundColor: `${game.color}20` }}>
              {game.icon}
            </div>
            <div className={styles.gameInfo}>
              <h3>{game.title}</h3>
              <p>{game.description}</p>
              <div className={styles.gameMeta}>
                <span className={styles.gameCategory}>{game.category}</span>
                <button className={styles.playButton}>Play</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gamify;
