import React from "react";

const Hashtag = (props) => {
  const { height, width, colour } = props;
  return (
    <svg fill={colour} viewBox="0 0 24 24" height={height} width={width}>
      <path
        fillRule="evenodd"
        d="M8 4v4H4v2h4v4H4v2h4v4h2v-4h4v4h2v-4h4v-2h-4v-4h4V8h-4V4h-2v4h-4V4H8zm6 10v-4h-4v4h4z"
        clipRule="evenodd"
      />
    </svg>
  );
};

export default Hashtag;
