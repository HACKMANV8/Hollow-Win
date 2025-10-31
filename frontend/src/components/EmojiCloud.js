import React from 'react';

export default function EmojiCloud() {
  const items = ['✨','⭐️','🌟','🪄','🧠','📚','🎈','🛰️','🧪','🔭'];
  return (
    React.createElement('div', { className: 'emoji-cloud', 'aria-hidden': 'true' },
      items.map((e, i) => React.createElement('span', { key: i }, e))
    )
  );
}


