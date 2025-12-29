"use client";

import { motion } from "framer-motion";

export default function AnimatedFormIcon() {
  return (
    <motion.div
      className="w-24 h-24 sm:w-32 sm:h-32"
      animate={{
        rotate: 360,
        y: [0, -12, 0],
      }}
      transition={{
        rotate: {
          repeat: Infinity,
          duration: 20,
          ease: "linear",
        },
        y: {
          repeat: Infinity,
          duration: 4,
          ease: "easeInOut",
        },
      }}
    >
      <svg
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Card background */}
        <rect
          x="18"
          y="14"
          width="84"
          height="92"
          rx="12"
          fill="#F59E0B"
          opacity="0.12"
        />

        {/* Header */}
        <motion.path
          fill="#F59E0B"
          animate={{
            d: [
              "M30 32 H90 V40 H30 Z",
              "M30 30 H88 V42 H30 Z",
              "M30 32 H90 V40 H30 Z",
            ],
          }}
          transition={{
            repeat: Infinity,
            duration: 3,
            ease: "easeInOut",
          }}
        />

        {/* Input field 1 */}
        <motion.path
          fill="#FDBA74"
          animate={{
            d: [
              "M30 48 H75 V54 H30 Z",
              "M30 48 H82 V54 H30 Z",
              "M30 48 H75 V54 H30 Z",
            ],
          }}
          transition={{
            repeat: Infinity,
            duration: 4,
            ease: "easeInOut",
          }}
        />

        {/* Input field 2 */}
        <motion.path
          fill="#FDBA74"
          animate={{
            d: [
              "M30 60 H85 V66 H30 Z",
              "M30 60 H78 V66 H30 Z",
              "M30 60 H85 V66 H30 Z",
            ],
          }}
          transition={{
            repeat: Infinity,
            duration: 5,
            ease: "easeInOut",
          }}
        />

        {/* Checkbox */}
        <rect
          x="30"
          y="78"
          width="10"
          height="10"
          rx="2"
          stroke="#F59E0B"
          strokeWidth="2"
        />

        {/* Checkbox label morph */}
        <motion.path
          fill="#FDBA74"
          animate={{
            d: [
              "M46 80 H80 V86 H46 Z",
              "M46 80 H70 V86 H46 Z",
              "M46 80 H80 V86 H46 Z",
            ],
          }}
          transition={{
            repeat: Infinity,
            duration: 4.5,
            ease: "easeInOut",
          }}
        />
      </svg>
    </motion.div>
  );
}
