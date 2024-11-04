export function reactive<T extends object>(
  obj: T,
  effects: ((newValue: T, key: keyof T, value: T[keyof T]) => void)[] = [],
) {
  return new Proxy<T>(obj, {
    get(target, key) {
      return target[key as keyof T];
    },
    set(target, key, value) {
      target[key as keyof T] = value;
      effects.forEach((eff) => eff(target, key as keyof T, value));
      return true;
    },
  });
}
