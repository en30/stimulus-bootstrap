import { Controller } from "stimulus";
import { fire, one } from "../util";

const NAME = "alert";
const DATA_KEY = "bs.alert";
const EVENT_KEY = `.${DATA_KEY}`;

const Event = {
  CLOSE: `close${EVENT_KEY}`,
  CLOSED: `closed${EVENT_KEY}`
};

const ClassName = {
  ALERT: "alert",
  FADE: "fade",
  SHOW: "show"
};

export default class extends Controller {
  close() {
    const customEvent = this._triggerCloseEvent();

    if (customEvent.defaultPrevented) {
      return;
    }

    this._removeElement();
  }

  _triggerCloseEvent() {
    return fire(this.element, Event.CLOSE);
  }

  _removeElement() {
    this.element.classList.remove(ClassName.SHOW);

    if (!this.element.classList.contains(ClassName.FADE)) {
      this._destroyElement();
      return;
    }

    one(this.element, "transitionend", event => this._destroyElement());
  }

  _destroyElement(element) {
    fire(this.element, Event.CLOSED);
    this.element.parentNode.removeChild(this.element);
  }
}
