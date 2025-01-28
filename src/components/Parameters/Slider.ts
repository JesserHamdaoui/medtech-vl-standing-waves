import p5 from "p5";
import "./parameters.css";

interface SliderProps {
  label: string;
  min: number;
  max: number;
  step: number;
  initialValue: number;
  onChange: (value: number) => void;
  sliderContainer?: p5.Element;
}

export class Slider {
  private sliderContainer: p5.Element;
  private container: p5.Element;

  constructor(p: p5, props: SliderProps) {
    this.sliderContainer = props.sliderContainer || p.createDiv();
    this.container = p.createDiv();
    this.container.addClass("slider-container");

    const label = p.createSpan(props.label);
    label.addClass("slider-label");

    const slider = p.createSlider(
      props.min,
      props.max,
      props.initialValue,
      props.step
    );
    slider.addClass("slider-input");
    (slider as any).input(() => props.onChange(slider.value() as number));

    this.container.child(label);
    this.container.child(slider);

    if (this.sliderContainer) {
      this.sliderContainer.child(this.container);
    }
  }
}
