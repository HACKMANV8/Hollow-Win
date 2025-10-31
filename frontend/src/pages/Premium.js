import React from 'react';

export default function Premium(){
  return (
    React.createElement(React.Fragment, null,
      React.createElement(Header, null),
      React.createElement('main', null,
        React.createElement('section', { className:'galaxy-hero' },
          React.createElement('h1', { className:'stories-title' }, 'Premium'),
          React.createElement('p', { className:'setup-sub' }, 'Unlock all worlds, badges, and voice-narrated videos.')
        ),
        React.createElement('section', { className:'worlds-grid' },
          ['Monthly','Yearly'].map((p,i)=> (
            React.createElement('article', { key:p, className:'planet-card' },
              React.createElement('div', { className:'planet-emoji' }, i? '🌟':'⭐️'),
              React.createElement('h3', null, p, ' Plan'),
              React.createElement('div', { className:'unlock' }, i? 'Save 20%':'Cancel anytime'),
              React.createElement('a', { className:'btn btn-primary', href:'#/premium/checkout' }, 'Get ', p)
            )
          ))
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
    React.createElement('a', { className:'btn btn-pill btn-secondary', href:'#/premium' }, 'PREMIUM'),
    React.createElement('a', { className:'nav-link', href:'#/gamify' }, 'GAMIFY'),
    React.createElement('a', { className:'btn btn-pill btn-green', href:'#/parents' }, 'PARENTS DASHBOARD')
  );
}


