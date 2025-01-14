import p5 from "p5";
import { createDiv } from "@/utils/helpers";

export const displayMetrics = (
  p: p5,
  params: {
    amplitude: number;
    frequency: number;
    damping: number;
    tension: number;
  }
) => {
  p.fill(0);
  p.textSize(16);

  // Displaying the metrics based on the params object

  createDiv("amplitude", `Amplitude: ${params.amplitude} cm`);
  createDiv("frequency", `Frequency: ${params.frequency} Hz`);
  createDiv("damping", `Damping: ${params.damping}`);
  createDiv("tension", `Tension: ${params.tension}`);
};
