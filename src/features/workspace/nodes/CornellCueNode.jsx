import BaseNode from './BaseNode';

/**
 * Cornell Cue Node — keywords in the left column (30% width)
 */
export default function CornellCueNode(props) {
  return (
    <BaseNode
      {...props}
      className="cornell-cue-node"
      minWidth={140}
      minHeight={40}
      handlePositions={['right']}
    >
      {({ isEditing, editor }) => (
        <div className="base-node__content">
          {isEditing ? editor : (
            <span className="base-node__label" style={{ width: '100%' }}>
              {props.data?.label || 'Keyword'}
            </span>
          )}
        </div>
      )}
    </BaseNode>
  );
}
