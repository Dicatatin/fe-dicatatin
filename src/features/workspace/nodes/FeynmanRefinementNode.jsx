import BaseNode from './BaseNode';

/**
 * Feynman Refinement Node — side nodes linked to Gap Identification
 */
export default function FeynmanRefinementNode(props) {
  return (
    <BaseNode
      {...props}
      className="feynman-refinement-node"
      minWidth={140}
      minHeight={50}
      handlePositions={['left', 'right']}
    >
      <div className="base-node__content" style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
        <div className="feynman-refinement-node__label">Refinement</div>
        <span className="base-node__label" style={{ textAlign: 'left' }}>
          {props.data?.label || 'Study more...'}
        </span>
      </div>
    </BaseNode>
  );
}
