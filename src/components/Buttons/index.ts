import p5 from "p5";

import {
  StartButton,
  ResetButton,
  PauseButton,
  SlowMotionButton,
  RulersButton,
  StopwatchButton,
} from "./Buttons";

export const createButtons = (
  p: p5,
  onStart: Function,
  onReset: Function,
  onPause: Function,
  onSlowMotion: Function,
  onRulers: Function,
  onStopwatch: Function
) => {
  StartButton(p, onStart);
  ResetButton(p, onReset);
  PauseButton(p, onPause);
  SlowMotionButton(p, onSlowMotion);
  RulersButton(p, onRulers);
  StopwatchButton(p, onStopwatch);
};
