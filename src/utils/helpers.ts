import { ControlButton } from "@/components/Buttons/ControlButton";
import { ToggleButton } from "@/components/Buttons/ToggleButton";
import { Slider } from "@/components/Parameters/Slider";
import { Stepper } from "@/components/Parameters/Stepper";
import { Toggle } from "@/components/Parameters/Toggle";
import p5 from "p5";

export const createDiv = (id: string, text: string) => {
  let div = document.getElementById(id);
  if (!div) {
    div = document.createElement("div");
    div.id = id;
    document.body.appendChild(div);
  }
  div.innerText = text;
  return div;
};

export const createButton = (id: string, text: string, onClick: () => void) => {
  let button = document.getElementById(id);
  if (!button) {
    button = document.createElement("button");
    button.id = id;
    button.innerText = text;
    button.onclick = onClick;
    document.body.appendChild(button);
    console.log(button);
  }
};

interface ControlButtonsProps {
  onPause: () => void;
  onRestart: () => void;
  onSlow: () => void;
}
export const initControlButtons = (p: p5, buttons: ControlButtonsProps) => {
  const controlButtons = p.createDiv("");
  controlButtons.addClass("control-buttons-container");
  p.select(".control-container")?.child(controlButtons);

  new ToggleButton(p, {
    dataLabel: "start-pause",
    label: "Start",
    icon: null,
    initialIsActive: true,
    activeIcon: "<i class='fas fa-play'></i>",
    inactiveIcon: "<i class='fas fa-pause'></i>",
    onClick: buttons.onPause,
    onlyIcon: true,
    onlyText: false,
    container: controlButtons,
  });

  new ControlButton(p, {
    dataLabel: "restart",
    label: "Restart",
    icon: "<i class='fas fa-rotate-right'></i>",
    onClick: buttons.onRestart,
    onlyIcon: true,
    onlyText: false,
    container: controlButtons,
  });

  new ToggleButton(p, {
    dataLabel: "slow-fast",
    label: "Slower",
    icon: null,
    activeLabel: "Slower",
    inactiveLabel: "Faster",
    initialIsActive: true,
    onClick: buttons.onSlow,
    onlyIcon: false,
    onlyText: true,
    container: controlButtons,
  });
};

interface ParametersProps {
  onTensionChange: (value: number) => void;
  onDampingChange: (value: number) => void;
  onAmplitudeChange: (value: number) => void;
  onFrequencyChange: (value: number) => void;
  onEndModeChange: (value: boolean) => void;
}

export const initParameters = (p: p5, props: ParametersProps) => {
  const parameters = p.createDiv("");
  parameters.addClass("parameters-container");
  p.select(".control-container")?.child(parameters);

  const stepperContainer = p.createDiv("");
  stepperContainer.addClass("steppers-container");
  parameters.child(stepperContainer);

  const sliderContainer = p.createDiv("");
  sliderContainer.addClass("sliders-container");
  parameters.child(sliderContainer);

  new Slider(p, {
    label: "Tension",
    min: 0.2,
    max: 0.8,
    step: 0.01,
    initialValue: 0.5,
    onChange: props.onTensionChange,
    sliderContainer: sliderContainer,
  });

  new Slider(p, {
    label: "Damping",
    min: 0,
    max: 100,
    step: 1,
    initialValue: 20,
    onChange: props.onDampingChange,
    sliderContainer: sliderContainer,
  });

  new Stepper(p, {
    label: "Amplitude",
    min: 0,
    max: 1.3,
    step: 0.01,
    initialValue: 0.75,
    onChange: props.onAmplitudeChange,
    stepperContainer: stepperContainer,
  });

  new Stepper(p, {
    label: "Frequency",
    min: 0,
    max: 3.0,
    step: 0.1,
    initialValue: 1.5,
    onChange: props.onFrequencyChange,
    stepperContainer: stepperContainer,
  });

  new Toggle(p, {
    isActive: true,
    label: "Fix the end",
    onChange: props.onEndModeChange,
    toggleContainer: parameters,
  });
};
