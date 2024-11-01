import { reactive } from "../reactivity/reactive";
import { Shape } from "../shape";

interface ShapeStore {
  currentShape?: Shape;
}

export const shape = reactive<ShapeStore>(
  {
    currentShape: undefined,
  },
  [
    (newVal) => {
      if (newVal.currentShape) document.body.style.cursor = "all-scroll";
      else document.body.style.cursor = "default";
    },
  ]
);
