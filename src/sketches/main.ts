import { createSliders } from "../components/Sliders";
import { createButtons } from "../components/Buttons";
import { drawRulers } from "../components/Rulers";
import { drawStopwatch } from "../components/Stopwatch";
import { updateBalls, resetSimulation } from "../utils/physics";
import { drawDashedLine, displayMetrics } from "../utils/drawing";
import { BALL_COUNT, FIXED_Y, BALL_RADIUS } from "../constants/physics";

const sketch = (p: p5) => {
  let balls: { x: number; y: number; vy: number; acceleration: number }[] = [];
  let dragging = false;
  let oscillating = false;

  p.setup = () => {
    p.createCanvas(800, 400);
    p.frameRate(120);

    // Setup Sliders and Buttons
    createSliders(p);
    createButtons(
      p,
      () => {
        oscillating = true;
      },
      resetSimulation.bind(null, balls, FIXED_Y)
    );

    // Initialize balls
    for (let i = 0; i < BALL_COUNT; i++) {
      balls.push({ x: 100 + i * 15, y: FIXED_Y, vy: 0, acceleration: 0 });
    }
  };

  p.draw = () => {
    p.background(240);

    // Drawing the simulation
    drawDashedLine(p, balls, FIXED_Y);
    if (oscillating) updateBalls(balls);
    displayMetrics(p, balls);
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
