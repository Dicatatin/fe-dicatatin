import BaseNode from './BaseNode';

/**
 * Cornell Summary Node — full-width summary area at bottom
 */
export default function CornellSummaryNode(props) {
  return (
    <BaseNode
      {...props}
      className="cornell-summary-node"
      minWidth={500}
      minHeight={80}
      handlePositions={['top']}
    >
      {({ isEditing, editor }) => (
        <div className="base-node__content">
          <span className="cornell-zone-label">SUMMARY</span>
          {isEditing ? editor : (
            <span className="base-node__label" style={{ textAlign: 'left', width: '100%', whiteSpace: 'pre-wrap' }}>
              {props.data?.label || 'Summary of the main ideas...'}
            </span>
          )}
        </div>
      )}
    </BaseNode>
  );
}
