import { Ref } from "../type";

export function ref<T>(value: T) {
  const refObject: Ref<T> = {
    get value() {
      return value;
    },
    set value(newValue) {
      value = newValue;
      this.effects.forEach((eff) => eff(newValue));
    },
    effects: [],
    subscribe(fn: (newValue: T) => void) {
      this.effects.push(fn);
    },
  };
  return refObject;
}
