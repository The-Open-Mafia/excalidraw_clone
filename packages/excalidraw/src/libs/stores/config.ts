import { reactive } from "../core/reactivity/reactive";

interface Config {
  strokeStyle: string;
  fillColor: string;
  lineWidth: number;
}
export const config = reactive<Config>(loadConfig(), [
  (newConfig) => {
    localStorage.config = JSON.stringify(newConfig);
  },
]);

function loadConfig() {
  if (localStorage.config) {
    return JSON.parse(localStorage.config);
  }
  return {
    strokeStyle: "#000000",
    fillColor: "transparent",
    lineWidth: 1,
  };
}
