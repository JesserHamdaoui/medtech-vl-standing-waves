import {
  CONTROL_X,
  STEPPER_Y_START,
  STEPPER_Y_SPACING,
} from "../../constants/config";
import p5 from "p5";

export const createAmplitudeStepper = (
  p: p5,
  onChange: (value: number) => void
) => {
  const container = p.createDiv();
  container.position(CONTROL_X, STEPPER_Y_START);
  container.style("display", "flex");
  container.style("align-items", "center");
  container.style("gap", "5px");

  const label = p.createDiv("Amplitude (cm)");
  label.style("width", "100px");

  const input = p.createInput("0.75", "number");
  input.size(80);
  input.attribute("step", "0.01");
  input.attribute("min", "0");
  input.attribute("max", "1.3");

  const decrementBtn = p.createButton("-");
  decrementBtn.style("width", "40px");
  decrementBtn.mousePressed(() => {
    const currentValue = parseFloat(input.value());
    const newValue = Math.max(0, currentValue - 0.01);
    input.value(newValue.toFixed(2));
    onChange(newValue);
  });

  const incrementBtn = p.createButton("+");
  incrementBtn.style("width", "40px");
  incrementBtn.mousePressed(() => {
    const currentValue = parseFloat(input.value());
    const newValue = Math.min(1.3, currentValue + 0.01);
    input.value(newValue.toFixed(2));
    onChange(newValue);
  });

  input.input(() => {
    const value = parseFloat(input.value());
    if (!isNaN(value) && value >= 0 && value <= 1.3) {
      onChange(value);
    }
  });

  container.child(label);
  container.child(decrementBtn);
  container.child(input);
  container.child(incrementBtn);
};

export const createFrequencyStepper = (
  p: p5,
  onChange: (value: number) => void
) => {
  const container = p.createDiv();
  container.position(CONTROL_X, STEPPER_Y_START + STEPPER_Y_SPACING);
  container.style("display", "flex");
  container.style("align-items", "center");
  container.style("gap", "5px");

  const label = p.createDiv("Frequency (Hz)");
  label.style("width", "100px");

  const input = p.createInput("1.5", "number");
  input.size(80);
  input.attribute("step", "0.1");
  input.attribute("min", "0");
  input.attribute("max", "3.0");

  const decrementBtn = p.createButton("-");
  decrementBtn.style("width", "40px");
  decrementBtn.mousePressed(() => {
    const currentValue = parseFloat(input.value());
    const newValue = Math.max(0, currentValue - 0.1);
    input.value(newValue.toFixed(1));
    onChange(newValue);
  });

  const incrementBtn = p.createButton("+");
  incrementBtn.style("width", "40px");
  incrementBtn.mousePressed(() => {
    const currentValue = parseFloat(input.value());
    const newValue = Math.min(3.0, currentValue + 0.1);
    input.value(newValue.toFixed(1));
    onChange(newValue);
  });

  input.input(() => {
    const value = parseFloat(input.value());
    if (!isNaN(value) && value >= 0 && value <= 3.0) {
      onChange(value);
    }
  });

  container.child(label);
  container.child(decrementBtn);
  container.child(input);
  container.child(incrementBtn);
};
