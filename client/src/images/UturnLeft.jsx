import React from "react";

const UturnLeft = (props) => {
  const { height, width, strokeWidth } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={strokeWidth || 1.5}
      stroke="currentColor"
      className="size-6"
      height={height}
      width={width}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
      />
    </svg>
  );
};

export default UturnLeft;
