import { create } from 'zustand';
import {
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
} from '@xyflow/react';

const cloneGraph = ({ nodes, edges }) => ({
  nodes: JSON.parse(JSON.stringify(nodes)),
  edges: JSON.parse(JSON.stringify(edges)),
});

const pushHistory = (state, snapshot = cloneGraph(state)) => ({
  historyPast: [...state.historyPast, snapshot].slice(-50),
  historyFuture: [],
});

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
  historyPast: [],
  historyFuture: [],
  dragStartSnapshot: null,

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
          name: 'Fotosintesis - Cornell Notes',
          method: 'cornell',
          createdAt: '2026-04-28T09:00:00Z',
          updatedAt: '2026-05-03T12:00:00Z',
          thumbnail: null,
        },
        {
          id: '3',
          name: 'Hukum Newton - Feynman Method',
          method: 'feynman',
          createdAt: '2026-04-25T14:00:00Z',
          updatedAt: '2026-05-02T18:00:00Z',
          thumbnail: null,
        },
        {
          id: '4',
          name: 'Sistem Tubuh Manusia - Boxing',
          method: 'boxing',
          createdAt: '2026-04-22T11:00:00Z',
          updatedAt: '2026-05-01T09:00:00Z',
          thumbnail: null,
        },
        {
          id: '5',
          name: 'Mitosis vs Meiosis - Charting',
          method: 'charting',
          createdAt: '2026-04-20T08:00:00Z',
          updatedAt: '2026-04-30T14:00:00Z',
          thumbnail: null,
        },
        {
          id: '6',
          name: 'Evolusi Darwin - Zettelkasten',
          method: 'zettelkasten',
          createdAt: '2026-04-18T13:00:00Z',
          updatedAt: '2026-04-28T16:00:00Z',
          thumbnail: null,
        },
        {
          id: '7',
          name: 'Tata Surya - Sketchnoting',
          method: 'sketchnoting',
          createdAt: '2026-04-15T10:00:00Z',
          updatedAt: '2026-04-25T11:00:00Z',
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
    historyPast: [],
    historyFuture: [],
    dragStartSnapshot: null,
  }),

  setWorkspaceName: (name) => set({ workspaceName: name }),
  setMethod: (method) => set({ method }),

  // --- React Flow node/edge actions ---
  loadGraph: (nodes, edges) => set({
    nodes,
    edges,
    historyPast: [],
    historyFuture: [],
    dragStartSnapshot: null,
  }),

  setNodes: (nodes, { record = true } = {}) => set((state) => ({
    ...(record ? pushHistory(state) : {}),
    nodes,
  })),

  setEdges: (edges, { record = true } = {}) => set((state) => ({
    ...(record ? pushHistory(state) : {}),
    edges,
  })),

  onNodesChange: (changes) => {
    set((state) => {
      const hasMovingNode = changes.some((change) => change.type === 'position' && change.dragging);
      const hasFinishedMove = changes.some((change) => change.type === 'position' && change.dragging === false);
      const shouldRecord = changes.some((change) => !['select', 'position'].includes(change.type));
      const dragStartSnapshot = hasMovingNode && !state.dragStartSnapshot
        ? cloneGraph(state)
        : state.dragStartSnapshot;
      const nodes = applyNodeChanges(changes, state.nodes);

      if (hasFinishedMove && state.dragStartSnapshot) {
        return {
          ...pushHistory(state, state.dragStartSnapshot),
          nodes,
          dragStartSnapshot: null,
        };
      }

      return {
        ...(shouldRecord ? pushHistory(state) : {}),
        nodes,
        dragStartSnapshot,
      };
    });
  },

  onEdgesChange: (changes) => {
    const shouldRecord = changes.some((change) => change.type !== 'select');
    set((state) => ({
      ...(shouldRecord ? pushHistory(state) : {}),
      edges: applyEdgeChanges(changes, state.edges),
    }));
  },

  onConnect: (connection) => {
    set((state) => ({
      ...pushHistory(state),
      edges: addEdge(connection, state.edges),
    }));
  },

  addNode: (node) => {
    set((state) => ({
      ...pushHistory(state),
      nodes: [...state.nodes, node],
    }));
  },

  updateNode: (id, data) => {
    set((state) => ({
      ...pushHistory(state),
      nodes: state.nodes.map((n) =>
        n.id === id ? { ...n, data: { ...n.data, ...data } } : n
      ),
    }));
  },

  updateNodeStyle: (id, style) => {
    set((state) => ({
      ...pushHistory(state),
      nodes: state.nodes.map((n) =>
        n.id === id
          ? {
              ...n,
              style: { ...n.style, ...style },
              data: { ...n.data, style: { ...(n.data?.style || {}), ...style } },
            }
          : n
      ),
    }));
  },

  updateEdgeStyle: (id, style) => {
    set((state) => ({
      ...pushHistory(state),
      edges: state.edges.map((e) =>
        e.id === id ? { ...e, style: { ...e.style, ...style } } : e
      ),
    }));
  },

  updateEdge: (id, data) => {
    set((state) => ({
      ...pushHistory(state),
      edges: state.edges.map((e) =>
        e.id === id ? { ...e, ...data } : e
      ),
    }));
  },

  moveNodeLayer: (id, direction) => {
    set((state) => {
      const current = state.nodes.find((n) => n.id === id);
      if (!current) return state;
      const zIndex = current.zIndex ?? current.style?.zIndex ?? 0;
      const nextZ = {
        forward: zIndex + 1,
        backward: zIndex - 1,
        front: 100,
        back: -100,
      }[direction] ?? zIndex;

      return {
        ...pushHistory(state),
        nodes: state.nodes.map((n) =>
          n.id === id ? { ...n, zIndex: nextZ, style: { ...n.style, zIndex: nextZ } } : n
        ),
      };
    });
  },

  moveEdgeLayer: (id, direction) => {
    set((state) => {
      const current = state.edges.find((e) => e.id === id);
      if (!current) return state;
      const zIndex = current.zIndex ?? 0;
      const nextZ = {
        forward: zIndex + 1,
        backward: zIndex - 1,
        front: 100,
        back: -100,
      }[direction] ?? zIndex;

      return {
        ...pushHistory(state),
        edges: state.edges.map((e) =>
          e.id === id ? { ...e, zIndex: nextZ } : e
        ),
      };
    });
  },

  onNodesDelete: (deletedNodes) => {
    const deletedIds = deletedNodes.map(n => n.id);
    set((state) => ({
      ...pushHistory(state),
      nodes: state.nodes.filter((n) => !deletedIds.includes(n.id)),
      edges: state.edges.filter((e) => !deletedIds.includes(e.source) && !deletedIds.includes(e.target)),
    }));
  },

  onEdgesDelete: (deletedEdges) => {
    const deletedIds = deletedEdges.map(e => e.id);
    set((state) => ({
      ...pushHistory(state),
      edges: state.edges.filter((e) => !deletedIds.includes(e.id)),
    }));
  },

  deleteNode: (id) => {
    set((state) => ({
      ...pushHistory(state),
      nodes: state.nodes.filter((n) => n.id !== id),
      edges: state.edges.filter((e) => e.source !== id && e.target !== id),
    }));
  },

  deleteEdge: (id) => {
    set((state) => ({
      ...pushHistory(state),
      edges: state.edges.filter((e) => e.id !== id),
    }));
  },

  undo: () => {
    set((state) => {
      if (state.historyPast.length === 0) return state;
      const previous = state.historyPast[state.historyPast.length - 1];
      return {
        nodes: previous.nodes,
        edges: previous.edges,
        historyPast: state.historyPast.slice(0, -1),
        historyFuture: [cloneGraph(state), ...state.historyFuture].slice(0, 50),
        dragStartSnapshot: null,
      };
    });
  },

  redo: () => {
    set((state) => {
      if (state.historyFuture.length === 0) return state;
      const next = state.historyFuture[0];
      return {
        nodes: next.nodes,
        edges: next.edges,
        historyPast: [...state.historyPast, cloneGraph(state)].slice(-50),
        historyFuture: state.historyFuture.slice(1),
        dragStartSnapshot: null,
      };
    });
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
    historyPast: [],
    historyFuture: [],
    dragStartSnapshot: null,
  }),
}));

export default useWorkspaceStore;
