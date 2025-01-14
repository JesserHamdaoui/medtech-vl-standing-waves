import p5 from "p5";

let isPaused = false;
let stopwatchTime = 0;

export const createStopwatch = (p: p5) => {
  const stopwatchDiv = document.createElement("div");
  stopwatchDiv.setAttribute("id", "stopwatch");
  stopwatchDiv.id = "stopwatch";
  stopwatchDiv.style.position = "absolute";
  stopwatchDiv.style.top = "10px";
  stopwatchDiv.style.left = "10px";
  document.body.appendChild(stopwatchDiv);

  const stopwatchLabel = document.createElement("div");
  stopwatchLabel.innerText = "Stopwatch";
  stopwatchDiv.appendChild(stopwatchLabel);

  const stopwatchTimeLabel = document.createElement("p");
  stopwatchTimeLabel.innerText = "0.00";
  stopwatchDiv.appendChild(stopwatchTimeLabel);

  const startButton = document.createElement("button");
  startButton.innerText = "Start";
  startButton.onclick = () => {
    isPaused = false;
  };
  stopwatchDiv.appendChild(startButton);

  const pauseButton = document.createElement("button");
  pauseButton.innerText = "Pause";
  pauseButton.onclick = () => {
    isPaused = true;
  };
  stopwatchDiv.appendChild(pauseButton);

  const resetButton = document.createElement("button");
  resetButton.innerText = "Reset";
  resetButton.onclick = () => {
    isPaused = true;
    stopwatchTime = 0;
    stopwatchTimeLabel.innerText = "0.00";
  };
  stopwatchDiv.appendChild(resetButton);

  return stopwatchDiv;
};

export const updateStopwatch = (p: p5) => {
  if (!isPaused) {
    stopwatchTime += p.deltaTime / 1000;
    (
      document.getElementById("stopwatch")!.children[1] as HTMLElement
    ).innerText = stopwatchTime.toFixed(2);
  }
};

export const toggleStopwatch = () => {
  const stopwatchDiv = document.getElementById("stopwatch");
  if (stopwatchDiv) {
    stopwatchDiv.style.display =
      stopwatchDiv.style.display === "none" ? "block" : "none";
  }
};
