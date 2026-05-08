import BaseNode from './BaseNode';

const STEP_CONFIG = {
  concept: { label: 'STEP 1 · CONCEPT', badgeLabel: '1. Konsep' },
  explain: { label: 'STEP 2 · EXPLAIN', badgeLabel: '2. Jelaskan' },
  gaps: { label: 'STEP 3 · GAPS', badgeLabel: '3. Identifikasi Gap' },
  analogy: { label: 'STEP 4 · ANALOGY', badgeLabel: '4. Analogi' },
};

/**
 * Feynman Step Node — vertical flow: Concept → Explain → Gaps → Analogy
 */
export default function FeynmanStepNode(props) {
  const { step = 'concept' } = props.data || {};
  const config = STEP_CONFIG[step] || STEP_CONFIG.concept;

  return (
    <BaseNode
      {...props}
      className={`feynman-step-node feynman-step--${step}`}
      minWidth={240}
      minHeight={60}
      handlePositions={['top', 'bottom', 'left', 'right']}
    >
      <div className="base-node__content" style={{ flexDirection: 'column', alignItems: 'flex-start', paddingTop: 6 }}>
        <div className="feynman-step-node__badge">{config.badgeLabel}</div>
        <span className="base-node__label" style={{ textAlign: 'left', marginTop: 4 }}>
          {props.data?.label || 'Content...'}
        </span>
      </div>
    </BaseNode>
  );
}
