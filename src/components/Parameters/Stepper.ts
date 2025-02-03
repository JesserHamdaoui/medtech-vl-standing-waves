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
  private intervalId: NodeJS.Timeout | null = null;

  constructor(p: p5, props: StepperProps) {
    this.currentValue = this.roundToPrecision(props.initialValue, 2);

    this.stepperContainer = props.stepperContainer || p.createDiv();
    this.container = p.createDiv();
    this.container.addClass("stepper-container");

    const label = p.createSpan(props.label);
    label.addClass("stepper-label");

    const minusButton = p.createButton("<i class='fas fa-minus'></i>");
    minusButton.addClass("stepper-button");

    const plusButton = p.createButton("<i class='fas fa-plus'></i>");
    plusButton.addClass("stepper-button");

    // Button events with press-and-hold functionality
    this.addHoldEvent(minusButton, () => this.updateValue(props, -props.step));
    this.addHoldEvent(plusButton, () => this.updateValue(props, props.step));

    this.valueInput = p.createInput(this.currentValue.toString(), "text");
    this.valueInput.addClass("stepper-input");
    (this.valueInput as any).input(() => this.handleInputChange(props));

    this.container.child(label);
    this.container.child(minusButton);
    this.container.child(this.valueInput);
    this.container.child(plusButton);

    if (this.stepperContainer) {
      this.stepperContainer.child(this.container);
    }
  }

  private addHoldEvent(button: p5.Element, action: () => void): void {
    let isHeld = false;
    let delay = 500; // Initial delay before holding
    let interval = 100; // Speed of repeated execution

    const startHolding = () => {
      if (!isHeld) {
        isHeld = true;
        action(); // Perform action immediately
        this.intervalId = setTimeout(() => {
          this.intervalId = setInterval(action, interval);
        }, delay);
      }
    };

    const stopHolding = () => {
      isHeld = false;
      if (this.intervalId) {
        clearTimeout(this.intervalId);
        clearInterval(this.intervalId);
        this.intervalId = null;
      }
    };

    button.mousePressed(startHolding);
    button.mouseReleased(stopHolding);
    button.mouseOut(stopHolding); // Ensures stopping if the mouse leaves the button
  }

  private updateValue(props: StepperProps, delta: number): void {
    const newValue = this.roundToPrecision(this.currentValue + delta, 3);
    if (newValue >= props.min && newValue <= props.max) {
      this.currentValue = newValue;
      this.valueInput.value(this.currentValue.toString());
      props.onChange(this.currentValue);
    }
  }

  private handleInputChange(props: StepperProps): void {
    const inputValue = parseFloat(this.valueInput.value() as string);
    if (!isNaN(inputValue)) {
      const roundedValue = this.roundToPrecision(inputValue, 3);
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
