import { Emitter, mitt } from "../../../emitter";
import { Events } from "../type";

let _useEmitter: Emitter<Events>;

function useEmitter(): Emitter<Events> {
  if (_useEmitter) return _useEmitter;
  _useEmitter = mitt<Events>();
  return _useEmitter;
}

export { useEmitter };
