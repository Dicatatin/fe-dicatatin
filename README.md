# DICATAT.IN 

**Elevating the Way You Learn, Inclusively.**

DICATAT.IN is an advanced, AI-powered note-taking platform built to transform messy, unstructured handwritten notes into beautifully structured, highly visual digital formats. It leverages a dynamic and interactive canvas, a sophisticated AI processing pipeline, and proven pedagogical methods to help students and professionals learn more effectively.

---

## Key Features & Capabilities

### 7  Note-Taking Methods
DICATAT.IN supports a variety of established note-taking frameworks. The AI automatically structures your notes to fit the optimal layout for:
*   **Mind Map**: Hierarchical visual mapping for brainstorming.
*   **Cornell Notes**: Segmented layout for cues, main notes, and summaries.
*   **Boxing**: Grouping related concepts into distinct visual containers.
*   **Charting**: Tabular organization for comparative learning.
*   **Zettelkasten**: Interconnected, atomic ideas for long-term knowledge retention.
*   **Sketchnoting**: Visual-heavy formatting for creative learners.
*   **Feynman Technique**: Step-by-step simplification for deep understanding.

### Smart AI Pipeline & Polling
*   **Automated Structuring**: Upload an image, and the AI handles the OCR, semantic chunking, and layout generation.
*   **Real-time Polling**: The frontend implements an intelligent polling mechanism that smoothly transitions the user to the workspace only after the AI has fully generated the nodes, edges, and flashcards.

### Interactive Infinite Canvas
*   **React Flow Integration**: A fully editable, infinite A4 workspace.
*   **Auto Layout**: Integrated `elkjs` layout engine automatically organizes complex node structures and edges based on the chosen note-taking method.
*   **Customization**: Drag-and-drop nodes, create custom shapes (Rectangles, Ovals, Diamonds, Text), edit connections, and utilize a dedicated Properties Sidebar (`DetailPanel`).

### Active Recall Flashcards
*   **Auto-Generated**: The AI automatically creates flashcards based on the uploaded material.
*   **3D Flipping UI**: A beautifully animated, 3D-flipping flashcard interface. Built with robust CSS `backface-visibility` and conditional opacity logic to ensure pristine rendering without text overlap.
*   **Progress Tracking**: Mark cards as "Paham" (Understood) or "Belum Paham" (Not Understood) with a dynamic progress bar.

### High-Fidelity PDF Export
*   **Vector & SVG Support**: Exports the exact state of the A4 canvas to PDF. Powered by `html-to-image` and `jsPDF`, ensuring that all React Flow SVG edges, nodes, and complex HTML elements are perfectly captured without missing connection lines.

### Accessibility First
*   **Dyslexia-Friendly Mode**: Built-in toggle to activate the OpenDyslexic font and tailored CSS letter-spacing adjustments globally.

### Premium UI/UX & Theming
*   **Glassmorphism & Dark Mode**: A professional, dark-blue premium theme featuring glassmorphism cards, fluid micro-animations, and dynamic gradients.
*   **Polished Interactions**: Elegant "Hapus Workspace" (Delete) modals that blend seamlessly with the theme, inline error handling (e.g., login validation), and dynamic counters for workspace library cards.

---

## Tech Stack

### Core
*   **Framework**: React 19 (via Vite)
*   **Routing**: React Router v7
*   **State Management**: Zustand (Modular stores for Auth, UI, Workspace, and Flashcards)

### Canvas & Visualization
*   **Canvas Engine**: React Flow (`@xyflow/react`)
*   **Auto Layout**: ELK (`elkjs`)

### Styling & UI
*   **Styling**: Tailwind CSS v4 with custom CSS variables (`animations.css`, `index.css`)
*   **UI Components**: Custom wrapper components heavily inspired by shadcn/ui and Radix UI primitives (`@radix-ui/react-dialog`, `@radix-ui/react-slot`, `@radix-ui/react-switch`)
*   **Icons**: Lucide React

### Utilities
*   **PDF Export**: `html-to-image` & `jsPDF`
*   **HTTP Client**: Axios

---

## Getting Started

### Prerequisites
*   Node.js (v18 or higher recommended)
*   npm or yarn

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/yourusername/project-dicatatin.git
    cd project-dicatatin/fe-dicatatin
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Start the development server:**
    ```bash
    npm run dev
    ```

4.  **Access the application:**
    Open your browser and navigate to `http://localhost:5173`.

> **Note on Authentication**: The application currently uses an email/password flow integrated with Supabase (or mock services depending on the environment). Google Auth has been streamlined out for a more unified custom authentication experience.

---

## Architecture & Project Structure

The frontend is structured using a Feature-Sliced Design (FSD) inspired architecture to maintain scalability:

```text
src/
├── assets/            # Static files, fonts, and global images
├── components/        # Reusable, dumb UI components
│   ├── layout/        # Navbar, Footer, Wrappers
│   └── ui/            # Buttons, Cards, Modals, Inputs, Loaders, Toggles
├── features/          # Domain-specific, smart modules
│   ├── auth/          # Login/Signup logic, AuthGuard routing
│   ├── flashcard/     # Flashcard popup UI and flipping mechanics
│   ├── landing/       # Landing page marketing sections
│   └── workspace/     # Core editor domain
│       ├── nodes/     # Custom React Flow node components (MindMap, Cornell, Boxing, etc.)
│       └── panels/    # Right-side properties and detail panels
├── hooks/             # Global custom React hooks (`useAutosave`, `useKeyboardShortcuts`)
├── pages/             # Route-level page components (`HomePage`, `WorkspacePage`, `LoginPage`)
├── services/          # API layer (`api.js`, `workspaceService.js`, `authService.js`)
├── stores/            # Zustand global state (`useAuthStore`, `useWorkspaceStore`, `useUIStore`)
├── styles/            # Global CSS (`index.css` for tokens, `animations.css` for keyframes)
└── utils/             # Constants, PDF export logic, ELK layout engines, and formatters
```

---

## Keyboard Shortcuts

DICATAT.IN supports global keyboard shortcuts for a seamless editing experience:

*   `Ctrl + S` / `Cmd + S`: Force Save Workspace
*   `Ctrl + Z` / `Cmd + Z`: Undo canvas action
*   `Ctrl + Y` / `Cmd + Shift + Z`: Redo canvas action
*   `Backspace` / `Delete`: Delete selected node or edge
*   `Escape`: Deselect current node or close active Modals/Flashcards

---

## License

This project is proprietary and currently maintained by the DICATAT.IN development team.
