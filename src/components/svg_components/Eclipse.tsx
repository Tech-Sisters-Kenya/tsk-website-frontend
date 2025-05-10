import * as React from 'react';

type EclipseSvgProps = {
  width?: number;
  height?: number;
  style?: React.CSSProperties;
  className?: string;
};

const EclipseSvg: React.FC<EclipseSvgProps> = ({
  width = 120,
  height = 120,
  style,
  className = '',
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox="0 0 120 120"
    style={style}
    className={`pulse-animation ${className}`}
  >
    <g transform="translate(60, 60)">
      <circle cx="0" cy="0" r="60" fill="#FFBAFF" />
    </g>
  </svg>
);

export default EclipseSvg;
