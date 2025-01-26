import p from "p5";
import { FIXED_Y } from "@/constants/config";
import { MASS } from "@/constants/physics";

interface Ball {
  x: number;
  y: number;
  vy: number;
  ay: number;
}

interface Params {
  amplitude: number;
  frequency: number;
  dampingCoefficient: number;
  springConstant: number;
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
    dampingCoefficient,
    springConstant,
    springFactor,
    dampingFactor,
  } = params;

  const tensionContribution =
    (springFactor * springConstant * deltaTime * deltaTime) / MASS; // Scaled tension force
  const dampingContribution =
    (dampingFactor * 2 * dampingCoefficient * deltaTime) / MASS; // Scaled damping force
  const convertedAmplitude = amplitude * 50;

  // Update the first ball based on oscillation
  const firstBall = balls[0];
  const omega = 2 * Math.PI * frequency; // Angular frequency
  firstBall.y = FIXED_Y + convertedAmplitude * Math.sin(omega * time); // Oscillating motion
  firstBall.vy = omega * convertedAmplitude * Math.cos(omega * time); // Velocity of first ball
  firstBall.ay = 0; // No acceleration directly applied

  // Update subsequent balls, keeping the last ball fixed
  for (let i = 1; i < balls.length; i++) {
    const ball = balls[i];

    // Skip updates for the last ball
    if (i === balls.length - 1) {
      ball.y = FIXED_Y; // Ensure it stays fixed
      ball.vy = 0; // No velocity for the fixed ball
      ball.ay = 0; // No acceleration for the fixed ball
      continue;
    }

    const prevBall = balls[i - 1];
    const nextBall = balls[i + 1];

    // Calculate the forces acting on the ball
    const forceFromPrev = tensionContribution * (prevBall.y - ball.y);
    const forceFromNext =
      i < balls.length - 1 ? tensionContribution * (nextBall.y - ball.y) : 0;

    const dampingForce = dampingContribution * ball.vy; // Independent of tension

    // Compute acceleration based on net forces
    ball.ay = (forceFromPrev + forceFromNext - dampingForce) / MASS;

    // Update velocity and position
    ball.vy += ball.ay * deltaTime;
    ball.y += ball.vy * deltaTime;
  }
};
