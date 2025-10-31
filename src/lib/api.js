export async function describeImage(base64) {
  try {
    const res = await fetch('/api/describe-image', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ image: base64 })
    });
    if (res.ok) {
      const data = await res.json();
      return data.description;
    }
  } catch (e) {
    // fall through to mock
  }
  return fallbackDescription();
}

function fallbackDescription() {
  const msgs = [
    'Beep‑boop! My curious sensors are tingling 🤖✨ I spot colors teaming up like best friends — looks adventurous! 🧭',
    'Hooray! This picture screams imagination power 🌈⚡ Let’s give it a silly name and a secret mission! 🕵️',
  ];
  return msgs[Math.floor(Math.random() * msgs.length)];
}


