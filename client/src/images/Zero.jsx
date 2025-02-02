import React from "react";

const Zero = (props) => {
  const { height, width, colour } = props;
  return (
    <svg viewBox="0 0 320 512" fill={colour} height={height} width={width}>
      <path d="M0 192C0 103.6 71.6 32 160 32s160 71.6 160 160v128c0 88.4-71.6 160-160 160S0 408.4 0 320V192zm160-96c-53 0-96 43-96 96v128c0 53 43 96 96 96s96-43 96-96V192c0-53-43-96-96-96z" />
    </svg>
  );
};

export default Zero;
