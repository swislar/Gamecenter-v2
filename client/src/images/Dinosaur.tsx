import { transform } from "framer-motion";
import React from "react";

interface DinosaurProps {
  height?: number;
  width?: number;
  colour?: string;
  id?: string;
  className?: string;
  reflectX?: boolean;
  style?: React.CSSProperties;
}

export const Dinosaur: React.FC<DinosaurProps> = ({
  height = 2500,
  width = 2328,
  colour = "grey",
  id = "",
  className = "",
  reflectX = false,
  style = {},
}) => {
  return (
    <svg
      viewBox="13.848000000000003 0 283.6449999999999 305.4"
      xmlns="http://www.w3.org/2000/svg"
      fill={colour}
      height={height}
      width={width}
      id={id}
      className={className}
      style={{ ...style, transform: reflectX ? "scaleX(-1)" : "scaleX(1)" }}
    >
      <g fill="none" fill-rule="evenodd">
        <path
          d="M269.352 91.664h-42.436V80.04h70.577v-65.73h-14.294V0H168.4v14.309h-13.848v91.664H140.26v13.861h-20.994v14.309H98.271v14.308H83.977v13.862H58.069v-14.309H44.222v-13.861H29.928v-28.17h-16.08v86.746h13.847v14.308h14.293v13.862h13.848v14.308H70.13v13.862h13.847v56.34h30.375V289.3h-13.848V277.23h13.848v-13.862h14.294V249.06h11.613v14.308h14.294V305.4h30.375V289.3h-14.294v-54.104h14.294V220.89h13.847v-21.016h14.294v-49.186h11.614v13.862h16.527v-30.406h-28.14v-25.934h56.282z"
          fill="#666"
        />
        <path d="M182.248 20.569h16.974V37.56h-16.974z" fill="#fff" />
      </g>
    </svg>
  );
};
