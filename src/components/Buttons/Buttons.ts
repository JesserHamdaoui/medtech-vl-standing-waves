import p5 from "p5";

export const StartButton = (p: p5, onStart: Function) => {
  const startButton = p.createButton("Start Oscillation");
  startButton.position(20, 520);
  startButton.mousePressed(() => onStart());
};

export const ResetButton = (p: p5, onReset: Function) => {
  const resetButton = p.createButton("Reset");
  resetButton.position(20, 560);
  resetButton.mousePressed(() => onReset());
};

export const PauseButton = (p: p5, onPause: Function) => {
  const pauseButton = p.createButton("Pause");
  pauseButton.position(20, 600);
  pauseButton.mousePressed(() => onPause());
};

export const SlowMotionButton = (p: p5, onSlowMotion: Function) => {
  const slowMotionButton = p.createButton("Toggle Slow Motion");
  slowMotionButton.position(20, 640);
  slowMotionButton.mousePressed(() => onSlowMotion());
};

export const RulersButton = (p: p5, onRulers: Function) => {
  const rulersButton = p.createButton("Toggle Rulers");
  rulersButton.position(20, 680);
  rulersButton.mousePressed(() => onRulers());
};

export const StopwatchButton = (p: p5, onStopwatch: Function) => {
  const stopwatchButton = p.createButton("Toggle Stopwatch");
  stopwatchButton.position(20, 720);
  stopwatchButton.mousePressed(() => onStopwatch());
};
