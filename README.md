# Pixory – Intelligent Image Cloud

Pixory is a premium, AI-powered digital sanctuary for your memories. It provides a stunning, glassmorphism-inspired interface for uploading, browsing, and searching images enriched with natural language descriptions and semantic tags.

---

## 🚀 Features

- **Intelligent Upload**: Multi-format support with instant AI analysis.
- **AI Descriptions**: Natural language summaries generated for every image.
- **Smart Search**: Semantic search capabilities—find photos by content, not just filenames.
- **Dynamic Gallery**: Beautiful, responsive grid with advanced sorting and pagination.
- **Glassmorphism UI**: High-end aesthetic with subtle animations and dark-mode optimization.
- **Secure Storage**: Fully authenticated private cloud experience.
- **Comprehensive Docs**: Built-in documentation for seamless onboarding.

---

## 🛠 Tech Stack

- **Angular 20**: Leveraging the latest signals-based architecture and standalone components.
- **Tailwind CSS v4**: Modern utility-first styling with high-performance JIT compilation.
- **Lucide Icons**: Crisp, scalable vector iconography.
- **RxJS**: Reactive state management for smooth asynchronous data flows.
- **Node.js SSR**: Server-side rendering support for optimized initial load and SEO.

---

## 🎨 UX Philosophy

Pixory follows a "single-flow" design approach where the landing experience transitions seamlessly into the application dashboard.

**Design principles**:
- **Glassmorphism**: Minimalist blur effects for a layered, premium feel.
- **Calm Feedback**: Subtle micro-animations instead of aggressive loaders.
- **Dark-First**: Optimized for a luxurious dark aesthetic.
- **Mobile-Responsive**: Fluid layouts across all device sizes.

---

## ⚙️ Configuration

Pixory uses environment variables for easy configuration. Create a `.env` file in the root directory:

```env
# API Configuration
BACKEND_API_URL=https://pixory-image-cloud-backend.onrender.com/api
AUTH_API_URL=https://pixory-image-cloud-backend.onrender.com/api/auth
FILES_API_URL=https://pixory-image-cloud-backend.onrender.com/api/v1/files

# Application Settings
PRODUCTION=false
```

---

## 🏗 Getting Started

### Prerequisites

- Node.js (v18+)
- Angular CLI
- Pixory Backend (Local or Hosted at https://pixory-image-cloud-backend.onrender.com)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/RohitSalv/pixory-image-cloud-frontend.git
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm start
   ```
4. Open your browser at `http://localhost:4200`

---

## 🚀 Deployment (Vercel)

Pixory is optimized for deployment on **Vercel**. 

1. **Connect to GitHub**: Import your repository into Vercel.
2. **Framework Preset**: Ensure "Angular" is selected.
3. **Environment Variables**: Add the following variables in the Vercel dashboard (from your `.env`):
   - `BACKEND_API_URL`: `https://pixory-image-cloud-backend.onrender.com/api`
   - `AUTH_API_URL`: `https://pixory-image-cloud-backend.onrender.com/api/auth`
   - `FILES_API_URL`: `https://pixory-image-cloud-backend.onrender.com/api/v1/files`
4. **Deploy**: Click "Deploy". Vercel will automatically handle the SSR build and serverless function setup.


---

## 🔗 Backend Dependency

This frontend is designed to work with the Pixory Backend Service.

👉 [View Backend Repository](https://github.com/RohitSalv/pixory-image-cloud-backend)

---

## 📊 Project Status

- [x] **Branding & UI System**: Optimized for luxury feel.
- [x] **Core Gallery**: Implemented with pagination and sorting.
- [x] **Smart Search**: Fully functional semantic search.
- [x] **Cloud Integration**: Stable upload and retrieval.
- [x] **Deployment Ready**: Configured for Vercel SSR.
- [x] **Documentation**: Comprehensive feature guides.

---

## 📄 License

This project is intended for learning, portfolio demonstration, and experimentation.
