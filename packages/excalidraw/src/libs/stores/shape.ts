import { reactive } from "../core/reactivity/reactive";
import { Shape } from "../core/shapes/shape";

interface ShapeStore {
  currentShape?: Shape;
  selectedShape: {
    id?: string;
    originalX?: number;
    originalY?: number;
  };
}

export const shape = reactive<ShapeStore>(
  {
    currentShape: undefined,
    selectedShape: {},
  },
  [
    (newVal) => {
      if (newVal.currentShape) document.body.style.cursor = "all-scroll";
      else document.body.style.cursor = "default";
    },
  ],
);
