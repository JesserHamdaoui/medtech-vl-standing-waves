import { TimeSpeed } from "@/types/TimeSpeed";

export class Stopwatch {
  private isPaused: boolean;
  private stopwatchTime: number;
  private stopwatchDiv: HTMLDivElement;
  private stopwatchTimeLabel: HTMLParagraphElement;
  private playPauseButton: HTMLButtonElement;

  // Drag handling properties
  private isDragging = false;
  private dragStartX = 0;
  private dragStartY = 0;
  private elementOffsetX = 0;
  private elementOffsetY = 0;

  constructor() {
    this.isPaused = true;
    this.stopwatchTime = 0;

    // Create main container
    this.stopwatchDiv = document.createElement("div");
    this.stopwatchDiv.id = "stopwatch";
    this.stopwatchDiv.style.position = "absolute";
    this.stopwatchDiv.style.top = "70px";
    this.stopwatchDiv.style.left = "1180px";
    this.stopwatchDiv.style.cursor = "move";

    // Create label
    const label = document.createElement("div");
    label.textContent = "Stopwatch";
    this.stopwatchDiv.appendChild(label);

    // Create time display
    this.stopwatchTimeLabel = document.createElement("p");
    this.stopwatchTimeLabel.textContent = "0.00";
    this.stopwatchDiv.appendChild(this.stopwatchTimeLabel);

    // Create control buttons
    this.playPauseButton = this.createIconButton("fa-play", () =>
      this.togglePlayPause()
    );
    this.createIconButton("fa-rotate-right", () => this.reset());

    // Add drag event listeners
    this.stopwatchDiv.addEventListener("mousedown", this.handleMouseDown);
    document.addEventListener("mouseup", this.handleMouseUp);

    document.body.appendChild(this.stopwatchDiv);
  }

  private handleMouseDown = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.tagName === "BUTTON") return;

    this.isDragging = true;
    this.dragStartX = e.clientX;
    this.dragStartY = e.clientY;
    this.elementOffsetX = parseInt(this.stopwatchDiv.style.left) || 0;
    this.elementOffsetY = parseInt(this.stopwatchDiv.style.top) || 0;

    document.addEventListener("mousemove", this.handleMouseMove);
    this.stopwatchDiv.classList.add("dragging");
  };

  private handleMouseMove = (e: MouseEvent) => {
    if (!this.isDragging) return;

    const dx = e.clientX - this.dragStartX;
    const dy = e.clientY - this.dragStartY;

    this.stopwatchDiv.style.left = `${this.elementOffsetX + dx}px`;
    this.stopwatchDiv.style.top = `${this.elementOffsetY + dy}px`;
  };

  private handleMouseUp = () => {
    this.isDragging = false;
    document.removeEventListener("mousemove", this.handleMouseMove);
    this.stopwatchDiv.classList.remove("dragging");
  };

  private createIconButton(iconClass: string, onClick: () => void) {
    const button = document.createElement("button");
    const icon = document.createElement("i");
    icon.className = `fas ${iconClass}`;
    button.appendChild(icon);
    button.onclick = onClick;
    button.style.lineHeight = "1";
    this.stopwatchDiv.appendChild(button);
    return button;
  }

  private togglePlayPause() {
    this.isPaused = !this.isPaused;
    const icon = this.playPauseButton.querySelector("i")!;
    icon.className = `fas ${this.isPaused ? "fa-play" : "fa-pause"}`;
  }

  public reset() {
    this.isPaused = true;
    this.stopwatchTime = 0;
    this.stopwatchTimeLabel.textContent = "0.00";
    const icon = this.playPauseButton.querySelector("i")!;
    icon.className = "fas fa-play";
  }

  public update(deltaTime: number, timeSpeed: TimeSpeed) {
    const speedMultiplier =
      timeSpeed === TimeSpeed.NORMAL
        ? 1
        : timeSpeed === TimeSpeed.SLOW
        ? 0.25
        : 1;

    if (!this.isPaused) {
      this.stopwatchTime += (deltaTime / 1000) * speedMultiplier;
      this.stopwatchTimeLabel.textContent = this.stopwatchTime.toFixed(2);
    }
  }

  public toggleVisibility() {
    this.stopwatchDiv.style.display =
      this.stopwatchDiv.style.display === "none" ? "block" : "none";
  }

  public setPaused(paused: boolean) {
    this.isPaused = paused;
  }
}
