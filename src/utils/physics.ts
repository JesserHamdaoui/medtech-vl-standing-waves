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

const MAX_AMPLITUDE = 200; // Optionally limit amplitude to prevent runaway energy.

export const updateBalls = (
  balls: Ball[],
  params: SimulationParams,
  oscillating: boolean,
  p: p5
) => {
  const { amplitude, frequency, damping, tension } = params;
  const convertedAmplitude = amplitude * 50; // Convert amplitude to pixels

  // Force damping to 0 only if oscillating parameter is off
  const dampedDamping = oscillating ? damping : 0;

  // Apply controlled oscillation to the first ball
  if (oscillating) {
    balls[0].y =
      FIXED_Y +
      Math.min(convertedAmplitude, MAX_AMPLITUDE) *
        p.sin(p.frameCount * frequency);
  }

  // Iterate over the balls and apply tension and damping forces
  for (let i = 1; i < balls.length; i++) {
    const current = balls[i];
    const prev = balls[i - 1];
    const next = i < balls.length - 1 ? balls[i + 1] : null;

    // Calculate the forces (tension, damping, and net force)
    const forcePrev = tension * (prev.y - current.y);
    const forceNext = next ? tension * (next.y - current.y) : 0;
    const dampingForce = -dampedDamping * current.vy; // Only apply damping when not oscillating
    const netForce = forcePrev + forceNext + dampingForce;

    // Calculate acceleration and update velocity and position using more precise integration
    current.acceleration = netForce / MASS;
    current.vy += current.acceleration;
    current.y += current.vy;

    // Check for numerical stability, and limit the position to prevent excessive growth
    current.y = Math.min(Math.max(current.y, FIXED_Y - 500), FIXED_Y + 500); // Example range
  }

  // Last ball is fixed at the position
  const lastBall = balls[balls.length - 1];
  lastBall.y = FIXED_Y;
  lastBall.vy = 0;
  lastBall.acceleration = 0;
};
