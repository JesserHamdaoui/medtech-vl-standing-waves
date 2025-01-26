import p from "p5";
import { FIXED_Y } from "@/constants/config";
import { MASS } from "@/constants/physics";

interface Ball {
  x: number;
  y: number;
}

interface Params {
  amplitude: number;
  frequency: number;
  damping: number;
  tension: number;
  springFactor: number;
  dampingFactor: number;
}

export const updateBalls = (
  balls: Ball[],
  time: number,
  p: p,
  params: Params
) => {
  const deltaTime = p.deltaTime / 1000; // Time step in seconds
  const {
    amplitude,
    frequency,
    damping,
    tension,
    springFactor,
    dampingFactor,
  } = params;

  const omega = 2 * Math.PI * frequency; // Angular frequency
  const convertedAmplitude = amplitude * 50; // Adjust amplitude

  // Update first ball (based on simple sine wave)
  balls[0].y = FIXED_Y + convertedAmplitude * Math.sin(omega * time);

  // Update subsequent balls based on oscillatory motion, tension, and damping
  for (let i = 1; i < balls.length; i++) {
    const ball = balls[i];

    // Apply tension and damping adjustments
    const tensionForce = (tension * i * deltaTime * deltaTime) / MASS;
    const dampingForce = damping * dampingFactor * deltaTime * ball.y;

    // Calculate new position for each ball using tension and damping
    ball.y =
      FIXED_Y + convertedAmplitude * Math.sin(omega * time - i * springFactor);
    ball.y -= dampingForce; // Apply damping

    // Optionally use a more realistic physical model for each ball here
  }
};
