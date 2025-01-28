import p5 from "p5";
import "./parameters.css";

interface StepperProps {
  label: string;
  min: number;
  max: number;
  step: number;
  initialValue: number;
  onChange: (value: number) => void;
  stepperContainer?: p5.Element;
}

export class Stepper {
  private container: p5.Element;
  private valueInput: p5.Element;
  private currentValue: number;
  private stepperContainer: p5.Element;

  constructor(p: p5, props: StepperProps) {
    this.currentValue = this.roundToPrecision(props.initialValue, 2);

    this.stepperContainer = props.stepperContainer || p.createDiv();
    this.container = p.createDiv();
    this.container.addClass("stepper-container");

    const label = p.createSpan(props.label);
    label.addClass("stepper-label");

    const minusButton = p.createButton("<i class='fas fa-minus'></i>");
    minusButton.addClass("stepper-button");
    minusButton.mousePressed(() => this.updateValue(props, -props.step));

    this.valueInput = p.createInput(this.currentValue.toString(), "text");
    this.valueInput.addClass("stepper-input");
    (this.valueInput as any).input(() => this.handleInputChange(props));

    const plusButton = p.createButton("<i class='fas fa-plus'></i>");
    plusButton.addClass("stepper-button");
    plusButton.mousePressed(() => this.updateValue(props, props.step));

    this.container.child(label);
    this.container.child(minusButton);
    this.container.child(this.valueInput);
    this.container.child(plusButton);

    if (this.stepperContainer) {
      this.stepperContainer.child(this.container);
    }
  }

  private updateValue(props: StepperProps, delta: number): void {
    const newValue = this.roundToPrecision(this.currentValue + delta, 2);
    if (newValue >= props.min && newValue <= props.max) {
      this.currentValue = newValue;
      this.valueInput.value(this.currentValue.toString());
      props.onChange(this.currentValue);
    }
  }

  private handleInputChange(props: StepperProps): void {
    const inputValue = parseFloat(this.valueInput.value() as string);
    if (!isNaN(inputValue)) {
      const roundedValue = this.roundToPrecision(inputValue, 2);
      if (roundedValue >= props.min && roundedValue <= props.max) {
        this.currentValue = roundedValue;
        this.valueInput.value(this.currentValue.toString());
        props.onChange(this.currentValue);
      }
    }
  }

  private roundToPrecision(value: number, precision: number): number {
    const factor = Math.pow(10, precision);
    return Math.round(value * factor) / factor;
  }
}
