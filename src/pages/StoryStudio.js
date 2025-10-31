import React from 'https://esm.sh/react@18.3.1';

export default function StoryStudio() {
  const setup = React.useMemo(() => {
    try { return JSON.parse(sessionStorage.getItem('storySetup') || '{}'); } catch { return {}; }
  }, []);
  const [script, setScript] = React.useState(() => seedScript(setup));

  return (
    React.createElement(React.Fragment, null,
      React.createElement(Header, null),
      React.createElement('main', null,
        React.createElement('section', { className: 'studio' },
          React.createElement('div', { className: 'studio-left' },
            React.createElement('h1', { className: 'studio-title' }, 'Turn Words Into Worlds!'),
            React.createElement('textarea', { className: 'studio-editor', value: script, onChange: (e) => setScript(e.target.value) })
          ),
          React.createElement('div', { className: 'studio-right' },
            React.createElement('div', { className: 'studio-canvas' }, '🎬 Scene Preview'),
            React.createElement('div', { className: 'studio-toolbar' },
              React.createElement('button', { className: 'btn btn-primary' }, 'Publish Video')
            ),
            React.createElement('div', { className: 'studio-timeline' },
              Array.from({ length: 8 }).map((_, i) => (
                React.createElement('div', { key: i, className: 'timeline-card' }, ['🦙','🐶','🦊','🪐','👀','🌳','🍎','🚀'][i])
              ))
            )
          )
        )
      )
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
        React.createElement('a', { className: 'btn btn-pill btn-secondary', href: '#/story-setup' }, 'Back'),
        React.createElement('a', { className: 'btn btn-pill btn-green', href: '#/stories' }, 'Story Gallery')
      )
    )
  );
}

function seedScript({ genre='Fantasy', age='8-10', name='Alex', relationship='best friend' }) {
  return (
`Alex

${emoji('book')} Once upon a time in a ${genre.toLowerCase()} world, ${name} and their ${relationship} discover a clue that starts a curious quest!

${emoji('sparkles')} With bravery (and giggles), they follow the trail through friendly forests and starry skies.

${emoji('bulb')} What do they learn along the way? Write your own twist here…`
  );
}

function emoji(type){
  const map = { book:'📘', sparkles:'✨', bulb:'💡' };
  return map[type] || '✨';
}


