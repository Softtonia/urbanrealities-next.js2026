import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import React from 'react';

const DemoProgressbar = () => {
  const percentage = 85;

  return (
    <div style={{ width: "120px", height: "120px" }}>
      <CircularProgressbar
        value={percentage}
        text={`${percentage}%`}
        background={true}
        backgroundPadding={5}
        styles={buildStyles({
          // Colors
          backgroundColor: '#4CAF50', // The green color for the whole circle
          pathColor: '#fff', // The white progress arc
          trailColor: 'transparent', // Make the rest of the circle transparent
          textColor: '#fff', // White text color

          // Text size
          textSize: '24px',
          
          // Path styling
          strokeLinecap: 'butt',
          pathTransitionDuration: 0.5,
        })}
      />
    </div>
  );
};

export default DemoProgressbar;