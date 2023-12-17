"use client";
import clsx from "clsx";
import React from "react";
import { Pause, Play, RotateCcw } from "react-feather";

import Card from "@/components/Card";
import VisuallyHidden from "@/components/VisuallyHidden";

import { motion } from "framer-motion";
import styles from "./CircularColorsDemo.module.css";

const COLORS = [
  { label: "red", value: "hsl(348deg 100% 60%)" },
  { label: "yellow", value: "hsl(50deg 100% 55%)" },
  { label: "blue", value: "hsl(235deg 100% 65%)" },
];

function CircularColorsDemo() {
  const [isPlaying, setIsPlaying] = React.useState(false);

  const [timeElapsed, setTimeElapsed] = React.useState(0);

  // COLORS array:
  const [selectedColor, setSelectedColor] = React.useState(COLORS[0]);

  const [intervalId, setIntervalId] = React.useState(null);

  React.useEffect(() => {
    setSelectedColor(COLORS[timeElapsed % COLORS.length]);
  }, [timeElapsed]);

  function handleTogglePlay() {
    if (!isPlaying) {
      setIsPlaying(true);
      const id = setInterval(() => {
        setTimeElapsed((timeElapsed) => timeElapsed + 1);
      }, 1000);
      setIntervalId(id);
    } else {
      setIsPlaying(false);
      clearInterval(intervalId);
      setIntervalId(null);
    }
  }

  function handleReset() {
    setTimeElapsed(0);
    if (isPlaying) {
      setIsPlaying(false);

      clearInterval(intervalId);
      setIntervalId(null);
    }
  }

  return (
    <Card as="section" className={styles.wrapper}>
      <ul className={styles.colorsWrapper}>
        {COLORS.map((color, index) => {
          const isSelected = color.value === selectedColor.value;

          return (
            <li className={styles.color} key={index}>
              {isSelected && (
                <motion.div
                  layoutId="layout-outline"
                  className={styles.selectedColorOutline}
                  style={{
                    zIndex: 2,
                  }}
                />
              )}
              <div
                className={clsx(
                  styles.colorBox,
                  isSelected && styles.selectedColorBox
                )}
                style={{
                  backgroundColor: color.value,
                }}
              >
                <VisuallyHidden>{color.label}</VisuallyHidden>
              </div>
            </li>
          );
        })}
      </ul>

      <div className={styles.timeWrapper}>
        <dl className={styles.timeDisplay}>
          <dt>Time Elapsed</dt>
          <dd>{timeElapsed}</dd>
        </dl>
        <div className={styles.actions}>
          <button onClick={handleTogglePlay}>
            {isPlaying ? (
              <>
                <Pause />
                <VisuallyHidden>Pause</VisuallyHidden>{" "}
              </>
            ) : (
              <>
                <Play />
                <VisuallyHidden>Play</VisuallyHidden>
              </>
            )}
          </button>
          <button onClick={handleReset}>
            <RotateCcw />
            <VisuallyHidden>Reset</VisuallyHidden>
          </button>
        </div>
      </div>
    </Card>
  );
}

export default CircularColorsDemo;
