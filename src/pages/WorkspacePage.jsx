import { useCallback, useRef, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  ReactFlowProvider,
} from '@xyflow/react';
import {
  Save, Download, Eye, Edit3, BookOpen, ArrowLeft,
  MousePointer2, Hand, Square, Circle, Type, Minus, Trash2, Diamond,
  PanelRightOpen, PanelRightClose,
} from 'lucide-react';
import Button from '@/components/ui/Button';
import Toggle from '@/components/ui/Toggle';
import useWorkspaceStore from '@/stores/useWorkspaceStore';
import useUIStore from '@/stores/useUIStore';
import useFlashcardStore from '@/stores/useFlashcardStore';
import FlashcardPopup from '@/features/flashcard/FlashcardPopup';
import DetailPanel from '@/features/workspace/panels/DetailPanel';
import { nodeTypes } from '@/features/workspace/nodes';
import { A4_WIDTH, A4_HEIGHT, TOOLS, METHODS } from '@/utils/constants';
import { getMockDataByMethod } from '@/utils/mockData';
import { exportCanvasToPDF } from '@/utils/pdfExport';
import useAutosave from '@/hooks/useAutosave';
import useKeyboardShortcuts from '@/hooks/useKeyboardShortcuts';
import '@/features/workspace/nodes/nodes.css';
import './WorkspacePage.css';

// Method mapping from workspace list mock
const WORKSPACE_METHODS = {
  '1': METHODS.MIND_MAP,
  '2': METHODS.CORNELL,
  '3': METHODS.FEYNMAN,
  '4': METHODS.BOXING,
  '5': METHODS.CHARTING,
  '6': METHODS.ZETTELKASTEN,
  '7': METHODS.SKETCHNOTING,
};

const WORKSPACE_NAMES = {
  '1': 'Biologi Sel - Mitosis & Meiosis',
  '2': 'Fotosintesis - Cornell Notes',
  '3': 'Hukum Newton - Feynman Method',
  '4': 'Sistem Tubuh Manusia - Boxing',
  '5': 'Mitosis vs Meiosis - Charting',
  '6': 'Evolusi Darwin - Zettelkasten',
  '7': 'Tata Surya - Sketchnoting',
};

function WorkspaceEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    nodes, edges, onNodesChange, onEdgesChange, onConnect,
    setNodes, setEdges, workspaceName, setWorkspaceName,
  } = useWorkspaceStore();
  const {
    isEditMode, setEditMode, activeTool, setActiveTool,
    isFlashcardOpen, setFlashcardOpen, saveStatus, setSaveStatus,
    selectedNodeId, setSelectedNode, isRightSidebarOpen, setRightSidebarOpen,
  } = useUIStore();
  const { setCards } = useFlashcardStore();
  const [isEditingName, setIsEditingName] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [currentMethod, setCurrentMethod] = useState(METHODS.MIND_MAP);
  const nameInputRef = useRef(null);
  const canvasRef = useRef(null);

  // Load method-specific mock data
  useEffect(() => {
    const method = WORKSPACE_METHODS[id] || METHODS.MIND_MAP;
    setCurrentMethod(method);
    const mockData = getMockDataByMethod(method);
    setNodes(mockData.nodes);
    setEdges(mockData.edges);
    setCards(mockData.flashcards);
    setWorkspaceName(WORKSPACE_NAMES[id] || 'Untitled Workspace');
  }, [id, setNodes, setEdges, setCards, setWorkspaceName]);

  // Autosave hook
  useAutosave(2000);

  // Save handler
  const handleSave = useCallback(() => {
    setSaveStatus('saving');
    setTimeout(() => setSaveStatus('saved'), 800);
  }, [setSaveStatus]);

  // Keyboard shortcuts
  useKeyboardShortcuts({ onSave: handleSave });

  // PDF export
  const handleExportPDF = useCallback(async () => {
    if (!canvasRef.current) return;
    setIsExporting(true);
    try {
      await exportCanvasToPDF(canvasRef.current, workspaceName);
    } catch (err) {
      console.error('PDF export failed:', err);
    } finally {
      setIsExporting(false);
    }
  }, [workspaceName]);

  const handleFlashcard = () => {
    const mockData = getMockDataByMethod(currentMethod);
    setCards(mockData.flashcards);
    setFlashcardOpen(true);
    setEditMode(false);
  };

  const handleNameDoubleClick = () => {
    if (isEditMode) {
      setIsEditingName(true);
      setTimeout(() => nameInputRef.current?.focus(), 50);
    }
  };

  const handleNameBlur = () => setIsEditingName(false);
  const handleNameKeyDown = (e) => { if (e.key === 'Enter') setIsEditingName(false); };

  // Handle node selection from React Flow
  const handleNodeClick = useCallback((_, node) => {
    setSelectedNode(node.id);
    setRightSidebarOpen(true);
  }, [setSelectedNode, setRightSidebarOpen]);

  const handlePaneClick = useCallback(() => {
    setSelectedNode(null);
  }, [setSelectedNode]);

  const handleToolClick = (toolKey) => {
    setActiveTool(toolKey);
    
    // Add shapes
    if ([TOOLS.RECTANGLE, TOOLS.OVAL, TOOLS.DIAMOND, TOOLS.TEXT].includes(toolKey)) {
      const newNode = {
        id: `node-${Date.now()}`,
        type: 'shape', // Use the registered base shape
        position: { x: window.innerWidth / 2 - 100, y: window.innerHeight / 2 - 100 },
        data: {
          label: toolKey === TOOLS.TEXT ? 'Teks Baru' : 'Bentuk Baru',
          iconName: 'none',
          style: {
            width: 120,
            height: toolKey === TOOLS.TEXT ? 40 : 80,
            background: toolKey === TOOLS.TEXT ? 'transparent' : '#FFFFFF',
            border: toolKey === TOOLS.TEXT ? 'none' : '1.5px solid #E2E8F0',
            borderRadius: toolKey === TOOLS.OVAL ? '50%' : toolKey === TOOLS.DIAMOND ? '0%' : '8px',
            transform: toolKey === TOOLS.DIAMOND ? 'rotate(45deg)' : 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }
        }
      };
      
      // If it's a diamond, we need the inner text to counter-rotate
      if (toolKey === TOOLS.DIAMOND) {
         newNode.data.innerTransform = 'rotate(-45deg)';
      }

      useWorkspaceStore.getState().addNode(newNode);
      setActiveTool(TOOLS.SELECT); // Revert to select
    } else if (toolKey === TOOLS.DELETE) {
       // Handle delete explicitly if selected via toolbar
       if (selectedNodeId) {
         useWorkspaceStore.getState().deleteNode(selectedNodeId);
         setSelectedNode(null);
       }
       setActiveTool(TOOLS.SELECT); // Revert to select
    }
  };

  const tools = [
    { key: TOOLS.SELECT, icon: <MousePointer2 size={18} />, label: 'Select' },
    { key: TOOLS.HAND, icon: <Hand size={18} />, label: 'Pan' },
    { key: 'divider' },
    { key: TOOLS.RECTANGLE, icon: <Square size={18} />, label: 'Rectangle' },
    { key: TOOLS.OVAL, icon: <Circle size={18} />, label: 'Oval' },
    { key: TOOLS.DIAMOND, icon: <Diamond size={18} />, label: 'Diamond' },
    { key: TOOLS.TEXT, icon: <Type size={18} />, label: 'Text' },
    // { key: TOOLS.LINE, icon: <Minus size={18} />, label: 'Line' }, // Disabling line manual add for now
    { key: 'divider2' },
    { key: TOOLS.DELETE, icon: <Trash2 size={18} />, label: 'Delete' },
  ];

  return (
    <div className="workspace-page">
      {/* Top Bar */}
      <div className="ws-topbar">
        <div className="ws-topbar-left">
          <button className="btn btn-ghost btn-icon" onClick={() => navigate('/home')}>
            <ArrowLeft size={18} />
          </button>
          <div className="ws-topbar-name" onDoubleClick={handleNameDoubleClick}>
            {isEditingName ? (
              <input
                ref={nameInputRef}
                className="ws-name-input"
                value={workspaceName}
                onChange={(e) => setWorkspaceName(e.target.value)}
                onBlur={handleNameBlur}
                onKeyDown={handleNameKeyDown}
              />
            ) : (
              <span className="ws-name-display">{workspaceName}</span>
            )}
            <span className={`ws-save-status ws-save-${saveStatus}`}>
              {saveStatus === 'saved' && '✓ Saved'}
              {saveStatus === 'saving' && '⟳ Saving...'}
              {saveStatus === 'unsaved' && '● Unsaved'}
            </span>
          </div>
        </div>

        <div className="ws-topbar-center">
          <div className="ws-mode-toggle">
            {isEditMode ? <Edit3 size={14} /> : <Eye size={14} />}
            <Toggle checked={isEditMode} onChange={setEditMode} size="sm" />
            <span className="text-xs">{isEditMode ? 'Edit' : 'View'}</span>
          </div>
        </div>

        <div className="ws-topbar-right">
          <Button variant="ghost" size="sm" onClick={handleSave} icon={<Save size={16} />}>
            Save
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={handleExportPDF}
            icon={<Download size={16} />}
            disabled={isExporting}
          >
            {isExporting ? 'Exporting...' : 'Export PDF'}
          </Button>
          <Button size="sm" onClick={handleFlashcard} icon={<BookOpen size={16} />}>
            Belajar
          </Button>
          <button
            className="ws-tool-btn"
            onClick={() => setRightSidebarOpen(!isRightSidebarOpen)}
            title="Toggle Properties"
            style={{ marginLeft: 4 }}
          >
            {isRightSidebarOpen ? <PanelRightClose size={18} /> : <PanelRightOpen size={18} />}
          </button>
        </div>
      </div>

      <div className="ws-body">
        {/* Left Toolbar */}
        {isEditMode && (
          <div className="ws-toolbar animate-fade-in-left">
            {tools.map((t) =>
              t.key.startsWith('divider') ? (
                <div key={t.key} className="ws-toolbar-divider" />
              ) : (
                <button
                  key={t.key}
                  className={`ws-tool-btn ${activeTool === t.key ? 'active' : ''}`}
                  onClick={() => handleToolClick(t.key)}
                  title={t.label}
                >
                  {t.icon}
                </button>
              )
            )}
          </div>
        )}

        {/* Canvas */}
        <div className="ws-canvas-area">
          <div className="ws-a4-wrapper" ref={canvasRef} style={{ width: A4_WIDTH, height: A4_HEIGHT }}>
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onNodesChange={isEditMode ? onNodesChange : undefined}
              onEdgesChange={isEditMode ? onEdgesChange : undefined}
              onConnect={isEditMode ? onConnect : undefined}
              onNodesDelete={useWorkspaceStore.getState().onNodesDelete}
              onEdgesDelete={useWorkspaceStore.getState().onEdgesDelete}
              onNodeClick={handleNodeClick}
              onPaneClick={handlePaneClick}
              nodeTypes={nodeTypes}
              nodesDraggable={isEditMode && !isFlashcardOpen && activeTool === TOOLS.SELECT}
              panOnDrag={!isEditMode || activeTool === TOOLS.HAND}
              selectionOnDrag={isEditMode && activeTool === TOOLS.SELECT}
              panOnScroll={true}
              zoomOnScroll={true}
              nodesConnectable={isEditMode && activeTool === TOOLS.SELECT}
              elementsSelectable={isEditMode}
              deleteKeyCode={['Backspace', 'Delete']}
              defaultEdgeOptions={{ type: 'smoothstep', animated: false }}
              fitView
              fitViewOptions={{ padding: 0.15 }}
              colorMode="light"
              minZoom={0.3}
              maxZoom={2}
              proOptions={{ hideAttribution: true }}
            >
              <Background variant="dots" gap={20} size={1} color="#d4d8e0" />
              <Controls position="bottom-left" showInteractive={false} />
              <MiniMap
                position="bottom-left"
                style={{ marginBottom: 50 }}
                nodeStrokeWidth={3}
                maskColor="rgba(10, 22, 40, 0.7)"
              />
            </ReactFlow>
          </div>
        </div>

        {/* Right Sidebar */}
        {isRightSidebarOpen && isEditMode && <DetailPanel />}
      </div>

      {/* Flashcard popup */}
      {isFlashcardOpen && <FlashcardPopup />}
    </div>
  );
}

export default function WorkspacePage() {
  return (
    <ReactFlowProvider>
      <WorkspaceEditor />
    </ReactFlowProvider>
  );
}
