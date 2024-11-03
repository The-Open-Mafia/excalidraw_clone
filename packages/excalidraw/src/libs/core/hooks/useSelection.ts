import { ref } from "../reactivity/ref";
import { Ref } from "../type";

let _useSelection: {
  isMoving: Ref<boolean>;
};
function useSelection() {
  if (_useSelection) return _useSelection;
  const isMoving = ref(false);

  _useSelection = { isMoving };
  return _useSelection;
}

export { useSelection };
