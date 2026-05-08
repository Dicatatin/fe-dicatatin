import BaseNode from './BaseNode';

/**
 * Mind Map Root Node — centered main concept, bold blue gradient
 */
export default function MindMapRootNode(props) {
  return (
    <BaseNode
      {...props}
      className="mindmap-root-node"
      minWidth={180}
      minHeight={60}
      handlePositions={['top', 'bottom', 'left', 'right']}
    />
  );
}
