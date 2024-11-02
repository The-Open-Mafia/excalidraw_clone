import { reactive } from "../reactivity/reactive";
import { Shape } from "../shape";

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
  ]
);
