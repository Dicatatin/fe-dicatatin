import BaseNode from './BaseNode';

/**
 * Mind Map Branch Node — sub-nodes with color per depth level
 */
export default function MindMapBranchNode(props) {
  const depth = props.data?.depth || 1;
  const depthClass = `mindmap-branch-node--depth-${Math.min(depth, 4)}`;

  return (
    <BaseNode
      {...props}
      className={`mindmap-branch-node ${depthClass}`}
      minWidth={100}
      minHeight={36}
      handlePositions={['top', 'bottom', 'left', 'right']}
    />
  );
}
