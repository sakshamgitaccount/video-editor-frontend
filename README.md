# Video Editor Frontend

A browser-based video editing UI built with Next.js, React, Tailwind CSS, ShadCN UI, and Redux Toolkit.  
This project simulates video upload, scene trimming, audio management, subtitles, text/image overlays, real-time preview, and export controls—all in the browser without a real backend.

---

## 🚀 Features

- **Upload Zone** – drag & drop a video or click to select, see a simulated upload progress bar, then view a preview.  
- **Timeline** – add, reorder (drag & drop), and remove mock “scenes.”  
- **Audio Manager** – stub in background music segments, display a mock waveform bar, and toggle mute/unmute.  
- **Subtitles** – create caption blocks with editable text, start/end times, font size, color, and position (bottom/center/top).  
- **Text Overlays** – add free-form text overlays, adjust content, font size, color, and X/Y position.  
- **Image Overlays** – drag & drop images, then control position, width, height, and opacity.  
- **Live Preview** – native `<video>` playback with absolutely-positioned subtitles, text, and image overlays that sync to video time.  
- **Render & Download** – click “Render Video” to simulate a 3-second render, then download your edited clip via a generated link.

---

## 💻 Getting Started

### Prerequisites

- Node.js (v16 or later)  
- npm (v8 or later)  

### Installation

```bash
git clone https://github.com/sakshamgitaccount/video-editor-frontend.git
cd video-editor-frontend
npm install
npm run dev
