import { useCallback, useMemo } from 'react';
import {
  AlignLeft, AlignCenter, AlignRight,
  Bold, Italic, Underline, X, MousePointer,
  BringToFront, SendToBack, MoveUp, MoveDown,
} from 'lucide-react';
import useUIStore from '@/stores/useUIStore';
import useWorkspaceStore from '@/stores/useWorkspaceStore';

/**
 * DetailPanel — right sidebar for editing selected node properties.
 */
export default function DetailPanel() {
  const selectedNodeId = useUIStore((s) => s.selectedNodeId);
  const selectedEdgeId = useUIStore((s) => s.selectedEdgeId);
  const setSelectedNode = useUIStore((s) => s.setSelectedNode);
  const clearSelection = useUIStore((s) => s.clearSelection);
  const nodes = useWorkspaceStore((s) => s.nodes);
  const edges = useWorkspaceStore((s) => s.edges);
  const updateNodeStyle = useWorkspaceStore((s) => s.updateNodeStyle);
  const updateEdgeStyle = useWorkspaceStore((s) => s.updateEdgeStyle);
  const updateEdge = useWorkspaceStore((s) => s.updateEdge);
  const moveNodeLayer = useWorkspaceStore((s) => s.moveNodeLayer);
  const moveEdgeLayer = useWorkspaceStore((s) => s.moveEdgeLayer);

  const selectedNode = nodes.find((n) => n.id === selectedNodeId);
  const selectedEdge = edges.find((e) => e.id === selectedEdgeId);

  const localStyle = useMemo(
    () => ({ ...(selectedNode?.data?.style || {}), ...(selectedNode?.style || {}) }),
    [selectedNode]
  );

  const applyStyle = useCallback((updates) => {
    updateNodeStyle(selectedNodeId, updates);
  }, [selectedNodeId, updateNodeStyle]);

  const applySize = useCallback((key, value) => {
    const num = parseInt(value, 10);
    if (!isNaN(num) && num > 0) {
      applyStyle({ [key]: num });
    }
  }, [applyStyle]);

  const applyEdgeStyle = useCallback((updates) => {
    if (!selectedEdgeId) return;
    updateEdgeStyle(selectedEdgeId, updates);
  }, [selectedEdgeId, updateEdgeStyle]);

  const layerActions = [
    { key: 'front', label: 'Front', icon: <BringToFront size={14} /> },
    { key: 'forward', label: 'Up', icon: <MoveUp size={14} /> },
    { key: 'backward', label: 'Down', icon: <MoveDown size={14} /> },
    { key: 'back', label: 'Back', icon: <SendToBack size={14} /> },
  ];
  const asHex = (value, fallback) => (/^#[0-9a-f]{6}$/i.test(value || '') ? value : fallback);

  if (selectedEdge) {
    const stroke = selectedEdge.style?.stroke || '#3B82F6';
    const strokeWidth = selectedEdge.style?.strokeWidth || 2;

    return (
      <div className="w-[280px] h-full bg-secondary border-l border-border overflow-y-auto shrink-0 animate-in slide-in-from-right-4">
        <div className="p-4 border-b border-border flex items-center justify-between">
          <span className="text-sm font-semibold text-foreground">Line Properties</span>
          <button className="flex items-center justify-center w-7 h-7 rounded-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-colors" onClick={clearSelection} title="Close">
            <X size={14} />
          </button>
        </div>

        <div className="p-4 border-b border-border">
          <div className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground mb-3">Stroke</div>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs text-muted-foreground w-12">Color</span>
            <div className="relative w-8 h-8 rounded-sm overflow-hidden border border-border cursor-pointer">
              <input
                type="color"
                className="absolute inset-[-10px] w-16 h-16 cursor-pointer"
                value={stroke}
                onChange={(e) => applyEdgeStyle({ stroke: e.target.value })}
              />
            </div>
            <span className="text-xs text-muted-foreground uppercase">{stroke}</span>
          </div>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs text-muted-foreground w-12">Width</span>
            <input
              type="number"
              className="flex-1 px-2 py-1 bg-background border border-border rounded-sm text-xs text-foreground focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
              value={strokeWidth}
              min={1}
              max={12}
              onChange={(e) => applyEdgeStyle({ strokeWidth: Number(e.target.value) })}
            />
          </div>
          <label className="flex items-center gap-2 text-xs text-muted-foreground">
            <input
              type="checkbox"
              checked={Boolean(selectedEdge.style?.strokeDasharray)}
              onChange={(e) => applyEdgeStyle({ strokeDasharray: e.target.checked ? '8 5' : undefined })}
            />
            Dashed line
          </label>
        </div>

        <div className="p-4 border-b border-border">
          <div className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground mb-3">Type</div>
          <select
            className="w-full px-2 py-2 bg-background border border-border rounded-sm text-xs text-foreground focus:border-primary focus:ring-1 focus:ring-primary outline-none"
            value={selectedEdge.type || 'default'}
            onChange={(e) => updateEdge(selectedEdge.id, { type: e.target.value })}
          >
            <option value="default">Default</option>
            <option value="straight">Straight</option>
            <option value="step">Step</option>
            <option value="smoothstep">Smooth Step</option>
          </select>
        </div>

        <div className="p-4 border-b border-border">
          <div className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground mb-3">Layer</div>
          <div className="grid grid-cols-2 gap-2">
            {layerActions.map((action) => (
              <button
                key={action.key}
                className="flex items-center justify-center gap-2 rounded-sm border border-border bg-background px-2 py-2 text-xs font-semibold text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                onClick={() => moveEdgeLayer(selectedEdge.id, action.key)}
              >
                {action.icon}
                {action.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!selectedNode) {
    return (
      <div className="w-[280px] h-full bg-secondary border-l border-border overflow-y-auto shrink-0 animate-in slide-in-from-right-4">
        <div className="p-4 border-b border-border flex items-center justify-between">
          <span className="text-sm font-semibold text-foreground">Properties</span>
        </div>
        <div className="p-10 text-center text-muted-foreground text-sm flex flex-col items-center justify-center">
          <div className="text-3xl mb-3 opacity-40"><MousePointer size={32} /></div>
          <p>Select a node to edit its properties</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-[280px] h-full bg-secondary border-l border-border overflow-y-auto shrink-0 animate-in slide-in-from-right-4">
      <div className="p-4 border-b border-border flex items-center justify-between">
        <span className="text-sm font-semibold text-foreground">Node Properties</span>
        <button className="flex items-center justify-center w-7 h-7 rounded-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-colors" onClick={() => setSelectedNode(null)} title="Close">
          <X size={14} />
        </button>
      </div>

      {/* Text Section */}
      <div className="p-4 border-b border-border">
        <div className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground mb-3">Text</div>

        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs text-muted-foreground w-12">Align</span>
          <div className="flex gap-1">
            {[
              { val: 'left', icon: <AlignLeft size={14} /> },
              { val: 'center', icon: <AlignCenter size={14} /> },
              { val: 'right', icon: <AlignRight size={14} /> },
            ].map((a) => (
              <button
                key={a.val}
                className={`flex items-center justify-center min-w-[30px] p-1.5 rounded-sm text-xs transition-colors ${localStyle.textAlign === a.val ? 'bg-primary/20 text-primary' : 'text-muted-foreground hover:bg-muted hover:text-foreground'}`}
                onClick={() => applyStyle({ textAlign: a.val })}
              >
                {a.icon}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs text-muted-foreground w-12">Style</span>
          <div className="flex gap-1">
            <button
              className={`flex items-center justify-center min-w-[30px] p-1.5 rounded-sm text-xs transition-colors ${localStyle.fontWeight >= 700 ? 'bg-primary/20 text-primary' : 'text-muted-foreground hover:bg-muted hover:text-foreground'}`}
              onClick={() => applyStyle({ fontWeight: localStyle.fontWeight >= 700 ? 400 : 700 })}
            >
              <Bold size={14} />
            </button>
            <button
              className={`flex items-center justify-center min-w-[30px] p-1.5 rounded-sm text-xs transition-colors ${localStyle.fontStyle === 'italic' ? 'bg-primary/20 text-primary' : 'text-muted-foreground hover:bg-muted hover:text-foreground'}`}
              onClick={() => applyStyle({ fontStyle: localStyle.fontStyle === 'italic' ? 'normal' : 'italic' })}
            >
              <Italic size={14} />
            </button>
            <button
              className={`flex items-center justify-center min-w-[30px] p-1.5 rounded-sm text-xs transition-colors ${localStyle.textDecoration === 'underline' ? 'bg-primary/20 text-primary' : 'text-muted-foreground hover:bg-muted hover:text-foreground'}`}
              onClick={() => applyStyle({ textDecoration: localStyle.textDecoration === 'underline' ? 'none' : 'underline' })}
            >
              <Underline size={14} />
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs text-muted-foreground w-12">Size</span>
          <input
            type="number"
            className="flex-1 px-2 py-1 bg-background border border-border rounded-sm text-xs text-foreground focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all w-[60px]"
            value={parseInt(localStyle.fontSize, 10) || 14}
            onChange={(e) => applyStyle({ fontSize: `${e.target.value}px` })}
            min={8}
            max={72}
          />
          <span className="text-[10px] text-muted-foreground">px</span>
        </div>

        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs text-muted-foreground w-12">Color</span>
          <div className="relative w-8 h-8 rounded-sm overflow-hidden border border-border cursor-pointer">
            <input
              type="color"
              className="absolute inset-[-10px] w-16 h-16 cursor-pointer"
              value={asHex(localStyle.color, '#334155')}
              onChange={(e) => applyStyle({ color: e.target.value })}
            />
          </div>
          <span className="text-xs text-muted-foreground uppercase">{localStyle.color || '#334155'}</span>
        </div>
      </div>

      {/* Appearance Section */}
      <div className="p-4 border-b border-border">
        <div className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground mb-3">Appearance</div>

        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs text-muted-foreground w-12">Fill</span>
          <div className="relative w-8 h-8 rounded-sm overflow-hidden border border-border cursor-pointer">
            <input
              type="color"
              className="absolute inset-[-10px] w-16 h-16 cursor-pointer"
              value={asHex(localStyle.background || localStyle.backgroundColor, '#FFFFFF')}
              onChange={(e) => applyStyle({ background: e.target.value })}
            />
          </div>
          <span className="text-xs text-muted-foreground uppercase">{localStyle.background || '#FFFFFF'}</span>
        </div>

        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs text-muted-foreground w-12">Border</span>
          <div className="relative w-8 h-8 rounded-sm overflow-hidden border border-border cursor-pointer">
            <input
              type="color"
              className="absolute inset-[-10px] w-16 h-16 cursor-pointer"
              value={asHex(localStyle.borderColor, '#E2E8F0')}
              onChange={(e) => applyStyle({ borderColor: e.target.value, border: `1.5px solid ${e.target.value}` })}
            />
          </div>
        </div>

        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs text-muted-foreground w-12">Radius</span>
          <input
            type="number"
            className="flex-1 px-2 py-1 bg-background border border-border rounded-sm text-xs text-foreground focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all w-[60px]"
            value={parseInt(localStyle.borderRadius, 10) || 8}
            onChange={(e) => applyStyle({ borderRadius: `${e.target.value}px` })}
            min={0}
            max={50}
          />
          <span className="text-[10px] text-muted-foreground">px</span>
        </div>
      </div>

      {/* Size Section */}
      <div className="p-4 border-b border-border">
        <div className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground mb-3">Size</div>
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs text-muted-foreground w-4">W</span>
          <input
            type="number"
            className="flex-1 px-2 py-1 bg-background border border-border rounded-sm text-xs text-foreground focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all w-[70px]"
            value={localStyle.width || ''}
            placeholder="auto"
            onChange={(e) => applySize('width', e.target.value)}
          />
          <span className="text-xs text-muted-foreground w-4 ml-2">H</span>
          <input
            type="number"
            className="flex-1 px-2 py-1 bg-background border border-border rounded-sm text-xs text-foreground focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all w-[70px]"
            value={localStyle.height || ''}
            placeholder="auto"
            onChange={(e) => applySize('height', e.target.value)}
          />
        </div>
      </div>

      {/* Layer Section */}
      <div className="p-4 border-b border-border">
        <div className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground mb-3">Layer</div>
        <div className="grid grid-cols-2 gap-2">
          {layerActions.map((action) => (
            <button
              key={action.key}
              className="flex items-center justify-center gap-2 rounded-sm border border-border bg-background px-2 py-2 text-xs font-semibold text-muted-foreground transition-colors hover:border-primary hover:text-primary"
              onClick={() => moveNodeLayer(selectedNode.id, action.key)}
            >
              {action.icon}
              {action.label}
            </button>
          ))}
        </div>
      </div>

      {/* Node Info */}
      <div className="p-4 border-b border-border">
        <div className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground mb-3">Info</div>
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs text-muted-foreground w-12">ID</span>
          <span className="text-xs text-muted-foreground truncate">{selectedNode.id}</span>
        </div>
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs text-muted-foreground w-12">Type</span>
          <span className="text-xs text-muted-foreground">{selectedNode.type}</span>
        </div>
      </div>
    </div>
  );
}
