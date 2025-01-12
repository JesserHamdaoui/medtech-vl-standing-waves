import {
  Engine,
  Runner,
  Bodies,
  Composite,
  MouseConstraint,
  Mouse,
} from "matter-js";
import p5 from "p5";
import { Chain } from "@/components/Chain";

new p5((p) => {
  let engine: Engine;
  let runner: Runner;
  let chain: Chain;

  p.setup = () => {
    p.createCanvas(1200, 800);

    engine = Engine.create();
    engine.world.gravity.y = 0;

    runner = Runner.create();
    Runner.run(runner, engine);

    chain = new Chain(p, engine, 60, 400, 61);
  };

  p.draw = () => {
    p.background(189, 223, 235);
    Engine.update(engine);

    chain.display();
  };
});
