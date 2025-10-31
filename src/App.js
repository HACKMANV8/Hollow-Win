// SPA shell with tiny hash router
import React from 'https://esm.sh/react@18.3.1';
import Home from '/src/pages/Home.js';
import Stories from '/src/pages/Stories.js';
import PictureMagic from '/src/pages/PictureMagic.js';
import StorySetup from '/src/pages/StorySetup.js';
import StoryStudio from '/src/pages/StoryStudio.js';

const routes = {
  '/': Home,
  '/stories': Stories,
  '/picture-magic': PictureMagic,
  '/story-setup': StorySetup,
  '/story-studio': StoryStudio,
};

export default function App() {
  const [path, setPath] = React.useState(() => normalize(location.hash));

  React.useEffect(() => {
    const onHash = () => setPath(normalize(location.hash));
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  const Page = routes[path] ?? Home;
  return React.createElement(Page, { navigate });
}

function navigate(to) {
  location.hash = to;
}

function normalize(hash) {
  const h = (hash || '').replace(/^#/, '');
  return h === '' ? '/' : h.startsWith('/') ? h : `/${h}`;
}


