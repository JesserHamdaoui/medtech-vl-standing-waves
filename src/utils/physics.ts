export const updateBalls = (
  balls: { x: number; y: number; vy: number; acceleration: number }[]
) => {
  // First ball updates with oscillating equation
  balls[0].y = FIXED_Y + AMPLITUDE * Math.sin(p.frameCount * FREQUENCY);

  for (let i = 1; i < balls.length; i++) {
    const current = balls[i];
    const prev = balls[i - 1];
    const next = i < balls.length - 1 ? balls[i + 1] : null;

    const forcePrev = TENSION * (prev.y - current.y);
    const forceNext = next ? TENSION * (next.y - current.y) : 0;
    const dampingForce = -DAMPING * current.vy;
    const netForce = forcePrev + forceNext + dampingForce;

    current.acceleration = netForce / MASS;
    current.vy += current.acceleration;
    current.y += current.vy;
  }

  // Last ball is fixed
  const lastBall = balls[balls.length - 1];
  lastBall.y = FIXED_Y;
  lastBall.vy = 0;
  lastBall.acceleration = 0;
};

export const resetSimulation = (balls: { y: number }[], fixedY: number) => {
  balls.forEach((ball) => (ball.y = fixedY));
};
