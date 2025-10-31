import React from 'react';
import StoryStudio from '../components/StoryStudio/StoryStudio';
import styles from './Gamify.module.css';

// Navigation Components
function NavBrand() {
  return (
    <div className="brand">
      <div className="brand-mark">🫧</div>
      <div className="brand-text">
        <div className="brand-title">AAVYA AI</div>
        <div className="brand-sub">Learning feels like magic.</div>
      </div>
    </div>
  );
}

function NavLinks() {
  return (
    <nav className="main-nav">
      <a className="nav-link" href="#/">HOME</a>
      <a className="nav-link" href="#/my-stories">MY STORIES</a>
      <a className="nav-link" href="#/premium">PREMIUM</a>
      <a className="btn btn-pill btn-yellow" href="#/gamify">GAMIFY</a>
      <a className="btn btn-pill btn-green" href="#/parents">PARENTS DASHBOARD</a>
    </nav>
  );
}

function Header() {
  return (
    <header className="site-header">
      <NavBrand />
      <NavLinks />
    </header>
  );
}

// Main Component
export default function Gamify() {
  const worlds = [
    { slug: 'storya', emoji: '🌎', name: 'Planet Storya', theme: 'Basic learning stories', unlock: 'Free' },
    { slug: 'thinka', emoji: '🔬', name: 'Planet Thinka', theme: 'Logic & science stories', unlock: 'After 5 quizzes' },
    { slug: 'dramia', emoji: '🎭', name: 'Planet Dramia', theme: 'Interactive story choices', unlock: '20 starlight points' },
    { slug: 'rhymia', emoji: '🎶', name: 'Planet Rhymia', theme: 'Rhyming & poetry stories', unlock: 'After 10 stories' },
    { slug: 'puzzlia', emoji: '🧩', name: 'Planet Puzzlia', theme: 'Puzzle-based stories', unlock: 'Coming soon' },
  ];

  return (
    <div className={styles.gamifyContainer}>
      <Header />
      
      {/* Story Studio Section */}
      <section className={styles.storyStudioSection}>
        <h1>Story Studio</h1>
        <p>Create magical stories with AI and watch them come to life!</p>
        <StoryStudio />
      </section>
      
      {/* Games Section */}
      <section className={styles.gamesSection}>
        <header className={styles.gamifyHeader}>
          <h1>AAVYA Galaxy</h1>
          <p>Travel across playful worlds as you learn!</p>
        </header>
        
        <div className={styles.worldsGrid}>
          {worlds.map((world) => (
            <article key={world.slug} className={styles.planetCard}>
              <div className={styles.planetEmoji}>{world.emoji}</div>
              <h3>{world.name}</h3>
              <div className={styles.tag}>{world.theme}</div>
              <div className={styles.unlock}>{world.unlock}</div>
            </article>
          ))}
        </div>
      </section>
      
      {/* Kid Dashboard Section */}
      <section className={styles.kidDashboard}>
        <h2>Kid Dashboard</h2>
        <div className={styles.islands}>
          {['Reading', 'Science', 'Logic', 'Music'].map((subject, index) => (
            <div key={subject} className={styles.island}>
              <div className={styles.islandEmoji}>
                {['📖', '🧪', '🧩', '🎵'][index]}
              </div>
              <div className={styles.islandName}>{subject}</div>
            </div>
          ))}
        </div>
        <div className={styles.kidRow}>
          <div className={styles.kidCard}>Animated buddies say hi! 👋</div>
          <div className={styles.kidCard + ' ' + styles.glow}>Unlocked: New Chapter! ✨</div>
        </div>
        <div className={styles.storyGallery}>
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className={styles.comicTile}>📚</div>
          ))}
        </div>
      </section>
    </div>
  );
}
