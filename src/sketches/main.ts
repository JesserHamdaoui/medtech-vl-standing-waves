import p5 from "p5";
import { WaveModel } from "@/models/WaveModel";
import { createControls } from "@/components/Parameters";
import { createButtons } from "@/components/Buttons";
import { drawRulers } from "@/components/Rulers";
import { drawReferenceLine } from "@/components/ReferenceLine";
import { displayMetrics } from "@/components/Metrics";
import {
  FIXED_Y,
  BALL_RADIUS,
  BALL_COUNT,
  BALL_SPACING,
} from "@/constants/config";
import { TimeSpeed } from "@/types/TimeSpeed";

const sketch = (p: p5) => {
  let model: WaveModel;
  let balls: { x: number; y: number }[] = [];

  p.setup = () => {
    p.createCanvas(800, 400);
    p.frameRate(120);

    // Initialize model
    model = new WaveModel();

    // Initialize balls positions at FIXED_Y
    balls = Array.from({ length: BALL_COUNT }, (_, i) => ({
      x: 100 + i * BALL_SPACING,
      y: FIXED_Y,
    }));

    // Create UI controls
    createControls(
      p,
      (value) => (model.amplitudeProperty.value = value),
      (value) => (model.frequencyProperty.value = value),
      (value) => (model.tensionProperty.value = value),
      (value) => (model.dampingProperty.value = value),
      () => model.toggleEndMode()
    );

    createButtons(
      p,
      () => (model.isOscillatingProperty.value = true),
      () => model.manualRestart(),
      () => (model.isPlayingProperty.value = !model.isPlayingProperty.value),
      () => {
        model.timeSpeedProperty.value =
          model.timeSpeedProperty.value === TimeSpeed.NORMAL
            ? TimeSpeed.SLOW
            : TimeSpeed.NORMAL;
        p.frameRate(
          model.timeSpeedProperty.value === TimeSpeed.SLOW ? 30 : 120
        );
      },
      () =>
        (model.rulersVisibleProperty.value =
          !model.rulersVisibleProperty.value),
      () =>
        (model.referenceLineVisibleProperty.value =
          !model.referenceLineVisibleProperty.value)
    );

    // Listen for model updates
    model.yNowChangedEmitter.addListener(() => {
      // Get positions from model and update ball positions
      const positions = model.getPositions();
      for (let i = 0; i < balls.length; i++) {
        // Positions from model are already relative to FIXED_Y
        balls[i].y = positions[i];
      }
    });
  };

  p.draw = () => {
    const dt = p.deltaTime / 1000;

    // Update model
    model.step(dt);

    // Draw
    p.background(212, 229, 240);

    // Draw reference line at FIXED_Y
    if (model.referenceLineVisibleProperty.value) {
      drawReferenceLine(p, balls, FIXED_Y);
    }

    // Draw rulers if visible
    if (model.rulersVisibleProperty.value) {
      drawRulers(p, []);
    }

    // Draw string
    p.stroke(37, 150, 190);
    p.fill(37, 150, 190);

    // Draw balls and connecting lines
    balls.forEach((ball, i) => {
      // Draw line to next ball
      if (i < balls.length - 1) {
        p.line(ball.x, ball.y, balls[i + 1].x, balls[i + 1].y);
      }
      // Draw ball
      p.ellipse(ball.x, ball.y, BALL_RADIUS);
    });

    // Display metrics
    displayMetrics(p, {
      amplitude: model.amplitudeProperty.value,
      frequency: model.frequencyProperty.value,
      damping: model.dampingProperty.value,
      tension: model.tensionProperty.value,
    });
  };
};

export default sketch;
