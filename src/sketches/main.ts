import p5 from "p5";
import { createSliders } from "@/components/Sliders";
import { createButtons } from "@/components/Buttons";
import { drawRulers, handleClickEvents } from "@/components/Rulers";
import {
  createStopwatch,
  toggleStopwatch,
  updateStopwatch,
} from "@/components/Stopwatch";
import { updateBalls } from "@/utils/physics";
import { drawReferenceLine } from "@/components/ReferenceLine";
import { displayMetrics } from "@/components/Metrics";
import { AMPLITUDE, FREQUENCY, DAMPING, TENSION } from "@/constants/physics";
import {
  FIXED_Y,
  BALL_RADIUS,
  BALL_COUNT,
  BALL_SPACING,
} from "@/constants/config";

const sketch = (p: p5) => {
  let balls: { x: number; y: number; vy: number; ay: number }[] = [];
  let dashedLines: { x: number; y: number }[] = [];
  let oscillating = false;
  let isPaused = false;
  let isSlowed = false;
  let showRulers = false;
  let showStopwatch = false;

  let amplitude = AMPLITUDE;
  let frequency = FREQUENCY;
  let damping = DAMPING;
  let springConstant = TENSION;
  let springFactor = 1.0;
  let dampingFactor = 1.0;

  p.setup = () => {
    p.createCanvas(800, 400);
    p.frameRate(120);

    createSliders(
      p,
      (value) => (amplitude = value),
      (value) => (frequency = value),
      // (value) => {
      //   damping = value;
      // },
      // (value) => {
      //   springConstant = value;
      // },
      (value) => (springFactor = value), // Spring normalization
      (value) => (dampingFactor = value) // Damping normalization
    );

    createButtons(
      p,
      () => (oscillating = true), // Start
      () => {
        // Reset
        oscillating = false;
        isPaused = false;
        isSlowed = false;
        p.frameRate(120);
        balls.forEach((ball) => {
          ball.y = FIXED_Y;
          ball.vy = 0;
          ball.ay = 0;
        });
      },
      () => (isPaused = !isPaused), // Pause
      () => {
        // Slow motion
        isSlowed = !isSlowed;
        p.frameRate(isSlowed ? 30 : 120);
      },
      () => (showRulers = !showRulers), // Toggle rulers
      () => {
        // Toggle stopwatch
        showStopwatch = !showStopwatch;
        if (showStopwatch) toggleStopwatch();
      }
    );

    createStopwatch(p);

    for (let i = 0; i < BALL_COUNT; i++) {
      balls.push({
        x: 100 + i * BALL_SPACING,
        y: FIXED_Y,
        vy: 0,
        ay: 0,
      });
    }

    handleClickEvents(p, dashedLines, (newDashedLines) => {
      dashedLines = newDashedLines;
    });
  };

  p.draw = () => {
    if (isPaused) return;

    const time = p.millis() / 1000; // Time in seconds
    p.background(212, 229, 240);

    if (showRulers) drawRulers(p, dashedLines);
    drawReferenceLine(p, balls, FIXED_Y);

    // Draw balls and connecting lines
    p.stroke(37, 150, 190);
    p.fill(37, 150, 190);

    balls.forEach((ball, i) => {
      if (i < balls.length - 1) {
        p.line(ball.x, ball.y, balls[i + 1].x, balls[i + 1].y);
      }
      p.ellipse(ball.x, ball.y, BALL_RADIUS);
    });

    if (oscillating) {
      updateBalls(balls, time, p, {
        amplitude,
        frequency,
        dampingCoefficient: damping,
        springConstant,
        springFactor,
        dampingFactor,
      });
    }

    displayMetrics(p, {
      amplitude,
      frequency,
      damping,
      tension: springConstant,
    });

    if (showStopwatch) updateStopwatch(p);
  };
};

export default sketch;
