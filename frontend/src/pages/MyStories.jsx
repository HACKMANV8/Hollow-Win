import React, { useState, useEffect } from "react";
import HTMLFlipBook from "react-pageflip";
import { useAppContext } from "../Context/AppContext";

export default function MyStories() {
  const {
    stories,
    currentStory,
    isLoading,
    isGenerating,
    error,
    hasMore,
    getAllStories,
    getStoryById,
    loadMoreStories,
    createFullStory,
    clearError,
  } = useAppContext();

  const [showCreateForm, setShowCreateForm] = useState(false);
  const [formData, setFormData] = useState({
    prompt: "",
    mainCharacter: "",
    genre: "Adventure",
    language: "English",
  });

  // Load stories on mount
  useEffect(() => {
    clearError();
    getAllStories(1, 12);
  }, [getAllStories, clearError]);

  const handleCreateStory = async (e) => {
    e.preventDefault();
    if (!formData.prompt || !formData.mainCharacter) {
      alert("Please fill in all fields!");
      return;
    }
    try {
      await createFullStory({
        prompt: formData.prompt,
        mainCharacter: formData.mainCharacter,
        genre: formData.genre,
        language: formData.language,
        userId: localStorage.getItem("userId") || "guest",
      });
      setShowCreateForm(false);
      setFormData({
        prompt: "",
        mainCharacter: "",
        genre: "Adventure",
        language: "English",
      });
      await getAllStories();
      alert("🎉 Story created successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to create story.");
    }
  };

  return (
    <>
      <Header />

      <section className="stories-header">
        <h1 className="stories-title">
          📚 My Stories{" "}
          <span style={{ fontSize: "18px", opacity: 0.7 }}>
            ({stories.length} total)
          </span>
        </h1>

        <div className="filter-row">
          <button
            className="btn btn-green"
            onClick={() => setShowCreateForm(true)}
            disabled={isGenerating}
          >
            {isGenerating ? "Creating..." : "✨ Create New Story"}
          </button>
        </div>

        {error && (
          <div
            style={{
              background: "rgba(255,90,95,.15)",
              padding: "10px 14px",
              borderRadius: "10px",
              marginTop: "12px",
              color: "#ff5a5f",
            }}
          >
            {error}
            <button
              onClick={clearError}
              style={{
                background: "transparent",
                border: "0",
                color: "#ff5a5f",
                fontSize: "18px",
                marginLeft: "10px",
                cursor: "pointer",
              }}
            >
              ×
            </button>
          </div>
        )}
      </section>

      {/* ─── STORIES GRID ───────────────────────────── */}
      {isLoading && stories.length === 0 ? (
        <p style={{ textAlign: "center", marginTop: "40px", opacity: 0.8 }}>
          Loading stories...
        </p>
      ) : stories.length > 0 ? (
        <div className="story-grid">
          {stories.map((story) => (
            <div
              key={story._id}
              className="story-card"
              onClick={() => getStoryById(story._id)}
              style={{
                background:
                  "linear-gradient(135deg, #fff, #f6f6f9, #fafafa, #fff)",
                borderRadius: "16px",
                padding: "12px",
                boxShadow:
                  "0 2px 5px rgba(0,0,0,0.08), 0 6px 18px rgba(0,0,0,0.06)",
                cursor: "pointer",
                transition: "transform 0.2s ease-in-out",
              }}
            >
              <div className="story-thumb">
                {story.images && story.images.length > 0 ? (
                  <img
                    src={story.images[0].url}
                    alt={story.title}
                    style={{
                      width: "100%",
                      height: "200px",
                      objectFit: "cover",
                      borderRadius: "12px",
                    }}
                  />
                ) : (
                  <div
                    style={{
                      height: "200px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: "#f0f0f0",
                      borderRadius: "12px",
                      color: "#888",
                      fontSize: "40px",
                    }}
                  >
                    📖
                  </div>
                )}
              </div>
              <div style={{ marginTop: "12px" }}>
                <h3
                  style={{
                    fontSize: "18px",
                    fontWeight: "700",
                    margin: "0 0 6px",
                    color: "#333",
                  }}
                >
                  {story.title}
                </h3>
                <p
                  style={{
                    fontSize: "14px",
                    color: "#555",
                    marginBottom: "6px",
                  }}
                >
                  {story.storySummary}
                </p>
                <div className="tag">
                  <span>{story.genre}</span> |{" "}
                  <span>{story.storyLanguage}</span>
                </div>
              </div>
              <button
                className="btn btn-light read-btn"
                style={{
                  marginTop: "10px",
                  width: "100%",
                  borderRadius: "10px",
                  background: "#7b61ff",
                  color: "white",
                  padding: "10px 0",
                }}
              >
                Read Story
              </button>
            </div>
          ))}
        </div>
      ) : (
        !isLoading && (
          <div style={{ textAlign: "center", marginTop: "60px" }}>
            <h2>No stories found 😔</h2>
            <p>Create your first magical story below!</p>
            <button
              className="btn btn-green"
              onClick={() => setShowCreateForm(true)}
            >
              ✍️ Create Story
            </button>
          </div>
        )
      )}

      {hasMore && (
        <div style={{ textAlign: "center", margin: "30px 0" }}>
          <button
            onClick={loadMoreStories}
            className="btn btn-primary"
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Load More"}
          </button>
        </div>
      )}

      {/* ─── STORY VIEWER ───────────────────────────── */}
      {currentStory && (
        <div
          className="game-modal"
          style={{
            backdropFilter: "blur(12px)",
            background: "rgba(0,0,0,0.4)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            className="game-dialog"
            style={{
              maxWidth: "950px",
              padding: "30px",
              background: "linear-gradient(145deg, #fff, #fefcf8)",
              borderRadius: "16px",
              position: "relative",
              boxShadow:
                "0 10px 40px rgba(0,0,0,0.3), inset 0 0 30px rgba(255,255,255,0.3)",
            }}
          >
            <div
              className="game-dialog-header"
              style={{
                justifyContent: "space-between",
                marginBottom: "20px",
              }}
            >
              <h2 style={{ color: "#333", fontWeight: "700" }}>
                {currentStory.title}
              </h2>
              <button
                className="close-btn"
                onClick={() => getStoryById(null)}
                style={{
                  fontSize: "22px",
                  border: "none",
                  background: "transparent",
                  cursor: "pointer",
                  color: "#555",
                }}
              >
                ×
              </button>
            </div>

            {currentStory.images?.length > 0 && (
              <img
                src={currentStory.images[0].url}
                alt={currentStory.title}
                style={{
                  width: "100%",
                  height: "280px",
                  borderRadius: "12px",
                  objectFit: "cover",
                  marginBottom: "20px",
                }}
              />
            )}

            {/* 🌈 Flipbook Section */}
            <BookReader story={currentStory} />
          </div>
        </div>
      )}
    </>
  );
}

/* ───────────────────────────── HEADER COMPONENT ───────────────────────────── */
function Header() {
  return (
    <header className="site-header">
      {navBrand()}
      {navLinks()}
    </header>
  );
}

function navBrand() {
  return (
    <div className="brand">
      <div className="brand-mark">🫧</div>
      <div className="brand-text">
        <div className="brand-title">AAVYA AI</div>
        <div className="brand-sub">Learning feels like magic.</div>
      </div>
    </div>
  );
}

function navLinks() {
  return (
    <nav className="main-nav">
      <a className="nav-link" href="#/">HOME</a>
      <a className="btn btn-pill btn-secondary" href="#/my-stories">
        MY STORIES
      </a>
      <a className="nav-link" href="#/premium">
        PREMIUM
      </a>
      <a className="nav-link" href="#/gamify">
        GAMIFY
      </a>
      <a className="btn btn-pill btn-green" href="#/parents">
        PARENTS DASHBOARD
      </a>
    </nav>
  );
}

/* ───────────────────────────── BOOK READER COMPONENT ───────────────────────────── */
/* ───────────────────────────── BOOK READER COMPONENT (FIXED) ───────────────────────────── */
/* ───────────────────────────── BOOK READER COMPONENT (FINAL POLISHED) ───────────────────────────── */
/* ───────────────────────────── BOOK READER COMPONENT (Tailwind Version) ───────────────────────────── */
function BookReader({ story }) {
  const [pages, setPages] = useState([]);

  useEffect(() => {
    if (!story?.storyText) return;

    const words = story.storyText.split(" ");
    const wordsPerPage = 35; // ✅ Around 30–40 words per page
    const newPages = [];

    for (let i = 0; i < words.length; i += wordsPerPage) {
      newPages.push(words.slice(i, i + wordsPerPage).join(" "));
    }

    setPages(newPages);
  }, [story]);

  return (
    <div className="flex justify-center bg-gray-100 p-8 rounded-2xl shadow-inner">
      <HTMLFlipBook
        width={480}
        height={600}
        size="stretch"
        minWidth={320}
        maxWidth={700}
        minHeight={400}
        maxHeight={800}
        showCover={true}
        flippingTime={900}
        drawShadow={true}
        usePortrait={true}
        maxShadowOpacity={0.5}
        mobileScrollSupport={true}
        className="storybook"
        style={{
          margin: "auto",
          borderRadius: "12px",
          background: "white",
          boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
        }}
      >
        {/* 📘 Cover Page */}
        <div className="flex flex-col items-center justify-center text-center rounded-xl font-poppins font-semibold text-white bg-gradient-to-tr from-indigo-600 to-purple-400 p-10">
          <h2 className="text-3xl mb-4">{story.title}</h2>
          <p className="text-lg opacity-90">
            A story featuring {story.mainCharacter}
          </p>
          <p className="text-sm mt-3 opacity-75">
            Tap or drag to flip pages →
          </p>
        </div>

        {/* 📄 Story Pages */}
        {pages.map((page, index) => (
          <div
            key={index}
            className="bg-white text-black p-10 rounded-xl font-serif text-lg leading-normal text-center flex flex-col items-center justify-center shadow-[inset_0_0_8px_rgba(0,0,0,0.05),0_2px_10px_rgba(0,0,0,0.08)]"
          >
            <h3 className="text-2xl text-gray-800 font-bold mb-3">
              Page {index + 1}
            </h3>
            <p className="max-w-[85%] whitespace-pre-wrap font-normal">
              {page}
            </p>
          </div>
        ))}

        {/* 📕 Back Cover */}
        <div className="flex flex-col items-center justify-center text-center rounded-xl font-poppins font-semibold text-white bg-gradient-to-tr from-indigo-600 to-purple-400 p-10">
          <h2 className="text-2xl mb-3">The End 💫</h2>
          <p className="text-lg opacity-90">
            Thanks for reading with Aavya AI!
          </p>
        </div>
      </HTMLFlipBook>
    </div>
  );
}



