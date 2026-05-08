import { Handle, Position } from '@xyflow/react';


const COLORS = ['teal', 'blue', 'purple', 'amber', 'pink'];

/**
 * Boxing Group Node — parent container with pastel dashed border
 */
export default function BoxingGroupNode({ id, data, selected }) {
  const colorVariant = data?.colorIndex != null
    ? COLORS[data.colorIndex % COLORS.length]
    : COLORS[0];

  return (
    <div
      className={`base-node boxing-group-node boxing-group--${colorVariant} ${selected ? 'base-node--selected' : ''}`}
      style={{ width: data?.width || 300, height: data?.height || 200 }}
    >
      <div className="boxing-group-node__header">
        {data?.label || 'Group'}
      </div>
      <Handle type="target" position={Position.Top} className="base-node__handle" />
      <Handle type="source" position={Position.Bottom} className="base-node__handle" />
    </div>
  );
}
