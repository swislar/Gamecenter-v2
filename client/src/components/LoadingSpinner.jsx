import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Stack, CircularProgress } from "@mui/material";
import { alpha, duration } from "@mui/material/styles";
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

const dotContainer = {
  initial: {
    opacity: 0,
    transition: {
      staggerChildren: 0.3,
    },
  },
  animate: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      repeatDelay: 2,
    },
  },
};

const dotChildren = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
};

// const paths = [lightning, hand, plane, heart, note, star, lightning];
const paths = [two, zero, four, eight, hashtag, cross, two];

export default function LoadingSpinner({ onClick = "" }) {
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
      <Stack
        sx={{ color: greyBlueBase }}
        spacing={2}
        direction="column"
        alignItems={"center"}
        className="z-10 bg-sky-900 bg-opacity-90 px-1 py-2 rounded-lg"
      >
        <CircularProgress color="inherit" size={50} />
        <div className="flex flex-col items-center text-xs">
          <motion.p>
            Loading{" "}
            <motion.span
              variants={dotContainer}
              initial="initial"
              animate="animate"
              exit="initial"
              key="loading-dots"
            >
              {Array.from({ length: 3 }, (_, index) => {
                return (
                  <motion.span
                    variants={dotChildren}
                    transition={{
                      duration: 1,
                      repeatType: "mirror",
                      repeat: Infinity,
                    }}
                    style={{ display: "inline-block", width: "0.5em" }}
                    key={index}
                    className="text-xl"
                  >
                    .
                  </motion.span>
                );
              })}
            </motion.span>
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            Connecting to server{" "}
            <motion.span
              variants={dotContainer}
              initial="initial"
              animate="animate"
              exit="initial"
              key="loading-dots"
            >
              {Array.from({ length: 3 }, (_, index) => {
                return (
                  <motion.span
                    variants={dotChildren}
                    transition={{
                      duration: 1,
                      repeatType: "mirror",
                      repeat: Infinity,
                    }}
                    style={{ display: "inline-block", width: "0.5em" }}
                    key={index}
                    className="text-xl"
                  >
                    .
                  </motion.span>
                );
              })}
            </motion.span>
          </motion.p>
        </div>
        {onClick && (
          <button
            className="px-1 rounded-md border-2 border-auto menu-button text-sm text-slate-200"
            onClick={onClick}
          >
            Cancel
          </button>
        )}
      </Stack>
    </div>
  );
}
