import { newFnReturn } from "./newFn";
import { events } from "./ob";
import { uuid } from "./uuid";
import { comps, fns, loadComponent, fetchs } from "./component";

const tag = "v-new";
const srcReg = new RegExp('(src|href)=".', "g");
const hookReg = /(\$hook|verk-)/g;

class Component extends HTMLElement {
  _name = this.getAttribute("src") || this.getAttribute("name")!;
  _id = uuid();
  _isSrc = this.hasAttribute("src");
  _html: any;
  _fn: any;
  _props = newFnReturn(this.getAttribute("props") || "{}")();
  _hook = {
    el: this,
    props: this._props,
    id: this._id,
    name: this._name,
  };
  constructor() {
    super();
    this.load();
  }
  load = () => {
    if (fetchs.get(this._name) === 1) {
      requestAnimationFrame(this.load);
      return;
    }
    if (fetchs.get(this._name) === 2) {
      this.onUpdate();
      return;
    }
    if (this._isSrc) {
      fetchs.set(this._name, 1);
      fetch(this._name)
        .then((v) => v.text())
        .then((v) => {
          let list = this._name.split("/");
          list.pop();
          if (list[0] === ".") {
            list.shift();
          }
          const dir = list.join("/");
          v = v.replace(srcReg, 'src="' + dir);
          fetchs.set(this._name, 2);
          loadComponent(v, this._name).then(() => {
            this.onUpdate();
          });
        });
      return;
    }
    this.onUpdate();
  };
  onUpdate = () => {
    if (!this._html) {
      this._html = comps.get(this._name);
      this._fn = fns.get(this._name);
    }

    if (!this._html) {
      return;
    }

    (window as any)[this._id] = this._hook;
    this._html = this._html.replace(hookReg, this._id);

    if (this._fn) {
      Promise.resolve(this._fn(this._hook)).then((cb) => {
        this.innerHTML = this._html;
        if (typeof cb === "function") {
          cb();
        }
      });
    } else {
      this.innerHTML = this._html;
    }
  };
  public disconnectedCallback() {
    events.delete(this._id);
  }
}

customElements.define(tag, Component);
