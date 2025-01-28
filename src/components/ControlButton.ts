import p5 from "p5";

interface ControlButtonParams {
  label: string | null;
  icon: string | null;
  onClick: () => void;
}

// Base Button Class
export class ControlButton {
  protected button: p5.Element;
  constructor(p: p5, params: ControlButtonParams) {
    this.button = p.createButton("");
    params.icon ? this.button.html(params.icon) : this.button.html(label);
    this.button.addClass("control-button");
    this.button.attribute("data-label", params.label);
    this.button.mousePressed(() => params.onClick());
  }

  setText(text: string) {
    this.button.html(text);
  }
}
