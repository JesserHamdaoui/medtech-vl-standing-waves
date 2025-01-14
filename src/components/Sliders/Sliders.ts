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

export const createAmplitudeSlider = (
  p: p5,
  onChange: (value: number) => void
) => {
  const amplitudeLabel = p.createP("Amplitude");
  amplitudeLabel.position(10, 0);
  const amplitudeSlider = p.createSlider(
    AMPLITUDE_MIN,
    AMPLITUDE_MAX,
    (AMPLITUDE_MIN + AMPLITUDE_MAX) / 2,
    0.1 // Step value for amplitude
  );
  amplitudeSlider.position(10, 30);
  amplitudeSlider.style("width", "200px");
  amplitudeSlider.input(() => onChange(amplitudeSlider.value() as number));
  return amplitudeSlider;
};

export const createFrequencySlider = (
  p: p5,
  onChange: (value: number) => void
) => {
  const frequencyLabel = p.createP("Frequency");
  frequencyLabel.position(10, 50);
  const frequencySlider = p.createSlider(
    FREQUENCY_MIN,
    FREQUENCY_MAX,
    (FREQUENCY_MIN + FREQUENCY_MAX) / 2,
    0.1 // Step value for frequency
  );
  frequencySlider.position(10, 80);
  frequencySlider.style("width", "200px");
  frequencySlider.input(() => onChange(frequencySlider.value() as number));
  return frequencySlider;
};

export const createDampingSlider = (
  p: p5,
  onChange: (value: number) => void
) => {
  const dampingLabel = p.createP("Damping");
  dampingLabel.position(10, 100);
  const dampingSlider = p.createSlider(
    DAMPING_MIN,
    DAMPING_MAX,
    (DAMPING_MIN + DAMPING_MAX) / 2,
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
  tensionLabel.position(10, 150);
  const tensionSlider = p.createSlider(
    TENSION_MIN,
    TENSION_MAX,
    (TENSION_MIN + TENSION_MAX) / 2,
    0.1 // Step value for tension
  );
  tensionSlider.position(10, 180);
  tensionSlider.style("width", "200px");
  tensionSlider.input(() => onChange(tensionSlider.value() as number));
  return tensionSlider;
};
