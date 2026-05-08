import ELK from 'elkjs/lib/elk.bundled.js';
import { METHODS } from './constants';

const elk = new ELK();

const METHOD_LAYOUT_CONFIG = {
  [METHODS.MIND_MAP]: {
    'elk.algorithm': 'mrtree',
    'elk.direction': 'DOWN',
    'elk.spacing.nodeNode': '60',
    'elk.layered.spacing.nodeNodeBetweenLayers': '80',
  },
  [METHODS.CORNELL]: { 'elk.algorithm': 'fixed' },
  [METHODS.BOXING]: { 'elk.algorithm': 'fixed' },
  [METHODS.CHARTING]: { 'elk.algorithm': 'fixed' },
  [METHODS.ZETTELKASTEN]: {
    'elk.algorithm': 'force',
    'elk.spacing.nodeNode': '80',
    'elk.force.temperature': '0.001',
    'elk.force.iterations': '300',
  },
  [METHODS.SKETCHNOTING]: {
    'elk.algorithm': 'mrtree',
    'elk.direction': 'DOWN',
    'elk.spacing.nodeNode': '50',
  },
  [METHODS.FEYNMAN]: {
    'elk.algorithm': 'layered',
    'elk.direction': 'DOWN',
    'elk.spacing.nodeNode': '40',
    'elk.layered.spacing.nodeNodeBetweenLayers': '80',
  },
};

export async function applyELKLayout(nodes, edges, method = METHODS.MIND_MAP) {
  const config = METHOD_LAYOUT_CONFIG[method] || METHOD_LAYOUT_CONFIG[METHODS.MIND_MAP];
  if (config['elk.algorithm'] === 'fixed') return nodes;

  const elkGraph = {
    id: 'root',
    layoutOptions: config,
    children: nodes.map((n) => ({
      id: n.id,
      width: n.measured?.width || 180,
      height: n.measured?.height || 60,
    })),
    edges: edges.map((e) => ({
      id: e.id,
      sources: [e.source],
      targets: [e.target],
    })),
  };

  try {
    const result = await elk.layout(elkGraph);
    return nodes.map((node) => {
      const ln = result.children?.find((n) => n.id === node.id);
      return ln ? { ...node, position: { x: ln.x || 0, y: ln.y || 0 } } : node;
    });
  } catch (err) {
    console.error('ELK layout error:', err);
    return nodes;
  }
}

export default elk;
