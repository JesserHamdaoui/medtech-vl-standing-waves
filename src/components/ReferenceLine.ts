import p5 from "p5";

export const drawReferenceLine = (
  p: p5,
  balls: { x: number; y: number }[],
  fixedY: number
) => {
  p.stroke(150);
  p.strokeWeight(2);
  p.drawingContext.setLineDash([5, 15]);

  // Reference line across the width of the canvas
  p.line(0, fixedY, p.width, fixedY);
  for (let i = 0; i < balls.length - 1; i++) {
    p.line(balls[i].x, balls[i].y, balls[i + 1].x, balls[i + 1].y);
  }

  p.drawingContext.setLineDash([]);
};
