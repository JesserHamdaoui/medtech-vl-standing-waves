import p5 from "p5";

export const drawRulers = (p: p5, dashedLines: { x: number; y: number }[]) => {
  const pxPerCM = 50;
  const referenceX = 100; // Projection point (P) x-coordinate
  const referenceY = 200; // Projection point (P) y-coordinate

  // Increase canvas resolution (optional, if canvas allows scaling)
  p.pixelDensity(2);

  // Set ruler color to grey
  p.stroke(150); // Grey color
  p.strokeWeight(1); // Default stroke weight

  // Horizontal axis fixed at y = referenceY - 150 (Origin offset)
  const horizontalRulerY = referenceY - 150;
  p.line(0, horizontalRulerY, p.width, horizontalRulerY);
  p.textSize(16); // Increase text size for better readability
  p.textFont("Arial"); // Use a default system font for clarity
  p.textStyle(p.ITALIC); // Set italic style for thinner text rendering

  // Draw horizontal ticks and labels
  for (let x = 0; x <= p.width; x += pxPerCM) {
    p.line(x, horizontalRulerY - 5, x, horizontalRulerY + 5);
    const distCm = ((x - referenceX) / pxPerCM).toFixed(1); // Use referenceX for horizontal ruler calculation
    if (distCm !== "0.0") {
      p.text(
        `${distCm} ${parseFloat(distCm) === 0.0 ? "cm" : ""}`,
        x + 5,
        horizontalRulerY - 20
      ); // Adjusted label position to be below the ruler
    }
  }

  // Vertical axis fixed at x = referenceX - 150 (Origin offset)
  const verticalRulerX = referenceX - 50;
  p.line(verticalRulerX, 0, verticalRulerX, p.height);

  // Draw vertical ticks and labels
  for (let y = 0; y <= p.height; y += pxPerCM) {
    p.line(verticalRulerX - 5, y, verticalRulerX + 5, y);
    const distCm = ((referenceY - y) / pxPerCM).toFixed(1); // Use referenceY for vertical ruler calculation
    if (distCm !== "0.0") {
      p.text(
        `${distCm} ${parseFloat(distCm) === 0 ? "cm" : ""}`,
        verticalRulerX - 40,
        y + 4
      ); // Adjusted label position to be left of the ruler
    }
  }

  // Draw dashed lines if there are any (horizontal and vertical)
  p.stroke(255, 0, 0);
  p.strokeWeight(2);
  p.drawingContext.setLineDash([5, 15]); // Red dashed line
  dashedLines.forEach((line) => {
    if (line.x !== undefined) {
      p.line(line.x, 0, line.x, p.height); // Vertical dashed line
    }
    if (line.y !== undefined) {
      p.line(0, line.y, p.width, line.y); // Horizontal dashed line
    }
  });
  p.drawingContext.setLineDash([]); // Reset to solid lines
};

// Add the interaction logic for right-click (removes lines) and left-click (creates lines)
export const handleClickEvents = (
  p: p5,
  dashedLines: { x: number; y: number }[],
  setDashedLines: (newDashedLines: { x: number; y: number }[]) => void
) => {
  // Prevent the default right-click context menu
  p.mousePressed = () => {
    if (p.mouseButton === p.RIGHT) {
      // Right-click, remove the dashed lines near the click
      dashedLines.forEach((line, index) => {
        if (
          line.x !== undefined &&
          p.mouseX >= line.x - 10 &&
          p.mouseX <= line.x + 10
        ) {
          setDashedLines(dashedLines.filter((_, i) => i !== index)); // Remove vertical line
        }
        if (
          line.y !== undefined &&
          p.mouseY >= line.y - 10 &&
          p.mouseY <= line.y + 10
        ) {
          setDashedLines(dashedLines.filter((_, i) => i !== index)); // Remove horizontal line
        }
      });
      p.preventDefault();
    } else if (p.mouseButton === p.LEFT) {
      // Left-click, create a dashed line at the clicked position
      if (
        p.mouseX >= 0 &&
        p.mouseX <= p.width &&
        p.mouseY >= 0 &&
        p.mouseY <= p.height
      ) {
        setDashedLines([...dashedLines, { x: p.mouseX, y: p.mouseY }]);
      }
    }
  };
};
