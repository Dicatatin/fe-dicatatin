import BaseNode from './BaseNode';

/**
 * Boxing Child Node — content locked inside a parent group
 */
export default function BoxingChildNode(props) {
  return (
    <BaseNode
      {...props}
      className="boxing-child-node"
      minWidth={100}
      minHeight={32}
      handlePositions={[]}
      showHandles={false}
      resizable={false}
    />
  );
}
