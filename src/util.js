export const one = (elem, eventName, handler) => {
  const f = function(event) {
    handler.bind(this).call(event);
    elem.removeEventListener(eventName, f);
  };
  elem.addEventListener(eventName, f);
};

export const fire = (obj, name, data) => {
  const event = new CustomEvent(name, {
    bubbles: true,
    cancelable: true,
    detail: data
  });
  obj.dispatchEvent(event);
  !event.defaultPrevented;
  return event;
};
