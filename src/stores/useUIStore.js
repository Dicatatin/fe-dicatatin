import { create } from 'zustand';

const useUIStore = create((set) => ({
  // View/Edit mode
  isEditMode: true,
  setEditMode: (isEditMode) => set({ isEditMode }),
  toggleEditMode: () => set((s) => ({ isEditMode: !s.isEditMode })),

  // Selected element
  selectedNodeId: null,
  selectedEdgeId: null,
  setSelectedNode: (id) => set({ selectedNodeId: id, selectedEdgeId: null }),
  setSelectedEdge: (id) => set({ selectedEdgeId: id, selectedNodeId: null }),
  clearSelection: () => set({ selectedNodeId: null, selectedEdgeId: null }),

  // Active tool
  activeTool: 'select',
  setActiveTool: (tool) => set({ activeTool: tool }),

  // Panels
  isRightSidebarOpen: false,
  setRightSidebarOpen: (open) => set({ isRightSidebarOpen: open }),

  isLeftToolbarOpen: true,
  setLeftToolbarOpen: (open) => set({ isLeftToolbarOpen: open }),

  // Flashcard
  isFlashcardOpen: false,
  setFlashcardOpen: (open) => set({ isFlashcardOpen: open }),

  // Save status
  saveStatus: 'saved', // 'saved' | 'saving' | 'unsaved' | 'error'
  setSaveStatus: (status) => set({ saveStatus: status }),

  // Modals
  isNewWorkspaceModalOpen: false,
  setNewWorkspaceModalOpen: (open) => set({ isNewWorkspaceModalOpen: open }),
}));

export default useUIStore;
