import { Body, Bodies, Composite, Engine } from "matter-js";
import p5 from "p5";

export class Ball {
  body: Body;
  p: p5;
  radius: number;
  color: [number, number, number];

  constructor(
    p: p5,
    engine: Engine,
    x: number,
    y: number,
    radius = 30,
    color: [number, number, number] = [190, 77, 37]
  ) {
    this.p = p;
    this.radius = radius;
    this.color = color;

    this.body = Bodies.circle(x, y, this.radius, {
      restitution: 0.8,
      friction: 0.5,
      density: 0.001,
    });

    Composite.add(engine.world, this.body);
  }

  display() {
    const pos = this.body.position;
    const angle = this.body.angle;

    this.p.push();
    this.p.translate(pos.x, pos.y);
    this.p.rotate(angle);
    this.p.fill(...this.color);
    this.p.noStroke();
    this.p.ellipse(0, 0, this.radius * 2);
    this.p.pop();
  }
}
