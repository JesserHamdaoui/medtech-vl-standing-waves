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
  let balls: { x: number; y: number; vy: number; acceleration: number }[] = [];
  let dragging = false;
  let oscillating = false;
  let isPaused = false;
  let isSlowed = false;
  let showRulers = false;
  let showStopwatch = false;

  let dashedLines: { x: number; y: number }[] = [];

  // Oscillation properties
  let amplitude = AMPLITUDE;
  let frequency = FREQUENCY;
  let damping = DAMPING;
  let tension = TENSION;

  p.setup = () => {
    p.createCanvas(800, 400);
    p.frameRate(120);

    // Setup sliders
    createSliders(
      p,
      (value) => (amplitude = value),
      (value) => (frequency = value),
      (value) => (damping = value),
      (value) => (tension = value)
    );

    // Button actions
    const onStart = () => {
      oscillating = true;
    };

    const onReset = () => {
      oscillating = false;
      isPaused = false;
      isSlowed = false;
      p.frameRate(120);
      balls.forEach((ball) => {
        ball.y = FIXED_Y;
        ball.vy = 0;
        ball.acceleration = 0;
      });
    };

    const onPause = () => {
      isPaused = !isPaused;
    };

    const onSlowMotion = () => {
      isSlowed = !isSlowed;
      p.frameRate(isSlowed ? 30 : 120);
    };

    const onRulers = () => {
      showRulers = !showRulers;
    };

    createStopwatch(p);
    const onStopwatch = () => {
      showStopwatch = !showStopwatch;
      if (showStopwatch) {
        toggleStopwatch();
      }
    };

    // Setup buttons
    createButtons(
      p,
      onStart,
      onReset,
      onPause,
      onSlowMotion,
      onRulers,
      onStopwatch
    );

    // Initialize balls
    for (let i = 0; i < BALL_COUNT; i++) {
      balls.push({
        x: 100 + i * BALL_SPACING,
        y: FIXED_Y,
        vy: 0,
        acceleration: 0,
      });
    }

    // Handle mouse click events (left-click for new line, right-click for removing lines)
    handleClickEvents(p, dashedLines, (newDashedLines) => {
      dashedLines = newDashedLines;
    });
  };

  p.draw = () => {
    if (isPaused) return;

    p.background(240);

    if (showRulers) {
      drawRulers(p, dashedLines); // Draw rulers and any dashed lines
    }

    drawReferenceLine(p, balls, FIXED_Y);

    // Draw springs and balls
    p.stroke(50);
    p.fill(150);
    for (let i = 0; i < balls.length; i++) {
      if (i < balls.length - 1) {
        p.line(balls[i].x, balls[i].y, balls[i + 1].x, balls[i + 1].y);
      }
      p.ellipse(balls[i].x, balls[i].y, BALL_RADIUS);
    }

    updateBalls(
      balls,
      { amplitude, frequency, damping, tension },
      oscillating,
      p
    );

    displayMetrics(p, { amplitude, frequency, damping, tension });

    if (showStopwatch) {
      updateStopwatch(p);
    }
  };

  p.mousePressed = () => {
    if (p.dist(p.mouseX, p.mouseY, balls[0].x, balls[0].y) < BALL_RADIUS) {
      dragging = true;
    }
  };

  p.mouseReleased = () => {
    dragging = false;
  };
};

export default sketch;
