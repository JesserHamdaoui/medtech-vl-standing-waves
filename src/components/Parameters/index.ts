import p5 from "p5";
import { createAmplitudeStepper, createFrequencyStepper } from "./Steppers";
import { createDampingSlider, createTensionSlider } from "./Sliders";
import { createEndModeToggle } from "./Toggle";

export const createControls = (
  p: p5,
  onAmplitudeChange: (value: number) => void,
  onFrequencyChange: (value: number) => void,
  onTensionChange: (value: number) => void,
  onDampingChange: (value: number) => void,
  onEndModeChange: () => void
) => {
  createAmplitudeStepper(p, onAmplitudeChange);
  createFrequencyStepper(p, onFrequencyChange);
  createTensionSlider(p, onTensionChange);
  createDampingSlider(p, onDampingChange);
  createEndModeToggle(p, onEndModeChange);
};
