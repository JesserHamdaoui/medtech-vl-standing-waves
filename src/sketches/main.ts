import p5 from "p5";
import { WaveModel } from "@/models/WaveModel";
import { DASH_PATTERN, ReferenceLine } from "@/components/ReferenceLine";
import { drawRulers, handleRulerInteractions } from "@/components/Rulers";
import {
  FIXED_Y,
  BALL_RADIUS,
  BALL_COUNT,
  BALL_SPACING,
} from "@/constants/config";
import { EndType } from "@/types/EndType";
import { TimeSpeed } from "@/types/TimeSpeed";
import { initControlButtons, initParameters } from "@/utils/helpers";
import { Stopwatch } from "@/components/Stopwatch";

// DOM setup for title and logo
const img = document.createElement("img");
img.src = "@/../assets/medtech-logo.png";
img.style.width = "100px";
img.style.opacity = "0"; // Start with invisible logo

const title = document.createElement("h1");
title.setAttribute("id", "title");
title.innerHTML = "Standing Wave";
title.style.opacity = "0"; // Start with invisible title

const titleContainer = document.createElement("div");
titleContainer.appendChild(img);
titleContainer.appendChild(title);

titleContainer.style.position = "absolute";
titleContainer.style.zIndex = "10000";
titleContainer.style.top = "50%"; // Start in the center
titleContainer.style.left = "50%";
titleContainer.style.transform = "translate(-50%, -50%)";
titleContainer.style.display = "flex";
titleContainer.style.alignItems = "center";
titleContainer.style.gap = "10px";
titleContainer.style.transition = "all 1.5s ease, opacity 1.5s ease";

document.body.appendChild(titleContainer);

// White background overlay
const overlay = document.createElement("div");
overlay.style.position = "fixed";
overlay.style.top = "0";
overlay.style.left = "0";
overlay.style.width = "100%";
overlay.style.height = "100%";
overlay.style.backgroundColor = "rgb(230,236,238)";
overlay.style.zIndex = "9999";
overlay.style.transition = "opacity 1.5s ease";
document.body.appendChild(overlay);

// Animation function
const animateLogo = () => {
  // Fade in logo and title
  setTimeout(() => {
    img.style.opacity = "1";
    title.style.opacity = "1";
  }, 500);

  // Move to final position and fade out overlay
  setTimeout(() => {
    titleContainer.style.top = "170px";
    titleContainer.style.left = "240px";
    titleContainer.style.transform = "translate(0, 0)";
    overlay.style.opacity = "0";
  }, 1500);

  // Remove overlay after animation
  setTimeout(() => {
    document.body.removeChild(overlay);
  }, 3000);
};

// Start animation on page load
window.onload = animateLogo;

// Main sketch
const sketch = (p: p5) => {
  let model: WaveModel;
  let balls: { x: number; y: number }[] = [];
  let referenceLines: ReferenceLine[] = [];
  let interactionHandler: ReturnType<typeof handleRulerInteractions>;
  let stopwatch: Stopwatch;
  let clampImg: p5.Image; // Declare clamp image

  p.preload = () => {
    clampImg = p.loadImage("@/../assets/clamp.png"); // Ensure the path is correct
  };

  p.setup = () => {
    p.createCanvas(1120, 400);
    p.frameRate(120);

    model = new WaveModel();

    // Initialize balls positions
    balls = Array.from({ length: BALL_COUNT }, (_, i) => ({
      x: 100 + i * BALL_SPACING,
      y: FIXED_Y,
    }));

    // Initialize ruler interactions with getter function
    interactionHandler = handleRulerInteractions(
      p,
      () => referenceLines, // Getter function for current state
      (newLines) => {
        referenceLines = newLines; // Setter function to update state
      }
    );

    stopwatch = new Stopwatch();

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
      onPause: () => {
        stopwatch.setPaused(model.isPlayingProperty.value);
        model.isPlayingProperty.value = !model.isPlayingProperty.value;
      },
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
    p.background(230, 236, 238);

    stopwatch.update(p.deltaTime, model.timeSpeedProperty.value);

    // Draw reference line
    if (model.referenceLineVisibleProperty.value) {
      p.stroke(150);
      p.strokeWeight(1);
      p.drawingContext.setLineDash(DASH_PATTERN);
      p.line(70, FIXED_Y, p.width, FIXED_Y);
      p.drawingContext.setLineDash([]);
    }

    // Draw rulers with active line
    if (model.rulersVisibleProperty.value) {
      drawRulers(p, referenceLines, interactionHandler.getActiveLine());
    }

    // Draw wave
    p.stroke(12, 69, 90);
    p.fill(12, 69, 90);

    balls.forEach((ball, i) => {
      if (i < balls.length - 1) {
        p.line(ball.x, ball.y, balls[i + 1].x, balls[i + 1].y);
      }
      if (i % 10 === 0) {
        p.fill(190, 77, 37);
        p.stroke(190, 77, 37);
      }
      p.ellipse(ball.x, ball.y, BALL_RADIUS);
      p.fill(12, 69, 90);
      p.stroke(12, 69, 90);
    });

    // Draw clamp on the last ball
    if (model.endTypeProperty.value === EndType.FIXED_END) {
      let lastBall = balls[balls.length - 1];
      p.image(clampImg, lastBall.x - 16, lastBall.y - 26.5, 70, 120); // Adjust position and size
    }
  };
};

export default sketch;
