import { Composite, Engine, Constraint, Body } from "matter-js";
import p5 from "p5";
import { Ball } from "@/components/Ball";

export class Chain {
  p: p5;
  count: number;
  ballRadius: number;
  distance: number;
  balls: Ball[];
  constraints: Constraint[];
  firstBall: Ball | null;

  constructor(
    p: p5,
    engine: Engine,
    x: number,
    y: number,
    count = 10,
    ballRadius = 8,
    distance = 2
  ) {
    this.p = p;
    this.count = count;
    this.ballRadius = ballRadius;
    this.distance = distance;

    this.balls = [];
    this.constraints = [];
    this.firstBall = null;

    let prevBall: Ball | null = null;
    for (let i = 0; i < this.count; i++) {
      const ball = new Ball(
        p,
        engine,
        x + i * (2 * this.ballRadius + this.distance),
        y,
        this.ballRadius,
        i % 10 === 0 ? [37, 150, 190] : [190, 77, 37]
      );

      this.balls.push(ball);
      Composite.add(engine.world, ball.body);

      if (prevBall) {
        const constraint = Constraint.create({
          bodyA: prevBall.body,
          pointA: { x: 0, y: 10 },
          bodyB: ball.body,
          pointB: { x: 0, y: -10 },
          stiffness: 0.6,
        });

        this.constraints.push(constraint);
        Composite.add(engine.world, constraint);
      } else {
        this.firstBall = ball;
        Body.setStatic(ball.body, true);
      }

      prevBall = ball;
    }
    prevBall && Body.setStatic(prevBall.body, true);
  }

  display() {
    for (const constraint of this.constraints) {
      if (constraint.bodyA && constraint.bodyB) {
        const posA = constraint.bodyA.position;
        const posB = constraint.bodyB.position;

        this.p.stroke(190, 77, 37);
        this.p.strokeWeight(2);
        this.p.line(posA.x, posA.y, posB.x, posB.y);
      }
    }
    for (const ball of this.balls) {
      ball.display();
    }
  }
}
