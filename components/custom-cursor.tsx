"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { ArrowUpRightIcon, DownloadIcon, HandPointingIcon, HandGrabbingIcon } from "@phosphor-icons/react";

export function CustomCursor() {
  const [cursorType, setCursorType] = useState<string | null>(null);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 40, stiffness: 800, mass: 0.1 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);

      // Check what we're hovering over
      const target = e.target as HTMLElement;
      const cursorElement = target.closest('[data-cursor]') as HTMLElement;
      if (cursorElement) {
        setCursorType(cursorElement.dataset.cursor || null);
      } else {
        setCursorType(null);
      }
    };

    window.addEventListener("mousemove", moveCursor);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
    };
  }, [cursorX, cursorY]);

  let cursorWidth = 24;
  let cursorHeight = 24;
  let cursorRadius = "50%";

  switch (cursorType) {
    case "link":
    case "download":
    case "view":
      cursorWidth = 48;
      cursorHeight = 48;
      break;
    case "pointer":
      cursorWidth = 0;
      cursorHeight = 0;
      cursorRadius = "0px"; // squircle
      break;
    case "pointer-invert":
      cursorWidth = 0;
      cursorHeight = 0;
      cursorRadius = "0px"; // squircle
      break;
    case "social":
      cursorWidth = 48;
      cursorHeight = 48;
      cursorRadius = "50%";
      break;
    case "design":
      cursorWidth = 48;
      cursorHeight = 48;
      cursorRadius = "30px";
      break;
    case 'none':
      cursorWidth = 0;
      cursorHeight = 0;
      cursorRadius = "0px"; // squircle
      break;
  }

  const isSolid = cursorType && cursorType !== "view" && cursorType !== "design";

  return (
    <motion.div
      className={`pointer-events-none fixed left-0 top-0 z-[10000] hidden md:flex items-center justify-center transition-colors duration-300 ${
        isSolid
          ? "bg-foreground text-background"
          : "border border-foreground/50 backdrop-invert mix-blend-difference"
      }`}
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
        translate: "-50% -50%",
        borderRadius: cursorRadius,
      }}
      animate={{
        width: cursorWidth,
        height: cursorHeight,
      }}
    >
      <AnimatePresence mode="wait">
        {cursorType === "link" && (
          <motion.div key="link" initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0, opacity: 0 }}>
            <ArrowUpRightIcon weight="bold" size={20} />
          </motion.div>
        )}
        {cursorType === "download" && (
          <motion.div key="download" initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0, opacity: 0 }}>
            <DownloadIcon weight="bold"  size={20} />
          </motion.div>
        )}
        {cursorType === "pointer" && (
          <motion.div key="pointer" initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0, opacity: 0 }}>
            <HandPointingIcon weight="fill" size={30} className="rotate-[-10deg] text-foreground" />
          </motion.div>
        )}
        {cursorType === "pointer-invert" && (
          <motion.div key="pointer" initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0, opacity: 0 }}>
            <HandPointingIcon weight="fill" size={30} className="rotate-[-10deg] text-white dark:text-black" />
          </motion.div>
        )}
        {cursorType === "grab" && (
          <motion.div key="pointer" initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0, opacity: 0 }}>
            <HandGrabbingIcon weight="fill" size={30} className="rotate-[-10deg] text-foreground" />
          </motion.div>
        )}
        {cursorType === "social" && (
          <motion.div key="social" initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0, opacity: 0 }} className="text-xl leading-none pb-0.5">
            👀
          </motion.div>
        )}
        {cursorType === "design" && (
          <motion.div key="design" initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0, opacity: 0 }} className="text-xl leading-none pb-0.5">
            <HandPointingIcon weight="fill" size={30} className="rotate-[-10deg] text-foreground" />
          </motion.div>
        )}
        {cursorType === "none" && (
          <motion.div key="design" initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0, opacity: 0 }} className="text-xl leading-none pb-0.5">
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
