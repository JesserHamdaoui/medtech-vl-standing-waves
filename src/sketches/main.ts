import p5 from "p5";
import { WaveModel } from "@/models/WaveModel";
import { ReferenceLine } from "@/components/ReferenceLine";
import { drawRulers, handleRulerInteractions } from "@/components/Rulers";
import {
  FIXED_Y,
  BALL_RADIUS,
  BALL_COUNT,
  BALL_SPACING,
} from "@/constants/config";
import { TimeSpeed } from "@/types/TimeSpeed";
import { initControlButtons, initParameters } from "@/utils/helpers";

// DOM setup for title and logo
const img = document.createElement("img");
img.src = "@/../assets/medtech-logo.png";
img.style.width = "100px";

const title = document.createElement("h1");
title.setAttribute("id", "title");
title.innerHTML = "Standing Wave";

const titleContainer = document.createElement("div");
titleContainer.appendChild(img);
titleContainer.appendChild(title);

titleContainer.style.position = "absolute";
titleContainer.style.top = "10px";
titleContainer.style.left = "10px";
titleContainer.style.display = "flex";
titleContainer.style.alignItems = "center";
titleContainer.style.gap = "10px";

document.body.appendChild(titleContainer);

// Main sketch
const sketch = (p: p5) => {
  let model: WaveModel;
  let balls: { x: number; y: number }[] = [];
  let referenceLines: ReferenceLine[] = [];
  let interactionHandler: ReturnType<typeof handleRulerInteractions>;

  p.setup = () => {
    p.createCanvas(1000, 400);
    p.frameRate(120);

    model = new WaveModel();

    // Initialize balls positions
    balls = Array.from({ length: BALL_COUNT }, (_, i) => ({
      x: 100 + i * BALL_SPACING,
      y: FIXED_Y,
    }));

    // Initialize ruler interactions
    interactionHandler = handleRulerInteractions(
      p,
      referenceLines,
      (newLines) => {
        referenceLines = newLines;
      }
    );

    // Create UI controls
    const controlContainer = p.createDiv();
    controlContainer.addClass("control-container");

    initParameters(p, {
      onAmplitudeChange: (value) => (model.amplitudeProperty.value = value),
      onFrequencyChange: (value) => (model.frequencyProperty.value = value),
      onTensionChange: (value) => (model.tensionProperty.value = value),
      onDampingChange: (value) => (model.dampingProperty.value = value),
      onEndModeChange: () => model.toggleEndMode(),
    });

    initControlButtons(p, {
      onPause: () =>
        (model.isPlayingProperty.value = !model.isPlayingProperty.value),
      onRestart: () => model.manualRestart(),
      onSlow: () => {
        model.timeSpeedProperty.value =
          model.timeSpeedProperty.value === TimeSpeed.NORMAL
            ? TimeSpeed.SLOW
            : TimeSpeed.NORMAL;
        p.frameRate(
          model.timeSpeedProperty.value === TimeSpeed.SLOW ? 30 : 120
        );
      },
    });

    // Listen for model updates
    model.yNowChangedEmitter.addListener(() => {
      const positions = model.getPositions();
      balls.forEach((ball, i) => {
        ball.y = positions[i];
      });
    });
  };

  p.draw = () => {
    const dt = p.deltaTime / 1000;
    model.step(dt);
    p.background(212, 229, 240);

    // Draw reference line
    // if (model.referenceLineVisibleProperty.value) {
    //   drawReferenceLine(p, FIXED_Y);
    // }

    // Draw rulers with active line
    if (model.rulersVisibleProperty.value) {
      drawRulers(p, referenceLines, interactionHandler.getActiveLine());
    }

    // Draw wave
    p.stroke(37, 150, 190);
    p.fill(37, 150, 190);

    balls.forEach((ball, i) => {
      if (i < balls.length - 1) {
        p.line(ball.x, ball.y, balls[i + 1].x, balls[i + 1].y);
      }
      p.ellipse(ball.x, ball.y, BALL_RADIUS);
    });
  };
};

export default sketch;
