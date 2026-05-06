import { useCallback, useRef, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  useReactFlow,
  ReactFlowProvider,
} from '@xyflow/react';
import {
  Save, Download, Eye, Edit3, BookOpen, ArrowLeft,
  MousePointer2, Hand, Square, Circle, Type, Minus, Trash2, Diamond,
} from 'lucide-react';
import Button from '@/components/ui/Button';
import Toggle from '@/components/ui/Toggle';
import useWorkspaceStore from '@/stores/useWorkspaceStore';
import useUIStore from '@/stores/useUIStore';
import useFlashcardStore from '@/stores/useFlashcardStore';
import FlashcardPopup from '@/features/flashcard/FlashcardPopup';
import { A4_WIDTH, A4_HEIGHT, TOOLS } from '@/utils/constants';
import './WorkspacePage.css';

const MOCK_NODES = [
  { id: '1', type: 'default', position: { x: 280, y: 40 }, data: { label: 'Biologi Sel' }, style: { background: '#3B82F6', color: '#fff', fontWeight: 700, borderRadius: 8, padding: '12px 24px', border: 'none', fontSize: '16px' } },
  { id: '2', type: 'default', position: { x: 80, y: 180 }, data: { label: 'Mitosis' }, style: { background: '#162D4A', color: '#E8EDF5', borderRadius: 8, padding: '10px 18px', border: '1px solid rgba(148,163,184,0.18)' } },
  { id: '3', type: 'default', position: { x: 450, y: 180 }, data: { label: 'Meiosis' }, style: { background: '#162D4A', color: '#E8EDF5', borderRadius: 8, padding: '10px 18px', border: '1px solid rgba(148,163,184,0.18)' } },
  { id: '4', type: 'default', position: { x: 30, y: 320 }, data: { label: 'Profase' }, style: { background: '#0F2035', color: '#94A3B8', borderRadius: 8, padding: '8px 14px', border: '1px solid rgba(148,163,184,0.1)', fontSize: '13px' } },
  { id: '5', type: 'default', position: { x: 200, y: 320 }, data: { label: 'Metafase' }, style: { background: '#0F2035', color: '#94A3B8', borderRadius: 8, padding: '8px 14px', border: '1px solid rgba(148,163,184,0.1)', fontSize: '13px' } },
  { id: '6', type: 'default', position: { x: 400, y: 320 }, data: { label: 'Meiosis I' }, style: { background: '#0F2035', color: '#94A3B8', borderRadius: 8, padding: '8px 14px', border: '1px solid rgba(148,163,184,0.1)', fontSize: '13px' } },
  { id: '7', type: 'default', position: { x: 560, y: 320 }, data: { label: 'Meiosis II' }, style: { background: '#0F2035', color: '#94A3B8', borderRadius: 8, padding: '8px 14px', border: '1px solid rgba(148,163,184,0.1)', fontSize: '13px' } },
];

const MOCK_EDGES = [
  { id: 'e1-2', source: '1', target: '2', type: 'default', style: { stroke: '#3B82F6', strokeWidth: 2 } },
  { id: 'e1-3', source: '1', target: '3', type: 'default', style: { stroke: '#2DD4BF', strokeWidth: 2 } },
  { id: 'e2-4', source: '2', target: '4', type: 'default', style: { stroke: '#3B82F680', strokeWidth: 1.5 } },
  { id: 'e2-5', source: '2', target: '5', type: 'default', style: { stroke: '#3B82F680', strokeWidth: 1.5 } },
  { id: 'e3-6', source: '3', target: '6', type: 'default', style: { stroke: '#2DD4BF80', strokeWidth: 1.5 } },
  { id: 'e3-7', source: '3', target: '7', type: 'default', style: { stroke: '#2DD4BF80', strokeWidth: 1.5 } },
];

const MOCK_FLASHCARDS = [
  { id: 'fc1', question: 'Apa perbedaan utama antara Mitosis dan Meiosis?', answer: 'Mitosis menghasilkan 2 sel identik (diploid), sedangkan Meiosis menghasilkan 4 sel berbeda (haploid) untuk reproduksi seksual.' },
  { id: 'fc2', question: 'Sebutkan tahapan Mitosis!', answer: 'Profase → Metafase → Anafase → Telofase (PMAT).' },
  { id: 'fc3', question: 'Mengapa Meiosis terdiri dari dua tahap?', answer: 'Meiosis I memisahkan kromosom homolog, Meiosis II memisahkan kromatid saudara, sehingga jumlah kromosom menjadi setengah (haploid).' },
];

function WorkspaceEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { nodes, edges, onNodesChange, onEdgesChange, onConnect, setNodes, setEdges, workspaceName, setWorkspaceName, setFlashcards } = useWorkspaceStore();
  const { isEditMode, setEditMode, activeTool, setActiveTool, isFlashcardOpen, setFlashcardOpen, saveStatus, setSaveStatus } = useUIStore();
  const { setCards } = useFlashcardStore();
  const [isEditingName, setIsEditingName] = useState(false);
  const nameInputRef = useRef(null);

  useEffect(() => {
    // Load mock data
    setNodes(MOCK_NODES);
    setEdges(MOCK_EDGES);
    setWorkspaceName('Biologi Sel - Mitosis & Meiosis');
    setFlashcards(MOCK_FLASHCARDS);
  }, [id, setNodes, setEdges, setWorkspaceName, setFlashcards]);

  const handleSave = () => {
    setSaveStatus('saving');
    setTimeout(() => setSaveStatus('saved'), 1000);
  };

  const handleExportPDF = () => {
    alert('PDF Export — akan diimplementasi dengan @react-pdf/renderer');
  };

  const handleFlashcard = () => {
    setCards(MOCK_FLASHCARDS);
    setFlashcardOpen(true);
    setEditMode(false);
  };

  const handleNameDoubleClick = () => {
    if (isEditMode) {
      setIsEditingName(true);
      setTimeout(() => nameInputRef.current?.focus(), 50);
    }
  };

  const handleNameBlur = () => {
    setIsEditingName(false);
  };

  const handleNameKeyDown = (e) => {
    if (e.key === 'Enter') {
      setIsEditingName(false);
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
    { key: TOOLS.LINE, icon: <Minus size={18} />, label: 'Line' },
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
            <Toggle
              checked={isEditMode}
              onChange={setEditMode}
              size="sm"
            />
            <span className="text-xs">{isEditMode ? 'Edit' : 'View'}</span>
          </div>
        </div>

        <div className="ws-topbar-right">
          <Button variant="ghost" size="sm" onClick={handleSave} icon={<Save size={16} />}>
            Save
          </Button>
          <Button variant="secondary" size="sm" onClick={handleExportPDF} icon={<Download size={16} />}>
            Export PDF
          </Button>
          <Button size="sm" onClick={handleFlashcard} icon={<BookOpen size={16} />}>
            Belajar
          </Button>
        </div>
      </div>

      <div className="ws-body">
        {/* Left Toolbar */}
        {isEditMode && (
          <div className="ws-toolbar animate-fade-in-left">
            {tools.map((t, i) =>
              t.key.startsWith('divider') ? (
                <div key={t.key} className="ws-toolbar-divider" />
              ) : (
                <button
                  key={t.key}
                  className={`ws-tool-btn ${activeTool === t.key ? 'active' : ''}`}
                  onClick={() => setActiveTool(t.key)}
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
          <div className="ws-a4-wrapper" style={{ width: A4_WIDTH, height: A4_HEIGHT }}>
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onNodesChange={isEditMode ? onNodesChange : undefined}
              onEdgesChange={isEditMode ? onEdgesChange : undefined}
              onConnect={isEditMode ? onConnect : undefined}
              nodesDraggable={isEditMode && !isFlashcardOpen}
              nodesConnectable={isEditMode}
              elementsSelectable={isEditMode}
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
