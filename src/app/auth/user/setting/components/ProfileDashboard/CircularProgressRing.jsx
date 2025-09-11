// CircularProgressRing.jsx
import React, { useEffect, useState } from 'react';

function CircularProgressRing({ percentage = 0, label = '', color = '#3498db', radius = 45, stroke = 10 }) {
  const normalizedRadius = radius - stroke / 2;
  const circumference = 2 * Math.PI * normalizedRadius;
  const [offset, setOffset] = useState(circumference);

  useEffect(() => {
    const progressOffset = circumference - (percentage / 100) * circumference;
    setOffset(progressOffset);
  }, [percentage, circumference]);

  // Adjust the radius for the inner circle to create the gap
  const innerCircleRadius = normalizedRadius - (stroke / 2) - 3; 

  return (
    <>
      <div className="col">
        <div className="dashboard-progress-cards">
          <div className="dashboard-heading-flex">
            <svg height={radius * 2} width={radius * 2}>
              {/* Gray background ring */}
              <circle
                stroke="#eee"
                fill="transparent"
                strokeWidth={stroke}
                r={normalizedRadius}
                cx={radius}
                cy={radius}
              />
              {/* Colored progress ring */}
              <circle
                stroke={color}
                fill="transparent"
                strokeWidth={stroke}
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                r={normalizedRadius}
                cx={radius}
                cy={radius}
                style={{
                  transition: 'stroke-dashoffset 0.5s ease-out',
                  transform: 'rotate(-90deg)',
                  transformOrigin: '50% 50%',
                }}
              />
              {/* The solid colored circle in the middle with a gap */}
              <circle
                fill={color}
                r={innerCircleRadius} // Use the new, smaller radius
                cx={radius}
                cy={radius}
              />
              {/* White percentage text */}
              <text
                x="50%"
                y="50%"
                dominantBaseline="middle"
                textAnchor="middle"
                fontSize="16"
                fill="#fff"
              >
                {`${percentage}%`}
              </text>
            </svg>
            <p>
              <strong>{label}</strong>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default CircularProgressRing;