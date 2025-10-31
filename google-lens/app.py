import streamlit as st
import requests
from PIL import Image

# ----------------------------
# CONFIG
# ----------------------------
GROQ_API_KEY = "your_groq_api_key"
GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions"
MODEL = "gpt-4o-mini"   # supports vision input


# ----------------------------
# FUNCTIONS
# ----------------------------
def upload_image_to_imgbb(file_bytes):
    """Uploads image to imgbb and returns public URL."""
    IMGBB_API_KEY = "your_imgbb_api_key"
    upload_url = f"https://api.imgbb.com/1/upload?key={IMGBB_API_KEY}"
    files = {'image': file_bytes}
    response = requests.post(upload_url, files=files)

    if response.status_code == 200:
        return response.json()["data"]["url"]
    else:
        st.error(f"Image upload failed: {response.status_code} - {response.text}")
        return None


def analyze_image_with_groq(image_url):
    """Sends the image URL to Groq Vision model for analysis."""
    headers = {
        "Authorization": f"Bearer {GROQ_API_KEY}",
        "Content-Type": "application/json"
    }

    data = {
        "model": MODEL,
        "messages": [
            {
                "role": "user",
                "content": [
                    {"type": "text", "text": "Describe everything visible in this image clearly and simply for a child."},
                    {"type": "image_url", "image_url": image_url}
                ]
            }
        ]
    }

    response = requests.post(GROQ_API_URL, headers=headers, json=data)

    if response.status_code == 200:
        return response.json()["choices"][0]["message"]["content"]
    else:
        st.error(f"Groq API Error: {response.status_code} - {response.text}")
        return None


# ----------------------------
# STREAMLIT UI
# ----------------------------
st.set_page_config(page_title="Aavya Lens 👁️", layout="centered")
st.title("🧠 Aavya Lens — Vision Learning for Kids")
st.write("Upload an image — Aavya will explain what’s happening!")

uploaded_file = st.file_uploader("📸 Upload an image", type=["jpg", "jpeg", "png"])

if uploaded_file:
    image = Image.open(uploaded_file)
    st.image(image, caption="Uploaded Image", use_container_width=True)

    file_bytes = uploaded_file.getvalue()

    with st.spinner("🔼 Uploading to imgbb..."):
        public_url = upload_image_to_imgbb(file_bytes)

    if public_url:
        st.success("✅ Uploaded successfully!")
        st.write("Public URL:", public_url)

        with st.spinner("✨ Analyzing with Groq Vision..."):
            explanation = analyze_image_with_groq(public_url)

        if explanation:
            st.subheader("📘 Aavya’s Explanation")
            st.write(explanation)
