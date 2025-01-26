import p5 from "p5";
import {
  createAmplitudeSlider,
  createFrequencySlider,
  createDampingSlider,
  createTensionSlider,
  createTensionFactorSlider,
  createDampingFactorSlider,
} from "./Sliders";

export const createSliders = (
  p: p5,
  onChangeAmplitude: (value: number) => void,
  oonChangeFrequency: (value: number) => void,
  onChangeDamping: (value: number) => void,
  onChangeTension: (value: number) => void,
  onChangeTensionFactor: (value: number) => void,
  onChangeDampingFactor: (value: number) => void
) => {
  createAmplitudeSlider(p, onChangeAmplitude);
  createFrequencySlider(p, oonChangeFrequency);
  createDampingSlider(p, onChangeDamping);
  createTensionSlider(p, onChangeTension);
  createTensionFactorSlider(p, onChangeTensionFactor);
  createDampingFactorSlider(p, onChangeDampingFactor);
};
