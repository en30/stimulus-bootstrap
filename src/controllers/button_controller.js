import { Controller } from "stimulus";

const DATA_KEY = "bs.button";
const EVENT_KEY = `.${DATA_KEY}`;
const DATA_API_KEY = ".data-api";

const ClassName = {
  ACTIVE: "active",
  BUTTON: "btn",
  FOCUS: "focus"
};

const Selector = {
  DATA_CONTROLLER: '[data-controller="button"]',
  DATA_TOGGLE_CARROT: '[data-toggle^="button"]',
  DATA_TOGGLE: '[data-toggle="buttons"]',
  INPUT: "input",
  ACTIVE: ".active",
  BUTTON: ".btn"
};

const Event = {
  CLICK_DATA_API: `click${EVENT_KEY}${DATA_API_KEY}`,
  FOCUS_BLUR_DATA_API:
    `focus${EVENT_KEY}${DATA_API_KEY} ` + `blur${EVENT_KEY}${DATA_API_KEY}`
};

export default class extends Controller {
  toggle(event) {
    let triggerChangeEvent = true;
    let addAriaPressed = true;
    const btn = event.currentTarget;
    const rootElement = btn.closest(Selector.DATA_CONTROLLER);

    if (rootElement) {
      const input = btn.querySelector(Selector.INPUT);

      if (input) {
        if (input.type === "radio") {
          if (input.checked && btn.classList.contains(ClassName.ACTIVE)) {
            triggerChangeEvent = false;
          } else {
            const activeElement = rootElement.querySelector(Selector.ACTIVE);
            if (activeElement) {
              activeElement.classList.remove(ClassName.ACTIVE);
            }
          }
        }

        if (triggerChangeEvent) {
          if (
            input.hasAttribute("disabled") ||
            rootElement.hasAttribute("disabled") ||
            input.classList.contains("disabled") ||
            rootElement.classList.contains("disabled")
          ) {
            return;
          }
          input.checked = !btn.classList.contains(ClassName.ACTIVE);
          input.dispatchEvent(new window.Event("change"));
        }

        input.focus();
        addAriaPressed = false;
      }
    }

    if (addAriaPressed) {
      btn.setAttribute(
        "aria-pressed",
        !this.element.classList.contains(ClassName.ACTIVE)
      );
    }

    if (triggerChangeEvent) {
      btn.classList.toggle(ClassName.ACTIVE);
    }
  }
}
