import React from 'react';

export default function MyStories(){
  return (
    React.createElement(React.Fragment, null,
      React.createElement(Header, null),
      React.createElement('main', null,
        React.createElement('section', { className: 'stories-header' },
          React.createElement('h1', { className: 'stories-title' }, 'My Stories'),
          React.createElement('div', { className: 'story-grid' },
            Array.from({length:8}).map((_,i)=> (
              React.createElement('article', { key:i, className:'story-card' },
                React.createElement('div', { className:'story-thumb'}, ['📖','🧪','🎭','🎵'][i%4]),
                React.createElement('h3', null, 'Story ', i+1),
                React.createElement('a', { className:'btn btn-primary read-btn', href:'#/story-studio' }, 'Open')
              )
            ))
          )
        )
      )
    )
  );
}

function Header(){
  return (
    React.createElement('header', { className:'site-header' }, navBrand(), navLinks())
  );
}

function navBrand(){
  return React.createElement('div', { className:'brand' },
    React.createElement('div', { className:'brand-mark' }, '🫧'),
    React.createElement('div', { className:'brand-text' },
      React.createElement('div', { className:'brand-title' }, 'AAVYA AI'),
      React.createElement('div', { className:'brand-sub' }, 'Learning feels like magic.')
    )
  );
}
function navLinks(){
  return React.createElement('nav', { className:'main-nav' },
    React.createElement('a', { className:'nav-link', href:'#/' }, 'HOME'),
    React.createElement('a', { className:'btn btn-pill btn-secondary', href:'#/my-stories' }, 'MY STORIES'),
    React.createElement('a', { className:'nav-link', href:'#/premium' }, 'PREMIUM'),
    React.createElement('a', { className:'nav-link', href:'#/gamify' }, 'GAMIFY'),
    React.createElement('a', { className:'btn btn-pill btn-green', href:'#/parents' }, 'PARENTS DASHBOARD')
  );
}


