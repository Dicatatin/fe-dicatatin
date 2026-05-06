import { create } from 'zustand';
import {
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
} from '@xyflow/react';

const useWorkspaceStore = create((set, get) => ({
  // Workspace list (home page)
  workspaces: [],
  workspacesLoading: false,

  // Current workspace
  currentWorkspace: null,
  workspaceName: 'Untitled',
  method: null,

  // React Flow state
  nodes: [],
  edges: [],

  // Flashcards for current workspace
  flashcards: [],

  // --- Workspace list actions ---
  setWorkspaces: (workspaces) => set({ workspaces }),
  setWorkspacesLoading: (loading) => set({ workspacesLoading: loading }),

  fetchWorkspaces: async () => {
    set({ workspacesLoading: true });
    try {
      // TODO: Replace with actual API call
      // Mock data for development
      const mockWorkspaces = [
        {
          id: '1',
          name: 'Biologi Sel - Mitosis & Meiosis',
          method: 'mind_map',
          createdAt: '2026-05-01T10:00:00Z',
          updatedAt: '2026-05-04T15:30:00Z',
          thumbnail: null,
        },
        {
          id: '2',
          name: 'Sejarah Indonesia - Proklamasi',
          method: 'cornell',
          createdAt: '2026-04-28T09:00:00Z',
          updatedAt: '2026-05-03T12:00:00Z',
          thumbnail: null,
        },
        {
          id: '3',
          name: 'Fisika - Hukum Newton',
          method: 'feynman',
          createdAt: '2026-04-25T14:00:00Z',
          updatedAt: '2026-05-02T18:00:00Z',
          thumbnail: null,
        },
      ];
      set({ workspaces: mockWorkspaces, workspacesLoading: false });
    } catch (error) {
      console.error('Failed to fetch workspaces:', error);
      set({ workspacesLoading: false });
    }
  },

  // --- Current workspace actions ---
  setCurrentWorkspace: (workspace) => set({
    currentWorkspace: workspace,
    workspaceName: workspace?.name || 'Untitled',
    method: workspace?.method || null,
    nodes: workspace?.nodes || [],
    edges: workspace?.edges || [],
    flashcards: workspace?.flashcards || [],
  }),

  setWorkspaceName: (name) => set({ workspaceName: name }),
  setMethod: (method) => set({ method }),

  // --- React Flow node/edge actions ---
  setNodes: (nodes) => set({ nodes }),
  setEdges: (edges) => set({ edges }),

  onNodesChange: (changes) => {
    set({ nodes: applyNodeChanges(changes, get().nodes) });
  },

  onEdgesChange: (changes) => {
    set({ edges: applyEdgeChanges(changes, get().edges) });
  },

  onConnect: (connection) => {
    set({ edges: addEdge(connection, get().edges) });
  },

  addNode: (node) => {
    set({ nodes: [...get().nodes, node] });
  },

  updateNode: (id, data) => {
    set({
      nodes: get().nodes.map((n) =>
        n.id === id ? { ...n, data: { ...n.data, ...data } } : n
      ),
    });
  },

  deleteNode: (id) => {
    set({
      nodes: get().nodes.filter((n) => n.id !== id),
      edges: get().edges.filter((e) => e.source !== id && e.target !== id),
    });
  },

  deleteEdge: (id) => {
    set({ edges: get().edges.filter((e) => e.id !== id) });
  },

  // --- Flashcard actions ---
  setFlashcards: (flashcards) => set({ flashcards }),

  // --- Save ---
  getWorkspaceData: () => {
    const { currentWorkspace, workspaceName, method, nodes, edges, flashcards } = get();
    return {
      id: currentWorkspace?.id,
      name: workspaceName,
      method,
      nodes,
      edges,
      flashcards,
    };
  },

  // --- Reset ---
  resetWorkspace: () => set({
    currentWorkspace: null,
    workspaceName: 'Untitled',
    method: null,
    nodes: [],
    edges: [],
    flashcards: [],
  }),
}));

export default useWorkspaceStore;
