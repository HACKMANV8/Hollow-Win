import React from 'react';

export default function Parents(){
  return (
    React.createElement(React.Fragment, null,
      React.createElement(Header, null),
      React.createElement('main', null,
        React.createElement('section', { className:'stories-header' },
          React.createElement('h1', { className:'stories-title' }, 'Parent Dashboard'),
          React.createElement('div', { className:'parent-grid' },
            [
              {title:'Progress per world', body:'Storya 80%, Thinka 45%, Dramia 20%, Melodia 10%'},
              {title:'Reading time', body:'This week: 1h 20m'},
              {title:'Quiz scores', body:'Avg 4/5 correct'},
              {title:'Suggestions', body:'Try logic stories and a music badge next 🎵'}
            ].map((c,i)=> (
              React.createElement('div', { key:i, className:'parent-card' },
                React.createElement('h3', null, c.title),
                React.createElement('p', null, c.body)
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
    React.createElement('a', { className:'nav-link', href:'#/my-stories' }, 'MY STORIES'),
    React.createElement('a', { className:'nav-link', href:'#/premium' }, 'PREMIUM'),
    React.createElement('a', { className:'nav-link', href:'#/gamify' }, 'GAMIFY'),
    React.createElement('a', { className:'btn btn-pill btn-green', href:'#/parents' }, 'PARENTS DASHBOARD')
  );
}


