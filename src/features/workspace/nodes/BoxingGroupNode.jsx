import BaseNode from './BaseNode';

const COLORS = ['teal', 'blue', 'purple', 'amber', 'pink'];

/**
 * Boxing Group Node — parent container with pastel dashed border
 */
export default function BoxingGroupNode(props) {
  const { data } = props;
  const colorVariant = data?.colorIndex != null
    ? COLORS[data.colorIndex % COLORS.length]
    : COLORS[0];

  return (
    <BaseNode
      {...props}
      className={`boxing-group-node boxing-group--${colorVariant}`}
      minWidth={300}
      minHeight={200}
      handlePositions={['top', 'bottom']}
      style={{
        width: data?.width || 300,
        height: data?.height || 200,
      }}
    >
      {({ isEditing, editor }) => (
        <div className="boxing-group-node__header">
          {isEditing ? editor : (data?.label || 'Group')}
        </div>
      )}
    </BaseNode>
  );
}
