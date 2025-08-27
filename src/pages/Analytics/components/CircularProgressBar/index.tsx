import { colors } from '../../theme/variables';
import React, { useEffect, useState } from 'react';

interface CircularProgressBarProps {
  size: number;
  strokeWidth: number;
  radius: number;
  circumference: number;
  dash: number;
  animate?: boolean;
  durationMs?: number;
}

const CircularProgressBar = ({
  size,
  strokeWidth,
  radius,
  circumference,
  dash,
  animate = false,
  durationMs = 500,
}: CircularProgressBarProps) => {
  const [offset, setOffset] = useState<number>(animate ? circumference : circumference - dash);

  useEffect(() => {
    if (!animate) {
      setOffset(circumference - dash);
      return;
    }
    // Reset to empty, then animate to the target value on the next frame
    setOffset(circumference);
    const id = requestAnimationFrame(() => setOffset(circumference - dash));
    return () => cancelAnimationFrame(id);
  }, [dash, circumference, animate]);

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <g transform={`rotate(-90 ${size / 2} ${size / 2})`}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={colors.grayOutline}
          strokeWidth={strokeWidth}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={colors.greenMain}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={`${circumference}`}
          strokeDashoffset={offset}
          style={{ transition: animate ? `stroke-dashoffset ${durationMs}ms linear` : 'none' }}
        />
      </g>
    </svg>
  );
};

export default CircularProgressBar;
