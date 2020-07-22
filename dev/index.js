(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.$verk = factory());
}(this, function () { 'use strict';

  function newFnReturn(code) {
      return new Function("return " + code);
  }
  function newFnRun(code) {
      return new Function("$hook", code);
  }

  const watch = new Set();
  const events = new Map();
  function dispatch() {
      watch.forEach((fn) => fn());
      events.forEach((v, k) => {
          v();
      });
  }

  var verk = /*#__PURE__*/Object.freeze({
    __proto__: null,
    watch: watch,
    events: events,
    dispatch: dispatch
  });

  let n = 0;
  function uuid(u = "u") {
      n += 1;
      if (n > 9990) {
          n = 0;
      }
      return u + Date.now().toString().slice(4, 13) + n + '_';
  }

  const tag = "v-for";
  class Component extends HTMLElement {
      constructor() {
          super();
          this._id = uuid("v_for");
          this._getVal = newFnReturn(this.getAttribute("data"));
          this._v = new RegExp(this.getAttribute("value") || "\\$v", "g");
          this._i = new RegExp(this.getAttribute("index") || "\\$i", "g");
          this._html = this.innerHTML;
          this.onUpdate = () => {
              const val = this._getVal();
              if (val && val.length > 0) {
                  let nextHTML = "";
                  val.forEach((v, i) => {
                      let h = this._html.replace(this._v, v);
                      h = h.replace(this._i, i);
                      nextHTML += h;
                  });
                  this.innerHTML = nextHTML;
              }
              else {
                  this.innerHTML = "";
              }
          };
          events.set(this._id, this.onUpdate);
          this.onUpdate();
      }
      disconnectedCallback() {
          events.delete(this._id);
      }
  }
  customElements.define(tag, Component);

  const tag$1 = "v-txt";
  class Component$1 extends HTMLElement {
      constructor() {
          super();
          this._text = newFnReturn(this.innerHTML);
          this._id = uuid("v_txt");
          this.onUpdate = () => {
              this.innerHTML = this._text();
          };
          events.set(this._id, this.onUpdate);
          this.onUpdate();
      }
      disconnectedCallback() {
          events.delete(this._id);
      }
  }
  customElements.define(tag$1, Component$1);

  const tag$2 = "v-if";
  class Component$2 extends HTMLElement {
      constructor() {
          super();
          this._id = uuid('v_if');
          this._html = this.innerHTML;
          this._getVal = newFnReturn(this.getAttribute("value"));
          this.onUpdate = () => {
              if (this._getVal()) {
                  this.innerHTML = this._html;
              }
              else {
                  this.innerHTML = "";
              }
          };
          events.set(this._id, this.onUpdate);
          this.onUpdate();
      }
      disconnectedCallback() {
          events.delete(this._id);
      }
  }
  customElements.define(tag$2, Component$2);

  const tag$3 = "v-show";
  class Component$3 extends HTMLElement {
      constructor() {
          super();
          this._id = uuid("v_show");
          this._html = this.innerHTML;
          this._getVal = newFnReturn(this.getAttribute("value"));
          this._display = this.style.display;
          this.onUpdate = () => {
              if (this._getVal()) {
                  this.style.display = this._display;
              }
              else {
                  this.style.display = "none";
              }
          };
          events.set(this._id, this.onUpdate);
          this.onUpdate();
      }
      disconnectedCallback() {
          events.delete(this._id);
      }
  }
  customElements.define(tag$3, Component$3);

  const tag$4 = "v-set";
  class Component$4 extends HTMLElement {
      constructor() {
          super();
          this._id = uuid("fn");
          this._html = this.innerHTML;
          this._getVal = newFnReturn(this.getAttribute("value"));
          this._attrs = [];
          this.text = () => {
              return new Function("return " + this.innerHTML)();
          };
          this.onUpdate = () => {
              if (this.firstElementChild) {
                  Object.keys(this._attrs).forEach((k) => {
                      const v = this._attrs[k]();
                      if (this.firstElementChild.getAttribute(k) !== v) {
                          this.firstElementChild.setAttribute(k, v);
                      }
                  });
              }
          };
          events.set(this._id, this.onUpdate);
          if (this.firstElementChild) {
              Array.from(this.attributes).map((attr) => {
                  if (/^on/.test(attr.name)) {
                      this.firstElementChild[attr.name] = function (e) {
                          newFnReturn(attr.value)()(e);
                          dispatch();
                      };
                  }
                  else {
                      const name = attr.name.replace(/^v-/, '');
                      this._attrs[name] = newFnReturn(attr.value);
                  }
              });
          }
          this.onUpdate();
      }
      disconnectedCallback() {
          events.delete(this._id);
      }
  }
  customElements.define(tag$4, Component$4);

  /*! *****************************************************************************
  Copyright (c) Microsoft Corporation. All rights reserved.
  Licensed under the Apache License, Version 2.0 (the "License"); you may not use
  this file except in compliance with the License. You may obtain a copy of the
  License at http://www.apache.org/licenses/LICENSE-2.0

  THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
  KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
  WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
  MERCHANTABLITY OR NON-INFRINGEMENT.

  See the Apache Version 2.0 License for specific language governing permissions
  and limitations under the License.
  ***************************************************************************** */

  function __awaiter(thisArg, _arguments, P, generator) {
      return new (P || (P = Promise))(function (resolve, reject) {
          function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
          function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
          function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
          step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
  }

  const comps = new Map();
  const fns = new Map();
  const fetchs = new Map();
  const vstart = new RegExp("<v-", "g");
  const vend = new RegExp("</v-", "g");
  const sstart = new RegExp("<v_", "g");
  const send = new RegExp("</v_", "g");
  function loadSc(sc, list) {
      list.push(new Promise((res) => {
          const src = sc.getAttribute("src");
          function getFetch() {
              if (fetchs.get(src) === 1) {
                  requestAnimationFrame(getFetch);
                  return;
              }
              if (fetchs.get(src) === 2) {
                  res();
                  return;
              }
              fetchs.set(src, 1);
              fetch(src)
                  .then((v) => {
                  if (v.ok) {
                      return v.text();
                  }
                  return new Promise((res) => res(""));
              })
                  .then((v) => {
                  if (v) {
                      newFnRun(v)();
                      fetchs.set(src, 2);
                  }
                  else {
                      fetchs.set(src, 0);
                  }
                  res();
              });
          }
          getFetch();
      }));
  }
  function elLoadSc(el, query, list) {
      el.querySelectorAll(query).forEach((sc) => {
          loadSc(sc, list);
          sc.remove();
      });
  }
  function loadComponent(html, name) {
      return new Promise((res) => __awaiter(this, void 0, void 0, function* () {
          if (!html) {
              return;
          }
          fetchs.set(name, 1);
          html = html.replace(vstart, "<v_");
          html = html.replace(vend, "</v_");
          const el = document.createElement("div");
          el.innerHTML = html;
          el.querySelectorAll("v_component").forEach((com) => {
              loadComponent(com.innerHTML, com.getAttribute("name"));
              com.remove();
          });
          const tmp = el.querySelector("template");
          if (tmp) {
              yield loadComponent(tmp.innerHTML, name);
              return;
          }
          const promiseList = [];
          elLoadSc(el, "script[src]:not([defer])", promiseList);
          if (el.querySelector("script[defer]")) {
              elLoadSc(el, 'script[defer=""]', promiseList);
              elLoadSc(el, 'script[defer="1"]', promiseList);
              elLoadSc(el, 'script[defer="2"]', promiseList);
              elLoadSc(el, 'script[defer="3"]', promiseList);
          }
          yield Promise.all(promiseList);
          el.querySelectorAll("script:not([src])").forEach((sc) => {
              fns.set(name, newFnRun(sc.innerHTML));
              sc.remove();
          });
          html = el.innerHTML;
          html = html.replace(sstart, "<v-");
          html = html.replace(send, "</v-");
          comps.set(name, html);
          fetchs.set(name, 2);
          res();
      }));
  }

  const tag$5 = "v-component";
  class Component$5 extends HTMLElement {
      constructor() {
          super();
          // html: any;
          this._name = this.getAttribute("name");
          loadComponent(this.innerHTML, this._name);
      }
  }
  customElements.define(tag$5, Component$5);

  const tag$6 = "v-new";
  const srcReg = new RegExp('(src|href)=".', "g");
  const hookReg = /(\$hook|verk-)/g;
  class Component$6 extends HTMLElement {
      constructor() {
          super();
          this._name = this.getAttribute("src") || this.getAttribute("name");
          this._id = uuid();
          this._isSrc = this.hasAttribute("src");
          this._props = newFnReturn(this.getAttribute("props") || "{}")();
          this._hook = {
              el: this,
              props: this._props,
              id: this._id,
              name: this._name,
          };
          this.load = () => {
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
          this.onUpdate = () => {
              if (!this._html) {
                  this._html = comps.get(this._name);
                  this._fn = fns.get(this._name);
              }
              if (!this._html) {
                  return;
              }
              window[this._id] = this._hook;
              this._html = this._html.replace(hookReg, this._id);
              if (this._fn) {
                  Promise.resolve(this._fn(this._hook)).then((cb) => {
                      this.innerHTML = this._html;
                      if (typeof cb === "function") {
                          cb();
                      }
                  });
              }
              else {
                  this.innerHTML = this._html;
              }
          };
          this.load();
      }
      disconnectedCallback() {
          events.delete(this._id);
      }
  }
  customElements.define(tag$6, Component$6);

  const tag$7 = "v-watch";
  class Component$7 extends HTMLElement {
      constructor() {
          super();
          this._id = uuid("v_watch");
          this._getVal = newFnRun(this.getAttribute("value"));
          events.set(this._id, this._getVal);
      }
      disconnectedCallback() {
          events.delete(this._id);
      }
  }
  customElements.define(tag$7, Component$7);

  const tag$8 = "v-route";
  class Component$8 extends HTMLElement {
      constructor() {
          super();
          this._id = uuid("v_route");
          this._html = this.innerHTML;
          this._getVal = newFnReturn(this.getAttribute("value"));
          this.onUpdate = () => {
              const path = this.getAttribute("path") || this._getVal();
              if (location.hash.indexOf(path) === 0) {
                  this.innerHTML = this._html;
              }
              else {
                  this.innerHTML = "";
              }
          };
          events.set(this._id, this.onUpdate);
          this.onUpdate();
      }
      disconnectedCallback() {
          events.delete(this._id);
      }
  }
  customElements.define(tag$8, Component$8);

  window.$verk = verk;

  return verk;

}));
