export const drawStopwatch = (
  p: p5,
  stopwatchTime: number,
  stopwatchRunning: boolean
) => {
  if (stopwatchRunning) {
    stopwatchTime += p.deltaTime;
  }
  p.fill(0);
  p.textSize(20);
  const seconds = Math.floor(stopwatchTime / 1000);
  const milliseconds = Math.floor(stopwatchTime % 1000);
  p.text(`Time: ${seconds}.${milliseconds}`, p.width - 150, 40);
};
