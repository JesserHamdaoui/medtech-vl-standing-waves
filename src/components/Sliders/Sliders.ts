import p5 from "p5";
import {
  AMPLITUDE_MAX,
  AMPLITUDE_MIN,
  FREQUENCY_MAX,
  FREQUENCY_MIN,
  DAMPING_MAX,
  DAMPING_MIN,
  TENSION_MAX,
  TENSION_MIN,
} from "@/constants/config";

import { AMPLITUDE, FREQUENCY, DAMPING, TENSION } from "@/constants/physics";

export const createAmplitudeSlider = (
  p: p5,
  onChange: (value: number) => void
) => {
  const amplitudeLabel = p.createP("Amplitude");
  (amplitudeLabel.elt as HTMLElement).setAttribute("id", "amplitude-label");
  amplitudeLabel.position(10, 0);

  // Create the input field for amplitude
  const amplitudeInput = p.createInput(AMPLITUDE.toString(), "number");
  amplitudeInput.position(10, 30);
  amplitudeInput.style("width", "100px");

  // Create stepper increment and decrement buttons
  const decrementButton = p.createButton("-");
  decrementButton.position(120, 30);
  decrementButton.mousePressed(() => {
    let value = parseFloat(amplitudeInput.value() as string);
    value = Math.max(AMPLITUDE_MIN, value - 0.1); // Step of 0.1 (adjustable)
    amplitudeInput.value(value.toFixed(1));
    onChange(value);
  });

  const incrementButton = p.createButton("+");
  incrementButton.position(150, 30);
  incrementButton.mousePressed(() => {
    let value = parseFloat(amplitudeInput.value() as string);
    value = Math.min(AMPLITUDE_MAX, value + 0.1); // Step of 0.1 (adjustable)
    amplitudeInput.value(value.toFixed(1));
    onChange(value);
  });

  // Handle input change directly
  amplitudeInput.input(() => {
    onChange(parseFloat(amplitudeInput.value() as string));
  });

  return amplitudeInput;
};

export const createFrequencySlider = (
  p: p5,
  onChange: (value: number) => void
) => {
  const frequencyLabel = p.createP("Frequency");
  (frequencyLabel.elt as HTMLElement).setAttribute("id", "frequency-label");
  frequencyLabel.position(10, 50);

  // Create the input field for frequency
  const frequencyInput = p.createInput(FREQUENCY.toString(), "number");
  frequencyInput.position(10, 80);
  frequencyInput.style("width", "100px");

  // Create stepper increment and decrement buttons
  const decrementButton = p.createButton("-");
  decrementButton.position(120, 80);
  decrementButton.mousePressed(() => {
    let value = parseFloat(frequencyInput.value() as string);
    value = Math.max(FREQUENCY_MIN, value - 0.1); // Step of 0.1 (adjustable)
    frequencyInput.value(value.toFixed(1));
    onChange(value);
  });

  const incrementButton = p.createButton("+");
  incrementButton.position(150, 80);
  incrementButton.mousePressed(() => {
    let value = parseFloat(frequencyInput.value() as string);
    value = Math.min(FREQUENCY_MAX, value + 0.1); // Step of 0.1 (adjustable)
    frequencyInput.value(value.toFixed(1));
    onChange(value);
  });

  // Handle input change directly
  frequencyInput.input(() => {
    onChange(parseFloat(frequencyInput.value() as string));
  });

  return frequencyInput;
};

export const createDampingSlider = (
  p: p5,
  onChange: (value: number) => void
) => {
  const dampingLabel = p.createP("Damping");
  (dampingLabel.elt as HTMLElement).setAttribute("id", "damping-label");
  dampingLabel.position(10, 100);
  const dampingSlider = p.createSlider(
    DAMPING_MIN,
    DAMPING_MAX,
    DAMPING,
    0.01 // Step value for damping
  );
  dampingSlider.position(10, 130);
  dampingSlider.style("width", "200px");
  dampingSlider.input(() => onChange(dampingSlider.value() as number));
  return dampingSlider;
};

export const createTensionSlider = (
  p: p5,
  onChange: (value: number) => void
) => {
  const tensionLabel = p.createP("Tension");
  (tensionLabel.elt as HTMLElement).setAttribute("id", "tension-label");
  tensionLabel.position(10, 150);
  const tensionSlider = p.createSlider(
    TENSION_MIN,
    TENSION_MAX,
    TENSION,
    0.001 // Step value for tension
  );
  tensionSlider.position(10, 180);
  tensionSlider.style("width", "200px");
  tensionSlider.input(() => onChange(tensionSlider.value() as number));
  return tensionSlider;
};
