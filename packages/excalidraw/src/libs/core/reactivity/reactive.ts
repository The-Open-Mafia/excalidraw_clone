export function reactive<T extends object>(
  obj: T,
  effects: ((newValue: T) => void)[] = [],
) {
  return new Proxy<T>(obj, {
    get(target, key) {
      return target[key as keyof T];
    },
    set(target, key, value) {
      target[key as keyof T] = value;
      effects.forEach((eff) => eff(target));
      return true;
    },
  });
}
