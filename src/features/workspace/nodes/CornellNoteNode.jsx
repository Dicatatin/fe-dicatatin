import BaseNode from './BaseNode';

/**
 * Cornell Note Node — detail text blocks in the right column (70% width)
 */
export default function CornellNoteNode(props) {
  return (
    <BaseNode
      {...props}
      className="cornell-note-node"
      minWidth={300}
      minHeight={60}
      handlePositions={['left']}
    >
      <div className="base-node__content">
        <span className="cornell-zone-label">NOTES</span>
        <span className="base-node__label" style={{ textAlign: 'left', width: '100%', whiteSpace: 'pre-wrap' }}>
          {props.data?.label || 'Detail notes...'}
        </span>
      </div>
    </BaseNode>
  );
}
