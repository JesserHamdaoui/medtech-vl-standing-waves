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

  const amplitudeDiv = createDiv(
    "amplitude",
    `Amplitude: ${params.amplitude} cm`
  );
  const frequencyDiv = createDiv(
    "frequency",
    `Frequency: ${params.frequency} Hz`
  );
  const dampingDiv = createDiv("damping", `Damping: ${params.damping}`);
  const tensionDiv = createDiv("tension", `Tension: ${params.tension}`);

  amplitudeDiv.setAttribute("id", "amplitude");
  frequencyDiv.setAttribute("id", "frequency");
  dampingDiv.setAttribute("id", "damping");
  tensionDiv.setAttribute("id", "tension");
};
