import React from 'react';

export default function Stories() {
  return (
    React.createElement(React.Fragment, null,
      React.createElement(Header, null),
      React.createElement('main', null,
        React.createElement('section', { className: 'stories-header' },
          React.createElement('h1', { className: 'stories-title' }, 'YOUR STORY ADVENTURES!'),
          React.createElement('div', { className: 'filter-row' },
            React.createElement('a', { className: 'btn btn-pill btn-red', href: '#/stories' }, 'Learning Based'),
            React.createElement('a', { className: 'btn btn-pill btn-secondary', href: '#/stories' }, 'Entertainment Based'),
            React.createElement('a', { className: 'btn btn-pill btn-secondary', href: '#/stories?age=5-7' }, '5–7'),
            React.createElement('a', { className: 'btn btn-pill btn-secondary', href: '#/stories?age=8-10' }, '8–10'),
            React.createElement('a', { className: 'btn btn-pill btn-secondary', href: '#/stories?age=11-12' }, '11–12')
          )
        ),
        React.createElement('section', { className: 'story-grid' },
          sampleStories.map((s, i) => (
            React.createElement('article', { key: i, className: 'story-card' },
              React.createElement('div', { className: 'story-thumb', style: { background: s.bg } }, s.emoji),
              React.createElement('h3', null, s.title),
              React.createElement('div', { className: 'tag' }, '🏷️ ', React.createElement('span', null, s.genre)),
              React.createElement('a', { className: 'btn btn-primary read-btn', href: '#/stories/' + encodeURIComponent(s.slug) }, 'Read Story')
            )
          ))
        )
      ),
      React.createElement(Footer, null)
    )
  );
}

function Header() {
  return (
    React.createElement('header', { className: 'site-header' },
      React.createElement('div', { className: 'brand' },
        React.createElement('div', { className: 'brand-mark' }, '🫧'),
        React.createElement('div', { className: 'brand-text' },
          React.createElement('div', { className: 'brand-title' }, 'AAVYA AI'),
          React.createElement('div', { className: 'brand-sub' }, 'Learning feels like magic.')
        )
      ),
      React.createElement('nav', { className: 'main-nav' },
        React.createElement('a', { className: 'btn btn-pill btn-secondary', href: '#/' }, 'Home'),
        React.createElement('a', { className: 'btn btn-pill btn-green', href: '#/dashboard' }, 'Parent Dashboard'),
        React.createElement('a', { className: 'nav-link', href: '#/schools' }, 'Schools')
      )
    )
  );
}

function Footer() {
  return (
    React.createElement('footer', { className: 'site-footer' },
      React.createElement('span', null, `© ${new Date().getFullYear()} AAVYA AI`)
    )
  );
}

const sampleStories = [
  { title: 'The Mystery of the Missing Sparkle-Beries', genre: 'Fantasy', emoji: '🫥', slug: 'sparkle-berries', bg: 'linear-gradient(160deg,#74e1e1,#53b2f3)' },
  { title: 'The Mystery of the Missing-Berries', genre: 'Fantasy', emoji: '🟢', slug: 'missing-berries', bg: 'linear-gradient(160deg,#ff9f7c,#ff6d5f)' },
  { title: 'Pranntns Space Race', genre: 'Fantasy', emoji: '💙', slug: 'space-race', bg: 'linear-gradient(160deg,#7da6ff,#4f7bff)' },
  { title: 'Professor Oggle’s', genre: 'Trivia', emoji: '💜', slug: 'prof-oggle', bg: 'linear-gradient(160deg,#b98cff,#8b5dff)' },
  { title: 'Professor Oggle’s Sparle-Race', genre: 'Comedy', emoji: '🟡', slug: 'sparle-race', bg: 'linear-gradient(160deg,#ffd261,#ffb13e)' },
  { title: 'Professor of the Ste Race', genre: 'Comedy', emoji: '💚', slug: 'ste-race', bg: 'linear-gradient(160deg,#9af6c7,#50d59e)' },
];


