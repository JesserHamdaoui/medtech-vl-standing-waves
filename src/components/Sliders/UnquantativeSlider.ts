export const UnquantativeSlider = (
  p: p5,
  min: number,
  max: number,
  defaultValue: number,
  x: number,
  y: number,
  onChange: Function
) => {
  const slider = p.createSlider(min, max, defaultValue);
  slider.position(x, y);
  slider.input(() => onChange(slider.value()));

  return slider;
};
