import { clearAndRedraw, useDraw } from "../main";
import { useEmitter } from "./core/hooks/useEmitter";

export function initializeEvents() {
  const { on } = useEmitter();
  const { reset } = useDraw();

  on("reset", () => {
    reset();
    clearAndRedraw();
  });
}
