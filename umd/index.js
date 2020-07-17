(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.$violent = factory());
}(this, function () { 'use strict';

  var glist = ['$target', '$el', '$value', '$event', '$props', '$renderState'];
  var _ = '';
  for (var i = 0; i < 8; i++) {
      glist.push('$' + _ + 'v');
      glist.push('$' + _ + 'i');
      _ += '_';
  }
  glist.forEach(function (k) {
      if (typeof window[k] === 'undefined') {
          window[k] = '';
      }
  });

  function checkSingle(node, bind, key, selector) {
      if (node.hasAttribute(key)) {
          bind(node);
      }
      node.querySelectorAll(selector).forEach(bind);
  }
  var n = 0;
  function uuid(name) {
      if (name === void 0) { name = 'u'; }
      n += 1;
      if (n > 999) {
          n = 0;
      }
      return name + Date.now().toString().slice(5, 13) + (n + '');
  }
  window.$uuid = uuid;
  function Reducer(fn, interval) {
      var time;
      var runner;
      var cancel;
      if (interval) {
          runner = setTimeout;
          cancel = clearTimeout;
      }
      else {
          runner = requestAnimationFrame;
          cancel = cancelAnimationFrame;
      }
      return function reducer(node, cb) {
          if (time) {
              cancel(time);
          }
          time = runner(function () {
              time = null;
              fn(node);
              if (cb) {
                  cb();
              }
          }, interval);
      };
  }
  function ReducerList(fn, interval) {
      var nodes = new Set();
      var time;
      var runner;
      var cancel;
      if (interval) {
          runner = setTimeout;
          cancel = clearTimeout;
      }
      else {
          runner = requestAnimationFrame;
          cancel = cancelAnimationFrame;
      }
      return function reducer(node, cb) {
          if (!nodes.has(node)) {
              nodes.add(node);
          }
          if (time) {
              cancel(time);
          }
          time = runner(function () {
              time = null;
              nodes.forEach(fn);
              nodes.clear();
              if (cb) {
                  cb();
              }
          }, interval);
      };
  }

  var middlewareByError = [];
  function onError(err, el, code) {
      console.error(err, el);
      middlewareByError.forEach(function (v) {
          v(err, el, code || '');
      });
  }

  function bindIf(node) {
      function bind(el) {
          var ifData;
          try {
              ifData = new Function('return ' + el.getAttribute('if'))();
          }
          catch (err) {
              onError(err, el);
          }
          var id = el.getAttribute('uuid');
          if (ifData) {
              if (!id) {
                  id = uuid('if');
                  el.setAttribute('uuid', id);
                  var tmp = document.createElement('div');
                  tmp.innerHTML = el.innerHTML;
                  tmp.querySelectorAll('*').forEach(function (v) {
                      v.setAttribute(id, '1');
                  });
                  el.insertAdjacentHTML('afterend', tmp.innerHTML);
              }
          }
          else if (id) {
              document.body.querySelectorAll('[' + id + ']').forEach(function (v) {
                  v.remove();
              });
              el.removeAttribute('uuid');
          }
      }
      checkSingle(node, bind, 'if', 'template[if]:not([init])');
  }

  var von = /^v-on/;
  function bindEvent(node) {
      function bind(el) {
          if (el.__events)
              return;
          var arr = el.getAttribute('bind-on').split(' ');
          arr.forEach(function (attr) {
              var key = attr.replace('v-', '');
              if (von.test(attr)) {
                  var fn_1 = new Function('$self', '$event', '$value', 'return ' + el.getAttribute(attr));
                  (el)[key] = function (event) {
                      var res;
                      var value = event && event.target && event.target.value;
                      try {
                          res = fn_1(el, event, value);
                      }
                      catch (err) {
                          onError(err, el);
                      }
                      if (typeof res === 'function') {
                          res(event);
                      }
                      queryUpdate(el.getAttribute('query'));
                  };
              }
          });
          el.__events = true;
      }
      if (node.getAttribute('bind-on')) {
          bind(node);
      }
      node.querySelectorAll('[bind-on]').forEach(bind);
  }

  function bindFor(node) {
      function bind(el) {
          if (!el.__forcode) {
              el.__forcode = el.getAttribute('for');
              el.__html = el.innerHTML;
              try {
                  el.__forData = new Function('return ' + el.__forcode)();
              }
              catch (err) {
                  onError(err, el);
              }
          }
          var forData = el.__forData;
          if (!forData) {
              return;
          }
          if (el.getAttribute('for-length') == forData.length) {
              return;
          }
          var baseHTML = el.__html;
          var html = '';
          forData.forEach(function ($v, $i) {
              var str = baseHTML.replace(/\$v/g, el.__forcode + '[' + $i + ']');
              str = str.replace(/\$i/g, $i);
              str = str.replace(/\$_/g, '$');
              html += str;
          });
          el.innerHTML = html;
          el.setAttribute('for-length', forData.length);
          bindEvent(el);
      }
      var arr = [];
      var list = node.querySelectorAll('[for]');
      var l = list.length;
      list.forEach(function (el, i) {
          arr[l - i - 1] = el;
      });
      arr.forEach(bind);
      if (node.hasAttribute('for')) {
          bind(node);
      }
  }

  function bindText(node) {
      function bind(el) {
          if (!el.getAttribute('text-save')) {
              el.setAttribute('text-save', el.getAttribute('text') || el.textContent);
          }
          var v;
          try {
              v = new Function('return ' + el.getAttribute('text-save'))();
          }
          catch (err) {
              onError(err, el);
          }
          if (el.textContent !== v) {
              el.textContent = v;
          }
      }
      checkSingle(node, bind, 'text', '[text]');
  }

  var bindList = ['oninput', 'onchange'];
  function bindModel(node) {
      function bind(el) {
          var value = el.getAttribute('bind');
          var query = el.getAttribute('query');
          function bindOn(key) {
              if (el[key]) {
                  return;
              }
              el[key] = function fn(e) {
                  var v = e.target && e.target.value || '';
                  try {
                      new Function(value + "='" + v + "'")();
                  }
                  catch (err) {
                      onError(err, el);
                  }
                  queryUpdate(query);
              };
          }
          if (el.__models) {
              bindList.forEach(bindOn);
              el.__models;
          }
          var v;
          try {
              v = (new Function('return ' + value)()) || '';
          }
          catch (err) {
              console.error(el, 'return ' + value);
          }
          if (el.value !== v) {
              requestAnimationFrame(function () {
                  requestAnimationFrame(function () {
                      el.value = v;
                  });
              });
          }
      }
      checkSingle(node, bind, 'bind', '[bind]');
  }

  function bindWatch(node) {
      function bind(el) {
          try {
              new Function('$el', el.getAttribute('watch'))(el);
          }
          catch (err) {
              onError(err, el);
          }
      }
      checkSingle(node, bind, 'watch', '[watch]');
  }

  function bindShow(node) {
      function bind(el) {
          var ifData;
          try {
              ifData = new Function('return ' + el.getAttribute('show'))();
          }
          catch (err) {
              onError(err, el);
          }
          if (ifData) {
              el.style.removeProperty('display');
          }
          else {
              el.style.display = 'none';
          }
      }
      checkSingle(node, bind, 'show', '[show]');
  }

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

  function __generator(thisArg, body) {
      var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
      return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
      function verb(n) { return function (v) { return step([n, v]); }; }
      function step(op) {
          if (f) throw new TypeError("Generator is already executing.");
          while (_) try {
              if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
              if (y = 0, t) op = [op[0] & 2, t.value];
              switch (op[0]) {
                  case 0: case 1: t = op; break;
                  case 4: _.label++; return { value: op[1], done: false };
                  case 5: _.label++; y = op[1]; op = [0]; continue;
                  case 7: op = _.ops.pop(); _.trys.pop(); continue;
                  default:
                      if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                      if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                      if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                      if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                      if (t[2]) _.ops.pop();
                      _.trys.pop(); continue;
              }
              op = body.call(thisArg, _);
          } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
          if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
      }
  }

  var regSrc = new RegExp('src="./', 'g');
  var regHref = new RegExp('href="./', 'g');
  var coms = {};
  var comScripts = {};
  var fetchs = {};
  function srcLoader(div, query) {
      return __awaiter(this, void 0, void 0, function () {
          var scripts, loaded;
          var _a;
          return __generator(this, function (_b) {
              switch (_b.label) {
                  case 0:
                      scripts = [];
                      loaded = [];
                      div.querySelectorAll(query).forEach(function (v) {
                          var sv = document.createElement('script');
                          sv.setAttribute('src', v.getAttribute('src'));
                          scripts.push(sv);
                          loaded.push(new Promise(function (res) { return sv.onload = res; }));
                          v.remove();
                      });
                      if (!(scripts.length > 0)) return [3 /*break*/, 2];
                      (_a = document.head).append.apply(_a, scripts);
                      return [4 /*yield*/, Promise.all(loaded)];
                  case 1:
                      _b.sent();
                      _b.label = 2;
                  case 2: return [2 /*return*/];
              }
          });
      });
  }
  function comTemplate(node) {
      node.querySelectorAll('template[component]').forEach(function (tmp) {
          return __awaiter(this, void 0, void 0, function () {
              var name, frag, sc;
              return __generator(this, function (_a) {
                  name = tmp.getAttribute('component');
                  if (!name || coms[name]) {
                      return [2 /*return*/];
                  }
                  frag = document.createElement('div');
                  frag.innerHTML = tmp.innerHTML;
                  sc = frag.querySelector('script:not([src])');
                  if (sc) {
                      comScripts[name] = new Function('$parent', '$id', '$props', '$ref', '$refs', sc.innerHTML);
                      sc.remove();
                      tmp.remove();
                  }
                  coms[name] = frag.innerHTML;
                  return [2 /*return*/];
              });
          });
      });
  }
  function fixIfAndRoute(tmp) {
      // 处理 if
      var theIf = tmp.getAttribute('if');
      if (theIf) {
          var ifShow = void 0;
          try {
              ifShow = new Function('return ' + theIf)();
          }
          catch (err) {
              onError(err, tmp);
          }
          if (!ifShow) {
              return false;
          }
      }
      // 处理 route
      var route = tmp.getAttribute('route');
      if (route) {
          var hash = location.hash || '/';
          if (hash.indexOf(route) !== 1) {
              return false;
          }
      }
      return true;
  }
  function updateTemplate(node) {
      node.querySelectorAll('template[uuid]').forEach(function (tmp) {
          var id = tmp.getAttribute('uuid');
          if (!id)
              return;
          if (!fixIfAndRoute(tmp)) {
              tmp.removeAttribute('uuid');
              document.body.querySelectorAll('[' + id + ']').forEach(function (el) {
                  el.remove();
              });
          }
      });
  }
  function byTemplate(node) {
      node.querySelectorAll('template[by]:not([uuid])').forEach(function (tmp) {
          return __awaiter(this, void 0, void 0, function () {
              function $ref(k, isAll) {
                  return document.body.querySelector('[' + refs[k] + ']');
              }
              function $refs(k) {
                  return document.body.querySelectorAll('[' + refs[k] + ']');
              }
              var name, loading, lid, nextEl, comp, props, baseId, id, pid, div, html, refs, useLoading, sc, res;
              return __generator(this, function (_a) {
                  switch (_a.label) {
                      case 0:
                          name = tmp.getAttribute('by');
                          if (!name)
                              return [2 /*return*/];
                          if (!fixIfAndRoute(tmp)) {
                              return [2 /*return*/];
                          }
                          loading = tmp.content.querySelector('[loading]:not([use-loading])');
                          if (loading) {
                              lid = uuid();
                              loading.setAttribute('use-loading', lid);
                              nextEl = loading.cloneNode(true);
                              nextEl.setAttribute(lid, '1');
                              tmp.insertAdjacentElement('afterend', nextEl);
                          }
                          comp = coms[name];
                          if (!comp) {
                              return [2 /*return*/];
                          }
                          props = tmp.getAttribute('props') || '{}';
                          baseId = uuid();
                          id = name + '_' + baseId;
                          pid = name + '_props_' + baseId;
                          tmp.setAttribute('uuid', id);
                          tmp.innerHTML = tmp.innerHTML.replace(/\$renderState/g, id);
                          try {
                              window[pid] = new Function('return ' + props)();
                          }
                          catch (err) {
                              onError(err, tmp, props);
                          }
                          div = document.createElement('div');
                          html = comp.replace(/\$state/g, id);
                          html = html.replace(/\$id/g, "'" + id + "'");
                          html = html.replace(/\$props/g, pid);
                          div.innerHTML = html;
                          div.querySelectorAll('*').forEach(function (el, i) {
                              el.setAttribute(id, (i + 1));
                              // el.setAttribute('ignore-observer', '1');
                          });
                          div.querySelectorAll('slot').forEach(function (el) {
                              var slot = el.getAttribute('name');
                              var next = tmp.content.querySelector('[slot="' + slot + '"]');
                              if (next) {
                                  Array.from(el.attributes).forEach(function (attr) {
                                      if (!next.getAttribute(attr.name)) {
                                          next.setAttribute(attr.name, attr.value);
                                      }
                                  });
                                  div.replaceChild(next, el);
                              }
                          });
                          refs = {};
                          div.querySelectorAll('[ref]').forEach(function (el) {
                              var ref = el.getAttribute('ref');
                              refs[ref] = 'ref_' + ref + '_' + id;
                              el.removeAttribute('ref');
                              el.setAttribute(refs[ref], "1");
                          });
                          if (!div.querySelector('[defer]')) return [3 /*break*/, 6];
                          return [4 /*yield*/, srcLoader(div, 'script[src]:not([defer])')];
                      case 1:
                          _a.sent();
                          return [4 /*yield*/, srcLoader(div, 'script[defer=""]')];
                      case 2:
                          _a.sent();
                          return [4 /*yield*/, srcLoader(div, 'script[defer="1"]')];
                      case 3:
                          _a.sent();
                          return [4 /*yield*/, srcLoader(div, 'script[defer="2"]')];
                      case 4:
                          _a.sent();
                          return [4 /*yield*/, srcLoader(div, 'script[defer="3"]')];
                      case 5:
                          _a.sent();
                          return [3 /*break*/, 8];
                      case 6: return [4 /*yield*/, srcLoader(div, 'script[src]')];
                      case 7:
                          _a.sent();
                          _a.label = 8;
                      case 8:
                          useLoading = tmp.content.querySelector('[use-loading]');
                          if (useLoading) {
                              document.body.querySelectorAll('[' + useLoading.getAttribute('use-loading') + ']').forEach(function (v) {
                                  v.remove();
                              });
                          }
                          sc = comScripts[name];
                          if (sc) {
                              try {
                                  // window[pid] 为之前计算好的 $props
                                  // 通过计算获取 $state, 赋值至 window[id]
                                  res = sc(tmp.parentElement, id, window[pid], $ref, $refs);
                              }
                              catch (err) {
                                  onError(err, tmp, sc);
                              }
                          }
                          tmp.insertAdjacentHTML('afterend', div.innerHTML);
                          Promise.resolve(res).then(function (v) {
                              (window[id]) = v;
                              requestAnimationFrame(function () {
                                  updateAll(tmp.parentElement, function () {
                                      if (v.$mount) {
                                          v.$mount(window[id]);
                                      }
                                  });
                              });
                          });
                          return [2 /*return*/];
                  }
              });
          });
      });
  }
  function fetchTemplate(node) {
      node.querySelectorAll('template[fetch]:not([fetch-loaded])').forEach(function (tmp) {
          tmp.setAttribute('fetch-loaded', '1');
          var url = tmp.getAttribute('fetch');
          if (!url || fetchs[url]) {
              return;
          }
          fetchs[url] = true;
          fetch(url, {
              mode: 'cors',
              cache: tmp.getAttribute('cache') || 'no-cache',
          }).then(function (v) { return v.text(); }).then(function (code) {
              if (!code)
                  return;
              var ele = document.createElement('div');
              // fix ./url
              var dir = url.split('/');
              dir.pop();
              var dirURL = dir.join('/') + '/';
              code = code.replace(regSrc, 'src="' + dirURL);
              code = code.replace(regHref, 'href="' + dirURL);
              code = code.replace(/\$dir/, "'" + dirURL + "'");
              ele.innerHTML = code;
              comTemplate(ele);
              requestAnimationFrame(function () {
                  bindTemplate(node);
              });
          }).catch(function (err) {
              fetchs[url] = false;
          });
      });
  }
  function bindTemplate(node) {
      fetchTemplate(node);
      comTemplate(node);
      requestAnimationFrame(function () {
          byTemplate(node);
      });
  }

  function bindAttr(node) {
      function bind(el) {
          var attrs = el.getAttribute('bind-attr');
          attrs.split(' ').forEach(function (attr) {
              var v = '';
              try {
                  v = new Function('return ' + el.getAttribute(attr))();
              }
              catch (err) {
                  onError(err, el);
              }
              el.setAttribute(attr.replace('v-', ''), v);
          });
      }
      checkSingle(node, bind, 'bind-attr', '[bind-attr]');
  }

  var vof = /^v-/;
  var von$1 = /^v-on/;
  function setViolent(node) {
      node.querySelectorAll('*').forEach(function (e) {
          if (e.getAttribute('bind-on') || e.getAttribute('bind-attr')) {
              return;
          }
          var attr = '';
          var on = '';
          Array.from(e.attributes).forEach(function (v) {
              if (von$1.test(v.name)) {
                  on += v.name + ' ';
              }
              else if (vof.test(v.name)) {
                  attr += v.name + ' ';
              }
          });
          if (attr) {
              e.setAttribute('bind-attr', attr.trim());
          }
          if (on) {
              e.setAttribute('bind-on', on.trim());
          }
      });
  }
  function queryUpdate(query) {
      query = query && query !== '*' ? query : '[violent]';
      document.querySelectorAll(query).forEach(function (v) {
          updateAttrs(v);
      });
  }
  var updateAttrs = ReducerList(function (node) {
      updateAsync(node);
  });
  var middlewareByUpdate = [updateTemplate, byTemplate, bindIf, bindFor, bindShow, bindModel, bindText, bindAttr, bindWatch];
  function updateAsync(node) {
      middlewareByUpdate.forEach(function (fn) {
          fn(node);
      });
  }
  var middlewareByInit = [bindTemplate, bindEvent];
  var updateAll = ReducerList(function (node) {
      updateAsync(node);
      middlewareByInit.forEach(function (fn) {
          fn(node);
      });
  });

  var $violent = {
      update: updateAll,
      middlewareByUpdate: middlewareByUpdate,
      middlewareByInit: middlewareByInit,
      Reducer: Reducer,
      ReducerList: ReducerList,
  };
  window.addEventListener('load', function () {
      document.querySelectorAll('[violent]').forEach(function (el) {
          setViolent(el);
          updateAll(el);
          setTimeout(function () {
              if (el.style.visibility === 'hidden') {
                  el.style.visibility = 'visible';
              }
          }, 200);
      });
  });

  return $violent;

}));
