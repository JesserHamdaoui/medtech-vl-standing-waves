export const StartButton = (p: p5, onStart: Function) => {
  const startButton = p.createButton("Start Oscillation");
  startButton.position(700, 340);
  startButton.mousePressed(() => onStart());
};

export const ResetButton = (p: p5, onReset: Function) => {
  const resetButton = p.createButton("Reset");
  resetButton.position(700, 370);
  resetButton.mousePressed(() => onReset());
};

export const PauseButton = (p: p5) => {
  const pauseButton = p.createButton("Pause");
  pauseButton.position(20, 370);
  pauseButton.mousePressed(() => {
    // Toggle paused state
  });
};

export const SlowMotionButton = (p: p5) => {
  const slowMotionButton = p.createButton("Toggle Slow Motion");
  slowMotionButton.position(120, 370);
  slowMotionButton.mousePressed(() => {
    // Toggle slow motion state
  });
};

export const RulersButton = (p: p5) => {
  const rulersButton = p.createButton("Toggle Rulers");
  rulersButton.position(250, 370);
  rulersButton.mousePressed(() => {
    // Toggle rulers visibility
  });
};

export const StopwatchButton = (p: p5) => {
  const stopwatchButton = p.createButton("Toggle Stopwatch");
  stopwatchButton.position(400, 370);
  stopwatchButton.mousePressed(() => {
    // Toggle stopwatch visibility
  });
};
