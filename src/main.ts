import {
  Engine,
  Runner,
  Bodies,
  Composite,
  MouseConstraint,
  Mouse,
} from "matter-js";
import p5 from "p5";
import { Ball } from "./components/Ball";

new p5((p) => {
  let engine: Engine;
  let runner: Runner;
  let ball: Ball;

  p.setup = () => {
    p.createCanvas(1200, 800);

    engine = Engine.create();
    runner = Runner.create();
    Runner.run(runner, engine);

    ball = new Ball(p, engine, 600, 400);
  };

  p.draw = () => {
    p.background(167, 213, 229);
    Engine.update(engine);

    ball.display();
  };
});
