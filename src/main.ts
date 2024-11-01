import { useDraw } from "./libs/core/hooks";
import { init } from "./libs/core/init";
import { ref } from "./libs/core/reactivity/ref";
import { config } from "./libs/core/stores";
import { Action } from "./libs/core/type";
import "./style.css";
import { createIcons, icons } from "lucide";

const canvas = document.querySelector("canvas")!;
const strokeColorInput = document.querySelector(
  "#strokeColor"
)! as HTMLInputElement;
const strokeWidthInput = document.querySelector(
  "#strokeWidth"
)! as HTMLInputElement;
const trashButton = document.querySelector("#trash")! as HTMLInputElement;
const ctx = canvas.getContext("2d")!;
canvas.width = innerWidth;
canvas.height = innerHeight;

const tools = [
  {
    title: "Rectangle",
    icon: "square",
    value: Action.RECTANGLE,
  },
  {
    title: "Line",
    icon: "minus",
    value: Action.LINE,
  },
];
const selectedTool = ref<Action>(Action.RECTANGLE);

declare global {
  interface Window {
    action: Action;
    ctx: CanvasRenderingContext2D;
  }
}

window.action = Action.RECTANGLE;

addEventListener("DOMContentLoaded", () => {
  loadTools();
  strokeColorInput.value = config.strokeStyle;

  strokeColorInput.addEventListener("change", ({ target }) => {
    const value = (target as HTMLInputElement)?.value;
    window.ctx.strokeStyle = value;
    config.strokeStyle = value;
  });
  strokeWidthInput.addEventListener("change", ({ target }) => {
    const value = +(target as HTMLInputElement)?.value;
    window.ctx.lineWidth = value;
    config.lineWidth = value;
  });

  window.ctx = ctx;
  init(canvas);

  // ------------------- Tool --------------------
  selectedTool.subscribe((newValue) => {
    loadTools();
    window.action = newValue;
  });
  function loadTools() {
    const toolsBox = document.querySelector("#tools_box")! as HTMLDivElement;
    toolsBox.innerHTML = "";
    tools.forEach((tool) => {
      const div = document.createElement("div");
      div.id = tool.value;
      div.title = tool.title;
      div.classList.add("tool");
      if (selectedTool.value === tool.value) div.dataset.selected = "true";

      const icon = document.createElement("i");
      icon.dataset.lucide = tool.icon;

      div.appendChild(icon);

      div.addEventListener("click", () => {
        selectedTool.value = tool.value;
      });

      toolsBox.appendChild(div);
    });

    createIcons({ icons });
  }

  trashButton.addEventListener("click", () => {
    const { reset } = useDraw();
    reset();
  });
  // ------------------- Tool End --------------------
});
