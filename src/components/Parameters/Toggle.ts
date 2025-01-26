import { CONTROL_X } from "@/constants/config";
import { Constraint } from "matter-js";
import p5 from "p5";

export const createEndModeToggle = (
  p: p5,
  onChange: (value: boolean) => void
) => {
  // Create a container for the toggle switch
  const toggleContainer = p.createDiv("");
  toggleContainer.position(CONTROL_X + 100, 400);
  toggleContainer.style("display", "inline-block");
  toggleContainer.style("cursor", "pointer");

  // Create the toggle switch structure
  const toggle = p.createDiv("");
  toggle.parent(toggleContainer);
  toggle.style(`
    width: 50px;
    height: 24px;
    background-color: #ccc;
    border-radius: 12px;
    position: relative;
  `);

  // Create the sliding circle
  const circle = p.createDiv("");
  circle.parent(toggle);
  circle.style(`
    width: 22px;
    height: 22px;
    background-color: #fff;
    border-radius: 50%;
    position: absolute;
    top: 1px;
    left: 1px;
    transition: left 0.2s, background-color 0.2s;
  `);

  // Toggle logic
  let isToggled = false;

  toggleContainer.mousePressed(() => {
    isToggled = !isToggled;

    // Update toggle switch appearance
    if (isToggled) {
      toggle.style("background-color: #2596be;"); // Green when toggled
      circle.style("left: 27px;"); // Move the circle to the right
    } else {
      toggle.style("background-color: #ccc;"); // Grey when off
      circle.style("left: 1px;"); // Move the circle to the left
    }

    // Callback to inform state change
    onChange(isToggled);
  });

  const label = p.createDiv("End Mode Loose");
  label.style("width", "100px");
  label.position(CONTROL_X, 400);

  const container = p.createDiv();
  container.style("display", "flex");
  container.style("align-items", "center");
  container.style("gap", "10px");

  container.child(label);
  container.child(toggleContainer);

  return container;
};
