// A4 dimensions in pixels (96 DPI)
export const A4_WIDTH = 794;   // 210mm
export const A4_HEIGHT = 1123; // 297mm

// A4 dimensions in mm
export const A4_WIDTH_MM = 210;
export const A4_HEIGHT_MM = 297;

export const METHODS = {
  MIND_MAP: 'mind_map',
  CORNELL: 'cornell',
  BOXING: 'boxing',
  CHARTING: 'charting',
  ZETTELKASTEN: 'zettelkasten',
  SKETCHNOTING: 'sketchnoting',
  FEYNMAN: 'feynman',
};

export const METHOD_INFO = {
  [METHODS.MIND_MAP]: {
    label: 'Mind Map',
    description: 'Hubungkan ide secara radial dari konsep utama',
    icon: '🧠',
    edgeType: 'floating',
    color: '#A78BFA',
  },
  [METHODS.CORNELL]: {
    label: 'Cornell',
    description: 'Bagi catatan menjadi Cues, Notes, dan Summary',
    icon: '📋',
    edgeType: 'none',
    color: '#60A5FA',
  },
  [METHODS.BOXING]: {
    label: 'Boxing',
    description: 'Kelompokkan informasi dalam kotak tematik',
    icon: '📦',
    edgeType: 'none',
    color: '#2DD4BF',
  },
  [METHODS.CHARTING]: {
    label: 'Charting',
    description: 'Susun data dalam tabel komparasi',
    icon: '📊',
    edgeType: 'straight',
    color: '#FBBF24',
  },
  [METHODS.ZETTELKASTEN]: {
    label: 'Zettelkasten',
    description: 'Jaringan catatan atomis saling terhubung',
    icon: '🔗',
    edgeType: 'step',
    color: '#F472B6',
  },
  [METHODS.SKETCHNOTING]: {
    label: 'Sketchnoting',
    description: 'Catatan visual dengan ikon dan variasi ukuran',
    icon: '🎨',
    edgeType: 'smoothstep',
    color: '#34D399',
  },
  [METHODS.FEYNMAN]: {
    label: 'Feynman',
    description: 'Pahami konsep dengan penjelasan sederhana',
    icon: '💡',
    edgeType: 'bezier',
    color: '#FB923C',
  },
};

export const PIPELINE_STAGES = {
  SCANNING: 'scanning',
  SANITIZING: 'sanitizing',
  VISUALIZING: 'visualizing',
};

export const TOOLS = {
  SELECT: 'select',
  HAND: 'hand',
  RECTANGLE: 'rectangle',
  OVAL: 'oval',
  DIAMOND: 'diamond',
  PARALLELOGRAM: 'parallelogram',
  NOTE: 'note',
  TEXT: 'text',
  LINE: 'line',
  DELETE: 'delete',
};

export const EDGE_TYPES_LIST = [
  { key: 'straight', label: 'Straight' },
  { key: 'bezier', label: 'Bezier' },
  { key: 'step', label: 'Step' },
  { key: 'smoothstep', label: 'Smooth Step' },
];
