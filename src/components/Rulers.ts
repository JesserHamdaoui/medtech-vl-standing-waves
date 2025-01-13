export const drawRulers = (p: p5) => {
  const pxPerCM = 50;
  const originX = 20;
  const originY = 20;

  // Horizontal axis fixed at y = originY
  p.line(0, originY, p.width, originY);
  p.textSize(10); // Smaller size for the labels
  for (let x = 0; x <= p.width; x += pxPerCM) {
    p.line(x, originY - 5, x, originY + 5);
    const distCm = ((x - originX) / pxPerCM).toFixed(1);
    if (distCm !== "0.0") {
      p.text(`${distCm} cm`, x + 2, originY - 8);
    }
  }

  // Vertical axis fixed at x = originX
  p.line(originX, 0, originX, p.height);
  for (let y = 0; y <= p.height; y += pxPerCM) {
    p.line(originX - 5, y, originX + 5, y);
    const distCm = ((originY - y) / pxPerCM).toFixed(1);
    if (distCm !== "0.0") {
      p.text(`${distCm} cm`, originX + 8, y + 4);
    }
  }
};
