import "@/styles/global.css";
import {
  Engine,
  Runner,
  Bodies,
  Composite,
  MouseConstraint,
  Mouse,
} from "matter-js";

import p5 from "p5";

new p5((p) => {
  let engine;
  let runner;

  p.setup = () => {
    p.createCanvas(1200, 800);
    engine = Engine.create();
    runner = Runner.create();
    Runner.run(runner, engine);
  };

  p.draw = () => {
    p.background(167, 213, 229);
  };
});
