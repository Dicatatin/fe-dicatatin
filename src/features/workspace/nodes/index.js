// Node & Edge type registries for React Flow
import MindMapRootNode from './MindMapRootNode';
import MindMapBranchNode from './MindMapBranchNode';
import CornellCueNode from './CornellCueNode';
import CornellNoteNode from './CornellNoteNode';
import CornellSummaryNode from './CornellSummaryNode';
import BoxingGroupNode from './BoxingGroupNode';
import BoxingChildNode from './BoxingChildNode';
import ChartingCellNode from './ChartingCellNode';
import ZettelNode from './ZettelNode';
import SketchnoteNode from './SketchnoteNode';
import FeynmanStepNode from './FeynmanStepNode';
import FeynmanRefinementNode from './FeynmanRefinementNode';
import BaseNode from './BaseNode';

export const nodeTypes = {
  mindMapRoot: MindMapRootNode,
  mindMapBranch: MindMapBranchNode,
  cornellCue: CornellCueNode,
  cornellNote: CornellNoteNode,
  cornellSummary: CornellSummaryNode,
  boxingGroup: BoxingGroupNode,
  boxingChild: BoxingChildNode,
  chartingCell: ChartingCellNode,
  zettel: ZettelNode,
  sketchnote: SketchnoteNode,
  feynmanStep: FeynmanStepNode,
  feynmanRefinement: FeynmanRefinementNode,
  shape: BaseNode,
};

// Re-export for convenience
export { default as MindMapRootNode } from './MindMapRootNode';
export { default as MindMapBranchNode } from './MindMapBranchNode';
export { default as CornellCueNode } from './CornellCueNode';
export { default as CornellNoteNode } from './CornellNoteNode';
export { default as CornellSummaryNode } from './CornellSummaryNode';
export { default as BoxingGroupNode } from './BoxingGroupNode';
export { default as BoxingChildNode } from './BoxingChildNode';
export { default as ChartingCellNode } from './ChartingCellNode';
export { default as ZettelNode } from './ZettelNode';
export { default as SketchnoteNode } from './SketchnoteNode';
export { default as FeynmanStepNode } from './FeynmanStepNode';
export { default as FeynmanRefinementNode } from './FeynmanRefinementNode';
