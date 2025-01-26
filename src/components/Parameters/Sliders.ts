import p5 from "p5";
import {
  CONTROL_X,
  SLIDER_Y_START,
  SLIDER_Y_SPACING,
} from "../../constants/config";

export const createTensionSlider = (
  p: p5,
  onChange: (value: number) => void
) => {
  const container = p.createDiv();
  container.position(CONTROL_X, SLIDER_Y_START);
  container.style("display", "flex");
  container.style("align-items", "center");
  container.style("gap", "10px");

  const label = p.createDiv("Tension");
  label.style("width", "100px");

  const slider = p.createSlider(0.2, 0.8, 0.5, 0.01);
  slider.style("width", "200px");
  slider.input(() => onChange(slider.value() as number));

  container.child(label);
  container.child(slider);
};

export const createDampingSlider = (
  p: p5,
  onChange: (value: number) => void
) => {
  const container = p.createDiv();
  container.position(CONTROL_X, SLIDER_Y_START + SLIDER_Y_SPACING);
  container.style("display", "flex");
  container.style("align-items", "center");
  container.style("gap", "10px");

  const label = p.createDiv("Damping");
  label.style("width", "100px");

  const slider = p.createSlider(0, 100, 20, 1);
  slider.style("width", "200px");
  slider.input(() => onChange(slider.value() as number));

  container.child(label);
  container.child(slider);
};
