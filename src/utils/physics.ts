import p5 from "p5";
import { MASS } from "@/constants/physics";
import { FIXED_Y } from "@/constants/config";

interface Ball {
  x: number;
  y: number;
  vy: number;
  acceleration: number;
}

interface SimulationParams {
  amplitude: number;
  frequency: number;
  damping: number;
  tension: number;
}

export const updateBalls = (
  balls: Ball[],
  params: SimulationParams,
  oscillating: boolean,
  p: p5
) => {
  const { amplitude, frequency, damping, tension } = params;

  if (oscillating) {
    balls[0].y = FIXED_Y + amplitude * p.sin(p.frameCount * frequency);
  }

  for (let i = 1; i < balls.length; i++) {
    const current = balls[i];
    const prev = balls[i - 1];
    const next = i < balls.length - 1 ? balls[i + 1] : null;

    const forcePrev = tension * (prev.y - current.y);
    const forceNext = next ? tension * (next.y - current.y) : 0;
    const dampingForce = -damping * current.vy;
    const netForce = forcePrev + forceNext + dampingForce;

    current.acceleration = netForce / MASS;
    current.vy += current.acceleration;
    current.y += current.vy;
  }

  const lastBall = balls[balls.length - 1];
  lastBall.y = FIXED_Y;
  lastBall.vy = 0;
  lastBall.acceleration = 0;
};
