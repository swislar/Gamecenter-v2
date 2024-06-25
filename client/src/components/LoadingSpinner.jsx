import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { Stack, CircularProgress } from "@mui/material";
import { alpha } from "@mui/material/styles";
import { getIndex, useFlubber } from "../use-flubber.ts";
import {
  star,
  heart,
  hand,
  plane,
  lightning,
  note,
  two,
  zero,
  four,
  eight,
  hashtag,
  cross,
  circle,
} from "../images/paths.ts";

const LoadingDot = {
  display: "block",
  width: "1rem",
  height: "1rem",
  backgroundColor: "black",
  borderRadius: "50%",
};

const LoadingContainer = {
  width: "10rem",
  height: "5rem",
  display: "flex",
  justifyContent: "space-around",
};

const ContainerVariants = {
  initial: {
    transition: {
      staggerChildren: 0.4,
      repeat: Infinity,
      repeatDelay: 2,
      ease: "easeIn",
    },
  },
  animate: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const DotVariants = {
  initial: {
    y: "0%",
  },
  animate: {
    y: "100%",
  },
};

const DotTransition = {
  duration: 1,
  // yoyo: Infinity,
  repeat: Infinity,
  repeatDelay: 2,
  ease: "easeInOut",
};

const colors = [
  "#00cc88",
  "#0099ff",
  "#8855ff",
  "#ff0055",
  "#ee4444",
  "#ffcc00",
  "#00cc88",
];

// const paths = [lightning, hand, plane, heart, note, star, lightning];
const paths = [two, zero, four, eight, hashtag, cross, two];

export default function LoadingSpinner({ onClick }) {
  const greyBlueBase = "#a6b5d0";
  const greyBlueMain = alpha(greyBlueBase, 0.7);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      className="flex-col bg-slate-700 bg-opacity-50"
    >
      <Stack sx={{ color: greyBlueBase }} spacing={2} direction="row">
        <CircularProgress color="inherit" size={50} />
      </Stack>
      <button
        className="mt-3 px-1 rounded-md border-2 border-auto menu-button text-sm"
        onClick={onClick}
      >
        Cancel
      </button>
    </div>
  );
}
