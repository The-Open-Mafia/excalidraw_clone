import { Action } from "../type";

export function setActiveAction(action: Action) {
  window.action = action;
}
