import { Controller } from "stimulus";
import hljs from "highlight.js";

const format = text => {
  let trimmed = text.replace(/(^\s*\n|\n\s*$)/g, "");
  const spaces = trimmed.match(/^\s*/)[0];
  return trimmed.replace(new RegExp(`^${spaces}`, "gm"), "");
};

export default class extends Controller {
  static targets = ["source"];
  initialize() {
    const pre = document.createElement("pre");
    const code = document.createElement("code");
    code.classList.add("html", "px-3");
    pre.appendChild(code);
    this.element.prepend(pre);
  }

  connect() {
    this.codeElement.textContent = format(this.sourceTarget.innerHTML);
    hljs.highlightBlock(this.codeElement);
  }

  get codeElement() {
    return this.element.querySelector("code");
  }
}
