import React from 'https://esm.sh/react@18.3.1';

export default function StorySetup() {
  const [form, setForm] = React.useState({
    genre: 'Fantasy',
    age: '8-10',
    name: 'Alex',
    relationship: 'best friend',
  });

  function update(key, val) {
    setForm((f) => ({ ...f, [key]: val }));
  }

  function start() {
    sessionStorage.setItem('storySetup', JSON.stringify(form));
    location.hash = '/story-studio';
  }

  return (
    React.createElement(React.Fragment, null,
      React.createElement(Header, null),
      React.createElement('main', null,
        React.createElement('section', { className: 'setup' },
          React.createElement('h1', { className: 'setup-title' }, 'Create Your Story'),
          React.createElement('p', { className: 'setup-sub' }, 'Pick your adventure style, age level, and your hero!'),
          React.createElement('div', { className: 'setup-grid' },
            React.createElement('div', { className: 'setup-card' },
              React.createElement('label', null, 'Genre'),
              React.createElement('div', { className: 'chip-row' },
                ['Fantasy','Adventure','Comedy','Sci‑Fi'].map((g) => (
                  React.createElement('button', {
                    key: g,
                    className: 'chip' + (form.genre === g ? ' is-active' : ''),
                    onClick: () => update('genre', g)
                  }, g)
                ))
              )
            ),
            React.createElement('div', { className: 'setup-card' },
              React.createElement('label', null, 'Age Range'),
              React.createElement('div', { className: 'pill-row' },
                ['5-7','8-10','11-12'].map((a) => (
                  React.createElement('button', {
                    key: a,
                    className: 'pill' + (form.age === a ? ' is-active' : ''),
                    onClick: () => update('age', a)
                  }, a)
                ))
              )
            ),
            React.createElement('div', { className: 'setup-card' },
              React.createElement('label', null, 'Main Character Name'),
              React.createElement('input', { className: 'input', value: form.name, onChange: (e) => update('name', e.target.value) })
            ),
            React.createElement('div', { className: 'setup-card' },
              React.createElement('label', null, 'Relationship'),
              React.createElement('input', { className: 'input', value: form.relationship, onChange: (e) => update('relationship', e.target.value), placeholder: 'e.g., little brother, pet cat' })
            )
          ),
          React.createElement('div', { className: 'actions' },
            React.createElement('button', { className: 'btn btn-primary', onClick: start }, 'Create Story')
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
        React.createElement('a', { className: 'btn btn-pill btn-secondary', href: '#/' }, 'Home'),
        React.createElement('a', { className: 'btn btn-pill btn-green', href: '#/stories' }, 'Story Gallery')
      )
    )
  );
}


