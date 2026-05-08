import { BookOpen, Lightbulb, Target, Zap, Star, Layers, PenTool } from 'lucide-react';
import BaseNode from './BaseNode';

const ICON_MAP = {
  book: BookOpen,
  lightbulb: Lightbulb,
  target: Target,
  zap: Zap,
  star: Star,
  layers: Layers,
  pen: PenTool,
};

/**
 * Sketchnote Node — variable size with SVG icon from Lucide
 */
export default function SketchnoteNode(props) {
  const { importance = 'medium', icon = 'lightbulb', iconColor } = props.data || {};

  const sizeClass = {
    large: 'sketchnote-node--large',
    medium: 'sketchnote-node--medium',
    small: 'sketchnote-node--small',
  }[importance] || 'sketchnote-node--medium';

  const IconComponent = ICON_MAP[icon] || Lightbulb;
  const iconSize = importance === 'large' ? 28 : importance === 'medium' ? 20 : 16;

  return (
    <BaseNode
      {...props}
      className={`sketchnote-node ${sizeClass}`}
      minWidth={importance === 'large' ? 200 : 120}
      minHeight={importance === 'large' ? 60 : 36}
      handlePositions={['top', 'bottom', 'left', 'right']}
    >
      <div className="sketchnote-node__icon" style={{ color: iconColor || '#6366F1' }}>
        <IconComponent size={iconSize} />
      </div>
      <div className="sketchnote-node__text">
        <span className="base-node__label">{props.data?.label || 'Note'}</span>
      </div>
    </BaseNode>
  );
}
