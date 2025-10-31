import React from 'https://esm.sh/react@18.3.1';
import EmojiCloud from '/src/components/EmojiCloud.js';

export default function Home({ navigate }) {
  return (
    React.createElement(React.Fragment, null,
      React.createElement(Header, { navigate }),
      React.createElement('main', null,
        React.createElement('section', { className: 'hero' },
          React.createElement('div', { className: 'spline-wrap', 'aria-hidden': 'true' },
            React.createElement('spline-viewer', {
              url: 'https://my.spline.design/googlyeyes-lhJi88KzpgpkDzbGVGKz8ZmZ-Xsk/',
              style: { width: '100%', height: '100%' }
            })
          ),
          React.createElement(EmojiCloud, null),
          React.createElement('div', { className: 'hero-content' },
            React.createElement('div', { className: 'hero-cta-row' },
              React.createElement('a', { className: 'btn btn-pill btn-red with-icon', href: '#/video' },
                React.createElement('span', { className: 'icon' }, '▶️'), 'Vid Generate'
              ),
              React.createElement('a', { className: 'btn btn-pill btn-yellow with-icon', href: '#/stories' },
                React.createElement('span', { className: 'icon' }, '📖'), 'Story Generate'
              ),
              React.createElement('a', { className: 'btn btn-pill btn-green with-icon', href: '#/dashboard' },
                React.createElement('span', { className: 'icon' }, '🛡️'), 'Parent Dashboard'
              )
            )
          )
        ),
        React.createElement('section', { className: 'grid' },
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
      React.createElement('h2', { className: 'card-title' }, 'Text to Adventures!'),
      React.createElement('div', { className: 'sticker', style: { left: '14px', top: '54px' } }, '🧒'),
      React.createElement('div', { className: 'sticker', style: { right: '16px', top: '36px' } }, '🤩'),
      React.createElement('div', { className: 'sticker', style: { left: '22px', bottom: '22px' } }, '🧙‍♂️'),
      React.createElement('div', { className: 'upload-box' },
        React.createElement('img', { className: 'preview', alt: 'Adventure art', src: 'https://images.unsplash.com/photo-1535905748047-14b2f2a59a78?q=80&w=1200&auto=format&fit=crop' })
      ),
      React.createElement('div', { className: 'actions' },
        React.createElement('a', { className: 'btn btn-primary', href: '#/story-setup' }, 'Create a Story')
      )
    )
  );
}

function CardBlue() {
  return (
    React.createElement('article', { className: 'card card-blue' },
      React.createElement('h2', { className: 'card-title' }, 'Picture Magic!'),
      React.createElement('div', { className: 'upload' },
        React.createElement('a', { className: 'btn btn-light btn-gleam', href: '#/picture-magic' }, 'Open Picture Magic'),
        React.createElement('p', { className: 'muted' }, 'Scan real-world objects!')
      ),
      React.createElement('div', { className: 'sticker', style: { right: '16px', top: '18px' } }, '📷'),
      React.createElement('div', { className: 'sticker', style: { left: '18px', bottom: '16px' } }, '🖍️')
    )
  );
}

function CardGreen() {
  return (
    React.createElement('article', { className: 'card card-green' },
      React.createElement('h2', { className: 'card-title' }, 'Grandma’s Stories'),
      React.createElement('p', { className: 'muted' }, 'Listen to tales of wisdom!'),
      React.createElement('button', { className: 'play' }, '▶'),
      React.createElement('div', { className: 'sticker', style: { right: '22px', bottom: '22px' } }, '👵'),
      React.createElement('div', { className: 'sticker', style: { left: '18px', top: '18px' } }, '💚')
    )
  );
}

function CardPink() {
  return (
    React.createElement('article', { className: 'card card-pink' },
      React.createElement('h2', { className: 'card-title' }, 'Cultural Tales'),
      React.createElement('p', { className: 'muted' }, 'Explore stories from around the world!'),
      React.createElement('a', { className: 'btn btn-light', href: '#/stories?section=cultural' }, 'Explore'),
      React.createElement('div', { className: 'sticker', style: { right: '18px', top: '18px' } }, '🌏'),
      React.createElement('div', { className: 'sticker', style: { left: '18px', bottom: '20px' } }, '🎭')
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


