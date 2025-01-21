const CircularProgressBar = ({percent, size=3, strokeWidth=0.25}) => {
  const radius = size/2 - strokeWidth;
  const strokeColor= percent >= 75 ? 'green' : percent >= 50 ? 'yellow' : 'red';
  return (
    <div>
      <svg width={`${size}vw`} height={`${size}vw`}>
        <circle
          r={`${radius}vw`}
          fill="black"
          cx={`${size/2}vw`}
          cy={`${size/2}vw`}
          stroke="white"
          strokeWidth={`${strokeWidth}vw`}
        />
        <circle
          r={`${radius}vw`}
          fill="none"
          cx={`${size/2}vw`}
          cy={`${size/2}vw`}
          stroke={strokeColor}
          strokeWidth={`${strokeWidth}vw`}
          strokeDasharray={`${2*radius*Math.PI}vw`}
          strokeDashoffset={`${2*radius*Math.PI-(percent/100*2*radius*Math.PI)}vw`}
          transform="rotate(-90)"
          style={{transformOrigin: 'center'}}
          strokeLinecap="round"
        />
        <text x={`${size/2}vw`} y={`${size/2}vw`} fill="white" fontSize={`1.2vw`} alignmentBaseline="middle" textAnchor="middle">{percent}</text>
      </svg>
    </div>
  );
};

export default CircularProgressBar;
