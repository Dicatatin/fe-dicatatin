import BaseNode from './BaseNode';

/**
 * Charting Cell Node — uniform grid cell, header cells bold
 */
export default function ChartingCellNode(props) {
  const { isHeader, isRowHeader } = props.data || {};

  let cellClass = 'charting-cell-node';
  if (isHeader) cellClass += ' charting-cell-node--header';
  else if (isRowHeader) cellClass += ' charting-cell-node--row-header';

  return (
    <BaseNode
      {...props}
      className={cellClass}
      minWidth={120}
      minHeight={40}
      handlePositions={[]}
      showHandles={false}
      resizable={false}
      style={{
        width: props.data?.cellWidth || 150,
        height: props.data?.cellHeight || 50,
      }}
    />
  );
}
