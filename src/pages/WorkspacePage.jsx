import { useCallback, useRef, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  ReactFlowProvider,
  useReactFlow,
} from '@xyflow/react';
import {
  Save, Download, Eye, Edit3, BookOpen, ArrowLeft,
  MousePointer2, Hand, Square, Circle, Type, Trash2, Diamond,
  PanelRightOpen, PanelRightClose, Undo2, Redo2,
} from 'lucide-react';
import Button from '@/components/ui/Button';
import Toggle from '@/components/ui/Toggle';
import useWorkspaceStore from '@/stores/useWorkspaceStore';
import useUIStore from '@/stores/useUIStore';
import useFlashcardStore from '@/stores/useFlashcardStore';
import useAuthStore from '@/stores/useAuthStore';
import FlashcardPopup from '@/features/flashcard/FlashcardPopup';
import DetailPanel from '@/features/workspace/panels/DetailPanel';
import { nodeTypes } from '@/features/workspace/nodes';
import { A4_WIDTH, A4_HEIGHT, TOOLS, METHODS } from '@/utils/constants';
import { getMockDataByMethod } from '@/utils/mockData';
import { exportCanvasToPDF } from '@/utils/pdfExport';
import useAutosave from '@/hooks/useAutosave';
import useKeyboardShortcuts from '@/hooks/useKeyboardShortcuts';


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
  const { screenToFlowPosition } = useReactFlow();
  const {
    nodes, edges, onNodesChange, onEdgesChange, onConnect,
    loadGraph, workspaceName, setWorkspaceName,
    addNode, deleteNode, deleteEdge, undo, redo, historyPast, historyFuture,
  } = useWorkspaceStore();
  const {
    isEditMode, setEditMode, activeTool, setActiveTool,
    isFlashcardOpen, setFlashcardOpen, saveStatus, setSaveStatus,
    selectedNodeId, selectedEdgeId, setSelectedNode, setSelectedEdge, isRightSidebarOpen, setRightSidebarOpen,
  } = useUIStore();
  const { setCards } = useFlashcardStore();
  const { isDyslexiaMode, setDyslexiaMode } = useAuthStore();
  const [isEditingName, setIsEditingName] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const currentMethod = WORKSPACE_METHODS[id] || METHODS.MIND_MAP;
  const nameInputRef = useRef(null);
  const canvasRef = useRef(null);

  // Load method-specific mock data
  useEffect(() => {
    const mockData = getMockDataByMethod(currentMethod);
    loadGraph(mockData.nodes, mockData.edges);
    setCards(mockData.flashcards);
    setWorkspaceName(WORKSPACE_NAMES[id] || 'Untitled Workspace');
  }, [currentMethod, id, loadGraph, setCards, setWorkspaceName]);

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

  const handleEdgeClick = useCallback((event, edge) => {
    event.stopPropagation();
    setSelectedEdge(edge.id);
    setRightSidebarOpen(true);
  }, [setRightSidebarOpen, setSelectedEdge]);

  const createShapeNode = useCallback((toolKey, position) => {
    const isText = toolKey === TOOLS.TEXT;
    const size = {
      width: isText ? 180 : 140,
      height: isText ? 48 : toolKey === TOOLS.OVAL ? 100 : 96,
    };
    const unclampedPosition = {
      x: position.x - size.width / 2,
      y: position.y - size.height / 2,
    };
    const shapeLabel = {
      [TOOLS.RECTANGLE]: 'Rectangle',
      [TOOLS.OVAL]: 'Circle',
      [TOOLS.DIAMOND]: 'Diamond',
      [TOOLS.TEXT]: 'Teks Baru',
    }[toolKey];

    const newNode = {
      id: `node-${Date.now()}`,
      type: 'shape',
      position: unclampedPosition,
      data: {
        label: shapeLabel,
        shapeType: toolKey,
        iconName: 'none',
      },
      style: {
        width: size.width,
        height: size.height,
        background: isText ? 'transparent' : '#F8FAFC',
        border: isText ? '1.5px dashed #94A3B8' : '2px solid #2563EB',
        borderRadius: toolKey === TOOLS.OVAL ? '9999px' : '8px',
        color: '#0F172A',
        fontSize: isText ? '18px' : '14px',
        fontWeight: isText ? 700 : 600,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
      },
    };

    addNode(newNode);
    setSelectedNode(newNode.id);
    setRightSidebarOpen(true);
    setActiveTool(TOOLS.SELECT);
  }, [addNode, setActiveTool, setRightSidebarOpen, setSelectedNode]);

  const getVisibleCanvasCenter = useCallback(() => {
    const bounds = canvasRef.current?.getBoundingClientRect();
    if (!bounds) {
      return { x: A4_WIDTH / 2, y: A4_HEIGHT / 2 };
    }

    return screenToFlowPosition({
      x: bounds.left + bounds.width / 2,
      y: bounds.top + bounds.height / 2,
    });
  }, [screenToFlowPosition]);

  const handlePaneClick = useCallback((event) => {
    if ([TOOLS.RECTANGLE, TOOLS.OVAL, TOOLS.DIAMOND, TOOLS.TEXT].includes(activeTool)) {
      createShapeNode(activeTool, screenToFlowPosition({ x: event.clientX, y: event.clientY }));
      return;
    }
    setSelectedNode(null);
  }, [activeTool, createShapeNode, screenToFlowPosition, setSelectedNode]);

  const handleToolClick = (toolKey) => {
    if ([TOOLS.RECTANGLE, TOOLS.OVAL, TOOLS.DIAMOND, TOOLS.TEXT].includes(toolKey)) {
      setActiveTool(toolKey);
    } else if (toolKey === TOOLS.DELETE) {
       // Handle delete explicitly if selected via toolbar
       if (selectedNodeId) {
         deleteNode(selectedNodeId);
         setSelectedNode(null);
       } else if (selectedEdgeId) {
         deleteEdge(selectedEdgeId);
         setSelectedEdge(null);
       }
       setActiveTool(TOOLS.SELECT); // Revert to select
    } else {
      setActiveTool(toolKey);
    }
  };

  const handleToolDoubleClick = (toolKey) => {
    if ([TOOLS.RECTANGLE, TOOLS.OVAL, TOOLS.DIAMOND, TOOLS.TEXT].includes(toolKey)) {
      createShapeNode(toolKey, getVisibleCanvasCenter());
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
    <div className="h-screen flex flex-col bg-background overflow-hidden">
      {/* Top Bar */}
      <div className="flex items-center justify-between h-14 px-4 bg-secondary border-b border-border z-20 shrink-0">
        <div className="flex items-center gap-3 flex-1">
          <Button variant="ghost" size="icon" onClick={() => navigate('/home')}>
            <ArrowLeft size={18} />
          </Button>
          <div className="flex items-center gap-3" onDoubleClick={handleNameDoubleClick}>
            {isEditingName ? (
              <input
                ref={nameInputRef}
                className="text-sm font-semibold px-2 py-1 bg-background border border-primary rounded-sm text-foreground min-w-[200px]"
                value={workspaceName}
                onChange={(e) => setWorkspaceName(e.target.value)}
                onBlur={handleNameBlur}
                onKeyDown={handleNameKeyDown}
              />
            ) : (
              <span className="text-sm font-semibold cursor-pointer px-2 py-1 rounded-sm transition-colors hover:bg-muted">{workspaceName}</span>
            )}
            <span className={`text-xs font-medium ${saveStatus === 'saved' ? 'text-green-500' : saveStatus === 'saving' ? 'text-amber-500' : 'text-muted-foreground'}`}>
              {saveStatus === 'saved' && '✓ Saved'}
              {saveStatus === 'saving' && '⟳ Saving...'}
              {saveStatus === 'unsaved' && '● Unsaved'}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-1 justify-end">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-muted rounded-full text-xs text-muted-foreground">
            <span className="text-[10px] font-bold uppercase tracking-widest">Dyslexia</span>
            <Toggle checked={isDyslexiaMode} onChange={setDyslexiaMode} size="sm" />
          </div>
          <div className="flex items-center gap-2 px-3 py-1 bg-muted rounded-full text-xs text-muted-foreground">
            {isEditMode ? <Edit3 size={14} /> : <Eye size={14} />}
            <Toggle checked={isEditMode} onChange={setEditMode} size="sm" />
            <span className="text-xs">{isEditMode ? 'Edit' : 'View'}</span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={undo}
            disabled={historyPast.length === 0}
            title="Undo"
          >
            <Undo2 size={16} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={redo}
            disabled={historyFuture.length === 0}
            title="Redo"
          >
            <Redo2 size={16} />
          </Button>
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
            className="flex items-center justify-center w-9 h-9 rounded-md text-muted-foreground transition-colors cursor-pointer hover:bg-muted hover:text-foreground ml-1"
            onClick={() => setRightSidebarOpen(!isRightSidebarOpen)}
            title="Toggle Properties"
          >
            {isRightSidebarOpen ? <PanelRightClose size={18} /> : <PanelRightOpen size={18} />}
          </button>
        </div>
      </div>

      <div className="flex-1 flex relative overflow-hidden">
        {/* Left Toolbar */}
        {isEditMode && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 z-30 bg-secondary border border-border rounded-lg p-2 flex flex-col gap-1 shadow-lg animate-in fade-in slide-in-from-left-4">
            {tools.map((t) =>
              t.key.startsWith('divider') ? (
                <div key={t.key} className="w-7 h-px bg-border my-1 mx-auto" />
              ) : (
                <button
                  key={t.key}
                  className={`flex items-center justify-center w-9 h-9 rounded-md text-muted-foreground transition-colors cursor-pointer hover:bg-muted hover:text-foreground ${activeTool === t.key ? 'bg-primary/20 text-primary' : ''}`}
                  onClick={() => handleToolClick(t.key)}
                  onDoubleClick={() => handleToolDoubleClick(t.key)}
                  title={t.label}
                >
                  {t.icon}
                </button>
              )
            )}
          </div>
        )}

        {/* Canvas */}
        <div className="flex-1 flex items-center justify-center bg-background overflow-auto p-8">
          <div className="bg-white shadow-[0_8px_32px_rgba(0,0,0,0.4)] rounded-sm relative shrink-0 [&_.react-flow]:rounded-sm [&_.react-flow__background]:bg-white [&_.react-flow__minimap]:border [&_.react-flow__minimap]:border-border [&_.react-flow__minimap]:rounded-md [&_.react-flow__minimap]:overflow-hidden [&_.react-flow__controls]:rounded-md [&_.react-flow__controls]:border [&_.react-flow__controls]:border-border [&_.react-flow__controls]:overflow-hidden [&_.react-flow__controls]:shadow-md [&_.react-flow__controls_button]:bg-secondary [&_.react-flow__controls_button]:border-border [&_.react-flow__controls_button]:text-muted-foreground hover:[&_.react-flow__controls_button]:bg-muted hover:[&_.react-flow__controls_button]:text-foreground" ref={canvasRef} style={{ width: A4_WIDTH, height: A4_HEIGHT }}>
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onNodesChange={isEditMode ? onNodesChange : undefined}
              onEdgesChange={isEditMode ? onEdgesChange : undefined}
              onConnect={isEditMode ? onConnect : undefined}
              onNodesDelete={useWorkspaceStore.getState().onNodesDelete}
              onEdgesDelete={useWorkspaceStore.getState().onEdgesDelete}
              onNodeClick={handleNodeClick}
              onEdgeClick={handleEdgeClick}
              onPaneClick={handlePaneClick}
              nodeTypes={nodeTypes}
              nodesDraggable={isEditMode && !isFlashcardOpen && activeTool === TOOLS.SELECT}
              panOnDrag={!isEditMode || activeTool === TOOLS.HAND ? [0, 1, 2] : false}
              selectionOnDrag={isEditMode && activeTool === TOOLS.SELECT}
              panOnScroll={true}
              zoomOnScroll={true}
              nodesConnectable={isEditMode && activeTool === TOOLS.SELECT}
              elementsSelectable={isEditMode && activeTool === TOOLS.SELECT}
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
