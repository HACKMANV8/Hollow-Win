import React from 'https://esm.sh/react@18.3.1';

export default function EmojiCloud() {
  const items = ['✨','⭐️','🌟','🪄','🧠','📚','🎈','🛰️','🧪','🔭'];
  return (
    React.createElement('div', { className: 'emoji-cloud', 'aria-hidden': 'true' },
      items.map((e, i) => React.createElement('span', { key: i }, e))
    )
  );
}


