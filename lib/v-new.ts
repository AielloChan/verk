import { newFnReturn, runFn } from "./newFn";
import { uuid } from "./uuid";
import { comps, fns, loadComponent, fetchs } from "./component";

const tag = "v-new";
const srcReg = new RegExp('src="./', "g");
const hrefReg = new RegExp('href="./', "g");
const hookReg = /(\$hook|uuid-)/g;
const renderHookReg = /\$renderHook/g;

class Component extends HTMLElement {
  _id = uuid();
  _name: any;
  _isSrc: any;
  _buildHtml: any;
  _child: any;
  _fn: any;
  _props: any;
  _hook: any;
  _loading: any;
  _slot = new Map();
  _html = this.innerHTML;
  _tmp = this.querySelector("template");

  destroy = false;

  constructor() {
    super();
  }
  public connectedCallback() {
    this._name = this.getAttribute("src") || this.getAttribute("name")!;
    this._isSrc = this.hasAttribute("src");

    this._props = runFn(newFnReturn(this.getAttribute("props") || "{}"));
    const list = this._name.split("/");
    list.pop();

    const dir = list.join("/");
    this._hook = {
      el: this,
      props: this._props,
      id: this._id,
      name: this._name,
      dir,
    };
    this.load();
  }
  renderLoading = () => {
    if (!this._loading && this._tmp) {
      const el = this._tmp.content.querySelector("[loading]");
      if (el) {
        this._loading = true;
        // this.innerHTML = "";
        this.append(el.cloneNode(true));
      }
    }
  };
  load = () => {
    if (fetchs.get(this._name) === 1) {
      this.renderLoading();
      requestAnimationFrame(this.load);
      return;
    }

    if (this._tmp) {
      this._tmp.innerHTML = this._tmp.innerHTML.replace(renderHookReg, this._id);
      this._tmp.content.querySelectorAll("[slot]").forEach((el) => {
        const slot = el.getAttribute("slot")!;
        const node = el.cloneNode(true) as any;
        node.removeAttribute("slot");
        this._slot.set(slot, node);
      });
    }

    if (fetchs.get(this._name) === 2) {
      this.onload();
      this.update();
      return;
    }

    if (this._isSrc) {
      this.renderLoading();
      fetchs.set(this._name, 1);
      fetch(this._name)
        .then((v) => v.text())
        .then((v) => {
          v = v.replace(srcReg, 'src="./' + this._hook.dir + "/");
          v = v.replace(hrefReg, 'href="./' + this._hook.dir + "/");
          fetchs.set(this._name, 2);
          loadComponent(v, this._name).then(() => {
            this.onload();
            this.update();
          });
        });
      return;
    }
    this.innerHTML = "";
    this.onload();
    this.update();
  };
  onload = () => {};

  update = () => {
    if (this.destroy) {
      return;
    }
    if (!comps.has(this._name)) {
      return;
    }
    if (!this._buildHtml) {
      this._buildHtml = comps.get(this._name);
      this._fn = fns.get(this._name);
    }

    (window as any)[this._id] = this._hook;
    this._buildHtml = this._buildHtml.replace(hookReg, this._id);

    const initDetail = (cb: any) => {
      this.innerHTML = this._buildHtml;
      this._slot.forEach((v: HTMLElement, k) => {
        this.querySelectorAll(`slot[name="${k}"]`).forEach((el) => {
          Array.from(el.attributes).forEach((attr) => {
            if (attr.name === "style" || attr.name === "class") {
              let old = v.getAttribute(attr.name)! || "";
              if (old) {
                old += " ";
              }
              v.setAttribute(attr.name, old + attr.value);
            } else {
              v.setAttribute(attr.name, attr.value);
            }
          });
          el.replaceWith(v.cloneNode(true));
        });
      });
      if (typeof cb === "function") {
        cb();
      }
    };

    if (this._fn) {
      Promise.resolve(this._fn(this._hook)).then(initDetail);
    } else {
      initDetail(null);
    }
  };
  public disconnectedCallback() {
    this._slot.clear();
    this._slot = null as any;
    this.destroy = true;
  }
}

customElements.define(tag, Component);
