import React from 'https://esm.sh/react@18.3.1';
import { describeImage } from '/src/lib/api.js';

export default function PictureMagic() {
  const [imageSrc, setImageSrc] = React.useState(null);
  const [result, setResult] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const fileRef = React.useRef(null);

  function pick() { fileRef.current?.click(); }
  function onFile(e) {
    const f = e.target.files?.[0];
    if (!f) return;
    const reader = new FileReader();
    reader.onload = async () => {
      const base64 = reader.result;
      setImageSrc(base64);
      setLoading(true);
      setResult('');
      const text = await describeImage(base64) || await richerMockDescribe();
      setResult(text);
      setLoading(false);
    };
    reader.readAsDataURL(f);
  }

  return (
    React.createElement(React.Fragment, null,
      React.createElement(Header, null),
      React.createElement('main', null,
        React.createElement('section', { className: 'pm-hero' },
          React.createElement('div', { className: 'pm-title' },
            React.createElement('span', { className: 'pm-emoji' }, '👀'),
            ' Picture Magic'
          ),
          React.createElement('p', { className: 'pm-sub' }, 'Upload a photo or use your camera — let AAVYA turn it into a curious, kid‑friendly discovery!')
        ),
        React.createElement('section', { className: 'pm-stage' },
          React.createElement('div', { className: 'pm-left' },
            React.createElement('div', { className: 'pm-drop' },
              imageSrc ? React.createElement('img', { src: imageSrc, className: 'pm-preview', alt: 'Selected' }) : React.createElement('div', { className: 'pm-placeholder' }, '📸 Snap or Upload'),
            ),
            React.createElement('div', { className: 'pm-actions' },
              React.createElement('button', { className: 'btn btn-light btn-gleam', onClick: pick }, 'Add Upload / Use Camera — Scan real‑world objects!'),
              React.createElement('input', { ref: fileRef, type: 'file', accept: 'image/*', capture: 'environment', onChange: onFile, style: { display: 'none' } })
            )
          ),
          React.createElement('div', { className: 'pm-right' },
            loading && React.createElement('div', { className: 'pm-bubble' },
              React.createElement('span', { className: 'spinner' }), ' Brewing a magical explanation...'
            ),
            !!result && React.createElement('div', { className: 'pm-bubble' }, result),
            !loading && !result && React.createElement('div', { className: 'pm-bubble pm-muted' }, 'Tip: Try a toy, fruit, or your drawing! 🧸🍎✏️')
          )
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
        React.createElement('a', { className: 'btn btn-pill btn-green', href: '#/stories' }, 'Story Generate')
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

async function richerMockDescribe() {
  const openers = [
    'Beep‑boop! My curious sensors are tingling 🤖✨',
    'Zooming in with my story goggles 🥽🔎',
    'Sprinkling imagination dust on your photo 🪄✨',
  ];
  const bodies = [
    'I see shapes and colors teaming up like best friends, making a brave little hero ready for adventure! 🦸‍♂️🌈',
    'It looks like something from a kid scientist’s lab — smart, shiny, and a tiny bit silly! 🧪😄',
    'If this could talk, it would say “Let’s explore!” and race you to outer space! 🚀🪐',
    'This reminds me of a secret treasure that unlocks giggles when discovered! 💎😂',
  ];
  const closers = [
    'What shall we name it, Captain? 👩‍✈️🗺️',
    'Mission idea: draw it with googly eyes and give it a superpower! 👀⚡',
    'Let’s tell a mini story about it together — you start the first line! 📖✨',
  ];
  await new Promise(r => setTimeout(r, 900));
  function pick(arr){ return arr[Math.floor(Math.random()*arr.length)]; }
  return `${pick(openers)} ${pick(bodies)} ${pick(closers)}`;
}


