import React from 'react';

export default function Gamify() {
  return (
    React.createElement(React.Fragment, null,
      React.createElement(Header, null),
      React.createElement('main', null,
        React.createElement('section', { className: 'galaxy-hero' },
          React.createElement('h1', { className: 'stories-title' }, 'GAMIFY — AAVYA Galaxy'),
          React.createElement('p', { className: 'setup-sub' }, 'Travel across playful worlds as you learn!')
        ),
        React.createElement('section', { className: 'worlds-grid' },
          worlds.map((w) => (
            React.createElement('article', { key: w.slug, className: 'planet-card' },
              React.createElement('div', { className: 'planet-emoji' }, w.emoji),
              React.createElement('h3', null, w.name),
              React.createElement('div', { className: 'tag' }, w.theme),
              React.createElement('div', { className: 'unlock' }, w.unlock)
            )
          ))
        ),
        React.createElement('section', { className: 'kid-dash' },
          React.createElement('h2', null, 'Kid Dashboard'),
          React.createElement('div', { className: 'islands' },
            ['Reading','Science','Logic','Music'].map((s, i) => (
              React.createElement('div', { key: s, className: 'island' },
                React.createElement('div', { className: 'island-emoji' }, ['📖','🧪','🧩','🎵'][i]),
                React.createElement('div', { className: 'island-name' }, s)
              )
            ))
          ),
          React.createElement('div', { className: 'kid-row' },
            React.createElement('div', { className: 'kid-card' }, 'Animated buddies say hi! 👋'),
            React.createElement('div', { className: 'kid-card glow' }, 'Unlocked: New Chapter! ✨')
          ),
          React.createElement('div', { className: 'story-gallery' },
            Array.from({ length: 6 }).map((_, i) => (
              React.createElement('div', { key: i, className: 'comic-tile' }, '📚')
            ))
          )
        )
      )
    )
  );
}

function Header() {
  return (
    React.createElement('header', { className: 'site-header' },
      navBrand(),
      navLinks()
    )
  );
}

function navBrand(){
  return React.createElement('div', { className: 'brand' },
    React.createElement('div', { className: 'brand-mark' }, '🫧'),
    React.createElement('div', { className: 'brand-text' },
      React.createElement('div', { className: 'brand-title' }, 'AAVYA AI'),
      React.createElement('div', { className: 'brand-sub' }, 'Learning feels like magic.')
    )
  );
}

function navLinks(){
  return React.createElement('nav', { className: 'main-nav' },
    React.createElement('a', { className: 'nav-link', href: '#/' }, 'HOME'),
    React.createElement('a', { className: 'nav-link', href: '#/my-stories' }, 'MY STORIES'),
    React.createElement('a', { className: 'nav-link', href: '#/premium' }, 'PREMIUM'),
    React.createElement('a', { className: 'btn btn-pill btn-yellow', href: '#/gamify' }, 'GAMIFY'),
    React.createElement('a', { className: 'btn btn-pill btn-green', href: '#/parents' }, 'PARENTS DASHBOARD')
  );
}

const worlds = [
  { slug:'storya', emoji:'🌎', name:'Planet Storya', theme:'Basic learning stories', unlock:'Free' },
  { slug:'thinka', emoji:'🔬', name:'Planet Thinka', theme:'Logic & science stories', unlock:'After 5 quizzes' },
  { slug:'dramia', emoji:'🎭', name:'Planet Dramia', theme:'Interactive story choices', unlock:'20 starlight points' },
  { slug:'melodia', emoji:'🎵', name:'Planet Melodia', theme:'Musical learning', unlock:'After unlocking 2 badges' },
];


