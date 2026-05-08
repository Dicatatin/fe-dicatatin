# DICATAT.IN 🚀

**Elevating the Way You Learn, Inclusively.**

DICATAT.IN is an AI-powered note-taking platform designed to transform messy handwritten notes into beautifully structured digital formats. Built with modern web technologies, it features an interactive canvas, support for 7 proven note-taking methods, auto-layout capabilities, and an integrated flashcard system for active recall.

---

## ✨ Features

*   **7 Proven Note-Taking Methods**: 
    *   🧠 Mind Map
    *   📋 Cornell Notes
    *   📦 Boxing
    *   📊 Charting
    *   🔗 Zettelkasten
    *   🎨 Sketchnoting
    *   💡 Feynman Technique
*   **Interactive Infinite Canvas**: Powered by React Flow, featuring a fully editable A4 workspace with drag-and-drop, connection edges, and zoom controls.
*   **Smart Auto-Layout**: Integrated `elkjs` layout engine automatically organizes your notes based on the chosen method's optimal structure.
*   **Accessibility First**: Built-in Dyslexia-friendly mode featuring the OpenDyslexic font and tailored spacing adjustments.
*   **Active Recall**: Integrated 3D-flippable flashcard system automatically generated from your notes.
*   **PDF Export**: High-fidelity vector-like PDF exports of your A4 canvas.
*   **Dark-Blue Premium Theme**: A carefully crafted, professional dark mode UI with glassmorphism effects and fluid animations.

## 🛠️ Tech Stack

*   **Framework**: React 19 (Vite)
*   **Routing**: React Router v7
*   **State Management**: Zustand
*   **Canvas Engine**: React Flow (`@xyflow/react`)
*   **Auto Layout**: ELK (`elkjs`)
*   **UI Components**: shadcn/ui (Radix UI)
*   **Styling**: Tailwind CSS v4 with CSS variables
*   **PDF Export**: `html2canvas` & `jsPDF`
*   **Icons**: Lucide React

## 🚀 Getting Started

### Prerequisites

*   Node.js (v18 or higher recommended)
*   npm or yarn

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/yourusername/project-dicatatin.git
    cd project-dicatatin
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Start the development server:
    ```bash
    npm run dev
    ```

4.  Open your browser and navigate to `http://localhost:5173`.

> **Note**: The application currently uses a mock authentication flow for development. You can log in using any email and password on the login page to access the application.

## 📂 Project Structure

```text
src/
├── assets/            # Static files, fonts, and images
├── components/        # Reusable UI components (Buttons, Cards, Modals)
├── features/          # Domain-specific modules
│   ├── auth/          # Login, Signup, AuthGuards
│   ├── flashcard/     # Flashcard popup and flipping logic
│   ├── home/          # Workspace gallery and creation modals
│   ├── landing/       # Landing page sections
│   └── workspace/     # Core editor, Canvas, Right Sidebar, Custom Nodes
├── hooks/             # Custom React hooks (useAutosave, useKeyboardShortcuts)
├── layouts/           # Page wrapper layouts
├── pages/             # Route-level components
├── services/          # API and external service integrations
├── stores/            # Zustand global state stores
├── styles/            # Global CSS variables and animations
└── utils/             # Helper functions, constants, mock data, and ELK configs
```

## ⌨️ Keyboard Shortcuts

*   `Ctrl + S` / `Cmd + S`: Save Workspace
*   `Ctrl + E` / `Cmd + E`: Toggle Edit / View Mode
*   `Escape`: Deselect current node or close modals/flashcards

## 📄 License

This project is licensed under the MIT License.
