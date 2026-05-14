import BaseNode from './BaseNode';

/**
 * Zettelkasten Node — atomic note with unique ID code
 */
export default function ZettelNode(props) {
  const { zettelId, isIndex } = props.data || {};

  return (
    <BaseNode
      {...props}
      className={`zettel-node ${isIndex ? 'zettel-node--index' : ''}`}
      minWidth={100}
      minHeight={50}
      handlePositions={['top', 'bottom', 'left', 'right']}
    >
      {({ isEditing, editor }) => (
        <div className="base-node__content" style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
          {zettelId && <span className="zettel-node__id">{zettelId}</span>}
          <div className="zettel-node__content">
            {isEditing ? editor : (
              <span className="base-node__label">
                {props.data?.label || 'Note'}
              </span>
            )}
          </div>
        </div>
      )}
    </BaseNode>
  );
}
