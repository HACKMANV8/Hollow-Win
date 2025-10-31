import React from 'react';
import Spline from '@splinetool/react-spline';

export default function Home({ navigate }) {
  return (
    React.createElement(React.Fragment, null,
      React.createElement(Header, { navigate }),
      React.createElement('main', null,
        React.createElement('section', { className: 'hero' },
          React.createElement('div', { className: 'spline-right' },
            React.createElement(Spline, { scene: 'https://prod.spline.design/bk9jny3McARAJ6gE/scene.splinecode' })
          ),
          React.createElement('div', { className: 'hero-content' },
            React.createElement('div', { className: 'hero-cta-row' },
              React.createElement('a', { className: 'btn btn-pill btn-red', href: '#/video' }, 'Vid Generate'),
              React.createElement('a', { className: 'btn btn-pill btn-yellow', href: '#/stories' }, 'Story Generate'),
              React.createElement('a', { className: 'btn btn-pill btn-green', href: '#/dashboard' }, 'Parent Dashboard')
            )
          )
        ),
        React.createElement('section', { className: 'features' },
          React.createElement(CardOrange, { navigate }),
          React.createElement(CardBlue, null),
          React.createElement(CardGreen, null),
          React.createElement(CardPink, null)
        )
      ),
      React.createElement(Footer, null)
    )
  );
}

function Header({ navigate }) {
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
        React.createElement('a', { className: 'btn btn-pill btn-secondary', href: '#/' }, 'HOME'),
        React.createElement('a', { className: 'nav-link', href: '#/my-stories' }, 'MY STORIES'),
        React.createElement('a', { className: 'nav-link', href: '#/premium' }, 'PREMIUM'),
        React.createElement('a', { className: 'btn btn-pill btn-yellow', href: '#/gamify' }, 'GAMIFY'),
        React.createElement('a', { className: 'btn btn-pill btn-green', href: '#/parents' }, 'PARENTS DASHBOARD')
      )
    )
  );
}

function CardOrange({ navigate }) {
  return (
    React.createElement('article', { className: 'card card-orange' },
      React.createElement('div', { className: 'card-content' },
        React.createElement('h2', { className: 'card-title' }, 'Text to Adventures!')
      ),
      React.createElement('div', { className: 'sticker' }, '🧙‍♂️'),
      React.createElement('div', { className: 'actions' },
        React.createElement('a', { className: 'btn btn-primary', href: '#/story-setup' }, 'Create a Story')
      )
    )
  );
}

function CardBlue() {
  return (
    React.createElement('article', { className: 'card card-blue' },
      React.createElement('div', { className: 'card-content' },
        React.createElement('h2', { className: 'card-title' }, 'Picture Magic!'),
        React.createElement('div', { className: 'upload' },
          React.createElement('a', { className: 'btn btn-light btn-gleam', href: '#/picture-magic' }, 'Open Picture Magic'),
          React.createElement('p', { className: 'muted' }, 'Scan real-world objects!')
        )
      ),
      React.createElement('div', { className: 'sticker' }, '📷')
    )
  );
}

function CardGreen() {
  return (
    React.createElement('article', { className: 'card card-green' },
      React.createElement('div', { className: 'card-content' },
        React.createElement('h2', { className: 'card-title' }, 'Grandma’s Stories'),
        React.createElement('p', { className: 'muted' }, 'Listen to tales of wisdom!'),
        React.createElement('button', { className: 'play' }, '▶')
      ),
      React.createElement('div', { className: 'sticker' }, '👵')
    )
  );
}

function CardPink() {
  return (
    React.createElement('article', { className: 'card card-pink' },
      React.createElement('div', { className: 'card-content' },
        React.createElement('h2', { className: 'card-title' }, 'Cultural Tales'),
        React.createElement('p', { className: 'muted' }, 'Explore stories from around the world!'),
        React.createElement('a', { className: 'btn btn-light', href: '#/stories?section=cultural' }, 'Explore')
      ),
      React.createElement('div', { className: 'sticker' }, '🌏')
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


