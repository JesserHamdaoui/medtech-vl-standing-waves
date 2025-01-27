import p5 from "p5";
import {
  ReferenceLine,
  LINE_PROXIMITY_THRESHOLD,
  RULER_OFFSET,
  PX_PER_CM,
  ReferenceLineUtils,
  DoubleClickProcessor,
} from "@/components/ReferenceLine";

// Constants
const REFERENCE_X = 100;
const REFERENCE_Y = 200;

export const drawRulers = (
  p: p5,
  referenceLines: ReferenceLine[],
  activeLine: ReferenceLine | null
) => {
  const horizontalRulerY = REFERENCE_Y + 150;
  const verticalRulerX = REFERENCE_X - RULER_OFFSET;

  // Draw rulers
  p.stroke(150);
  p.strokeWeight(1);
  p.textSize(14);
  p.textFont("Monospace");
  p.textAlign(p.LEFT, p.CENTER);

  // Horizontal ruler
  p.line(50, horizontalRulerY, p.width, horizontalRulerY);
  for (let x = 50; x <= p.width; x += PX_PER_CM) {
    p.line(x, horizontalRulerY - 5, x, horizontalRulerY + 5);
    const distCm = (x - REFERENCE_X) / PX_PER_CM;
    p.push();
    p.noStroke();
    p.text(`${distCm.toFixed(1)}`, x + 5, horizontalRulerY - 15);
    p.pop();
  }

  // Vertical ruler
  p.line(verticalRulerX, 100, verticalRulerX, p.height - 50);
  for (let y = 100; y <= p.height - 100; y += PX_PER_CM) {
    p.line(verticalRulerX - 5, y, verticalRulerX + 5, y);
    const distCm = (REFERENCE_Y - y) / PX_PER_CM;
    p.push();
    p.noStroke();
    p.text(`${distCm.toFixed(1)}`, verticalRulerX - 40, y + 5);
    p.pop();
  }

  // Draw reference lines
  p.push();
  referenceLines.forEach((line) => ReferenceLineUtils.drawLine(p, line));
  if (activeLine) ReferenceLineUtils.drawLine(p, activeLine, true);
  p.pop();
};

export const handleRulerInteractions = (
  p: p5,
  referenceLines: ReferenceLine[],
  setReferenceLines: (lines: ReferenceLine[]) => void
) => {
  const horizontalRulerY = REFERENCE_Y + 150;
  const verticalRulerX = REFERENCE_X - RULER_OFFSET;

  let activeLine: ReferenceLine | null = null;
  let lastClickTime = 0;

  p.mousePressed = () => {
    const now = Date.now();

    // Handle double-click deletion
    if (DoubleClickProcessor.check(now, lastClickTime)) {
      setReferenceLines(
        DoubleClickProcessor.process(referenceLines, p.mouseX, p.mouseY)
      );
      lastClickTime = now;
      return;
    }
    lastClickTime = now;

    // Check for existing line to move
    const clickedLine = referenceLines.find((line) =>
      ReferenceLineUtils.isPointNearLine(p, line, p.mouseX, p.mouseY)
    );

    if (clickedLine) {
      // Start dragging existing line
      activeLine = { ...clickedLine, isDragging: true };
      setReferenceLines(referenceLines.filter((l) => l !== clickedLine));
      return;
    }

    // Create new line if clicking near rulers
    const nearVerticalRuler =
      Math.abs(p.mouseX - verticalRulerX) < LINE_PROXIMITY_THRESHOLD;
    const nearHorizontalRuler =
      Math.abs(p.mouseY - horizontalRulerY) < LINE_PROXIMITY_THRESHOLD;

    if (nearVerticalRuler || nearHorizontalRuler) {
      activeLine = ReferenceLineUtils.createLine(p, nearVerticalRuler);
      activeLine.isDragging = true;
    }
  };

  p.mouseDragged = () => {
    if (activeLine?.isDragging) {
      activeLine = ReferenceLineUtils.handleLineMovement(
        activeLine,
        p.mouseX,
        p.mouseY
      );
    }
  };

  p.mouseReleased = () => {
    if (activeLine?.isDragging) {
      activeLine.isDragging = false;
      setReferenceLines([...referenceLines, activeLine]);
      activeLine = null;
    }
  };

  return {
    getActiveLine: () => activeLine,
  };
};
