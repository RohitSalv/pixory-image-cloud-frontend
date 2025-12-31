# Pixory – Image Cloud Frontend

Pixory is a modern frontend application that provides a clean interface for uploading, browsing, and managing AI-enriched images.

This repository contains the user-facing application built to consume the Pixory backend APIs.

---

## Responsibilities

- Image upload interface with preview
- Responsive image gallery
- Display of AI-generated descriptions and tags
- Landing page and product flow
- User interaction and feedback handling

---

## Tech Stack

- Angular 20+
- Tailwind CSS v4
- RxJS
- Angular Animations
- Lucide Angular Icons

---

## UX Philosophy

Pixory follows a "single-flow" design approach where the landing experience transitions seamlessly into the application dashboard.

Design principles:
- Minimal visual noise
- Calm feedback over aggressive loaders
- Dark-mode-first UI
- Clear visual hierarchy

---

## Key UI Decisions

### Why No Upload Progress Bar?
For small-to-medium image uploads, progress bars added unnecessary complexity without improving clarity. A buffered success/error state provided a calmer and more intentional experience.

### Why CSS Grid Instead of Flexbox?
CSS Grid enabled responsive layouts without forcing uniform card heights, allowing image content to dictate layout naturally.

### Why Strong Typing in Templates?
Typed interfaces prevent runtime template errors and improve maintainability as the data model evolves.

---

## Application Flow

1. User uploads an image
2. Local preview is shown instantly using FileReader
3. Image is sent to the backend API
4. Gallery updates with AI-enriched metadata
5. Users can browse, view, and manage images

---

## Backend Dependency

This frontend consumes the Pixory backend REST APIs.

Backend repository:
👉 https://github.com/RohitSalv/pixory-image-cloud-backend

---

## Project Status

- Landing page & UI flow: ✅ Complete
- Image gallery: ✅ Stable
- Upload interface: ✅ Optimized
- Advanced search & filters: 🚧 Planned

---

## License

This project is intended for learning, portfolio demonstration, and experimentation.
