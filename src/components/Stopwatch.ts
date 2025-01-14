import p5 from "p5";
import { createDiv, createButton } from "@/utils/helpers";

let isPaused = false;
let stopwatchTime = 0;

export const setupStopwatch = (p: p5) => {
  createButton("pauseButton", "Pause", () => {
    isPaused = true;
  });
  createButton("continueButton", "Continue", () => {
    isPaused = false;
  });
  createButton("resetButton", "Reset", () => {
    stopwatchTime = 0;
    isPaused = true;
  });
};

export const drawStopwatch = (p: p5) => {
  if (!isPaused) {
    stopwatchTime += p.deltaTime;
  }
  const seconds = Math.floor(stopwatchTime / 1000);
  const milliseconds = Math.floor(stopwatchTime % 1000);
  createDiv("stopwatch", `Stopwatch: ${seconds}.${milliseconds} ms`);
};
