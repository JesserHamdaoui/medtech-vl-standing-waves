import p5 from "p5";
import sketch from "./sketches/main";
import { library, dom } from "@fortawesome/fontawesome-svg-core";
import {
  faRuler,
  faPlay,
  faPause,
  faRotateRight,
  faPlus,
  faMinus,
} from "@fortawesome/free-solid-svg-icons";

library.add(faRuler, faPlay, faPause, faRotateRight, faPlus, faMinus);

// Automatically find and replace `<i>` tags with SVGs
dom.watch();

// Initialize the p5 sketch
new p5(sketch);
