!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):(e=e||self).$verk=t()}(this,function(){"use strict";for(var e=["$target","$el","$value","$event","$props","$renderState"],t="",n=0;n<8;n++)e.push("$"+t+"v"),e.push("$"+t+"i"),t+="_";function r(e,t,n,r){e.hasAttribute(n)&&t(e),e.querySelectorAll(r).forEach(t)}e.forEach(function(e){void 0===window[e]&&(window[e]="")});var o=0;function y(e){return void 0===e&&(e="u"),999<(o+=1)&&(o=0),e+Date.now().toString().slice(5,13)+(o+"")}function u(n,r){var o,u,i,c=new Set;return i=r?(u=setTimeout,clearTimeout):(u=requestAnimationFrame,cancelAnimationFrame),function(e,t){c.has(e)||c.add(e),o&&i(o),o=u(function(){o=null,c.forEach(n),c.clear(),t&&t()},r)}}window.$uuid=y;var i=[];function g(t,n,r){console.error(t,n),i.forEach(function(e){e(t,n,r||"")})}var c=/^v-on/;function a(e){function t(o){o.__events||(o.getAttribute("verk-on").split(" ").forEach(function(e){var n=e.replace("v-","");if(c.test(e)){var r=new Function("$el","$event","return "+o.getAttribute(e));o[n]=function(e){var t;o.getAttribute("prevent-"+n)&&e.preventDefault(),o.getAttribute("stop-"+n)&&e.stopPropagation();try{t=r(o,e)}catch(e){g(e,o)}"function"==typeof t&&t(e),A(o.getAttribute("v-query"))}}}),o.__events=!0)}e.getAttribute("verk-on")&&t(e),e.querySelectorAll("[verk-on]").forEach(t)}function l(u,i,c,a){return new(c=c||Promise)(function(e,t){function n(e){try{o(a.next(e))}catch(e){t(e)}}function r(e){try{o(a.throw(e))}catch(e){t(e)}}function o(t){t.done?e(t.value):new c(function(e){e(t.value)}).then(n,r)}o((a=a.apply(u,i||[])).next())})}function _(n,r){var o,u,i,e,c={label:0,sent:function(){if(1&i[0])throw i[1];return i[1]},trys:[],ops:[]};return e={next:t(0),throw:t(1),return:t(2)},"function"==typeof Symbol&&(e[Symbol.iterator]=function(){return this}),e;function t(t){return function(e){return function(t){if(o)throw new TypeError("Generator is already executing.");for(;c;)try{if(o=1,u&&(i=2&t[0]?u.return:t[0]?u.throw||((i=u.return)&&i.call(u),0):u.next)&&!(i=i.call(u,t[1])).done)return i;switch(u=0,i&&(t=[2&t[0],i.value]),t[0]){case 0:case 1:i=t;break;case 4:return c.label++,{value:t[1],done:!1};case 5:c.label++,u=t[1],t=[0];continue;case 7:t=c.ops.pop(),c.trys.pop();continue;default:if(!(i=0<(i=c.trys).length&&i[i.length-1])&&(6===t[0]||2===t[0])){c=0;continue}if(3===t[0]&&(!i||t[1]>i[0]&&t[1]<i[3])){c.label=t[1];break}if(6===t[0]&&c.label<i[1]){c.label=i[1],i=t;break}if(i&&c.label<i[2]){c.label=i[2],c.ops.push(t);break}i[2]&&c.ops.pop(),c.trys.pop();continue}t=r.call(n,c)}catch(e){t=[6,e],u=0}finally{o=i=0}if(5&t[0])throw t[1];return{value:t[0]?t[1]:void 0,done:!0}}([t,e])}}}var f=new RegExp('src="./',"g"),s=new RegExp('href="./',"g"),w={},E={},v={};function $(o,u){return l(this,void 0,void 0,function(){var n,r,t;return _(this,function(e){switch(e.label){case 0:return n=[],r=[],o.querySelectorAll(u).forEach(function(e){var t=document.createElement("script");t.setAttribute("src",e.getAttribute("src")),n.push(t),r.push(new Promise(function(e){return t.onload=e})),e.remove()}),0<n.length?((t=document.head).append.apply(t,n),[4,Promise.all(r)]):[3,2];case 1:e.sent(),e.label=2;case 2:return[2]}})})}function d(e){e.querySelectorAll("template[v-component]").forEach(function(o){return l(this,void 0,void 0,function(){var t,n,r;return _(this,function(e){return!(t=o.getAttribute("v-component"))||w[t]||((n=document.createElement("div")).innerHTML=o.innerHTML,(r=n.querySelector("script:not([src])"))&&(E[t]=new Function("$parent","$id","$props","$ref","$refs",r.innerHTML),r.remove(),o.remove()),w[t]=n.innerHTML),[2]})})})}function q(t){var e=t.getAttribute("v-if");if(e){var n=void 0;try{n=new Function("return "+e)()}catch(e){g(e,t)}if(!n)return!1}var r=t.getAttribute("v-route");if(r&&1!==(location.hash||"/").indexOf(r))return!1;return!0}function m(e){e.querySelectorAll("template[v-by]:not([uuid])").forEach(function(A){return l(this,void 0,void 0,function(){function t(e,t){return document.body.querySelector("["+m[e]+"]")}function n(e){return document.body.querySelectorAll("["+m[e]+"]")}var r,o,u,i,c,a,l,f,s,v,d,m,h,p,b;return _(this,function(e){switch(e.label){case 0:if(!(r=A.getAttribute("v-by")))return[2];if(!q(A))return[2];if((o=A.content.querySelector("[v-loading]:not([use-loading])"))&&(u=y(),o.setAttribute("use-loading",u),(i=o.cloneNode(!0)).setAttribute(u,""),A.insertAdjacentElement("afterend",i)),!(c=w[r]))return[2];a=A.getAttribute("v-props")||"{}",l=y(),f=r+"_"+l,s=r+"_props_"+l,A.setAttribute("uuid",f),A.innerHTML=A.innerHTML.replace(/\$renderState/g,f);try{window[s]=new Function("return "+a)()}catch(e){g(e,A,a)}return v=document.createElement("div"),d=(d=(d=c.replace(/\$state/g,f)).replace(/\$id/g,"'"+f+"'")).replace(/\$props/g,s),v.innerHTML=d,v.querySelectorAll("*").forEach(function(e,t){e.setAttribute(f,t+1)}),v.querySelectorAll("slot").forEach(function(e){var t=e.getAttribute("name"),n=A.content.querySelector('[slot="'+t+'"]');n&&(Array.from(e.attributes).forEach(function(e){n.getAttribute(e.name)||n.setAttribute(e.name,e.value)}),v.replaceChild(n,e))}),m={},v.querySelectorAll("[v-ref]").forEach(function(e){var t=e.getAttribute("v-ref");m[t]="ref_"+t+"_"+f,e.removeAttribute("v-ref"),e.setAttribute(m[t],"1")}),S(v),v.querySelector("[defer]")?[4,$(v,"script[src]:not([defer])")]:[3,6];case 1:return e.sent(),[4,$(v,'script[defer=""]')];case 2:return e.sent(),[4,$(v,'script[defer="1"]')];case 3:return e.sent(),[4,$(v,'script[defer="2"]')];case 4:return e.sent(),[4,$(v,'script[defer="3"]')];case 5:return e.sent(),[3,8];case 6:return[4,$(v,"script[src]")];case 7:e.sent(),e.label=8;case 8:if((h=A.content.querySelector("[use-loading]"))&&document.body.querySelectorAll("["+h.getAttribute("use-loading")+"]").forEach(function(e){e.remove()}),p=E[r])try{b=p(A.parentElement,f,window[s],t,n)}catch(e){g(e,A,p)}return A.insertAdjacentHTML("afterend",v.innerHTML),Promise.resolve(b).then(function(e){window[f]=e,requestAnimationFrame(function(){L(A.parentElement,function(){e.$mount&&e.$mount(window[f])})})}),[2]}})})})}function h(e){!function(u){u.querySelectorAll("template[v-fetch]:not([fetch-loaded])").forEach(function(e){e.setAttribute("fetch-loaded","");var o=e.getAttribute("v-fetch");o&&!v[o]&&(v[o]=!0,fetch(o,{mode:"cors",cache:e.getAttribute("cache")||"no-cache"}).then(function(e){return e.text()}).then(function(e){if(e){var t=document.createElement("div"),n=o.split("/");n.pop();var r=n.join("/")+"/";e=(e=(e=e.replace(f,'src="'+r)).replace(s,'href="'+r)).replace(/\$dir/,"'"+r+"'"),t.innerHTML=e,d(t),requestAnimationFrame(function(){h(u)})}}).catch(function(e){v[o]=!1}))})}(e),d(e),requestAnimationFrame(function(){m(e)})}var p=/^v-(?!if|for|model|show|by|fetch|component|css|watch)/,b=/^v-on/;function S(e){e.querySelectorAll("*").forEach(function(e){if(!e.getAttribute("verk-on")&&!e.getAttribute("verk-attr")){var t="",n="";Array.from(e.attributes).forEach(function(e){b.test(e.name)?n+=e.name+" ":p.test(e.name)&&(t+=e.name+" ")}),t&&e.setAttribute("verk-attr",t.trim()),n&&e.setAttribute("verk-on",n.trim())}})}function A(e){e=e&&"*"!==e?e:"[v-verk]",document.querySelectorAll(e).forEach(function(e){k(e)})}var k=u(function(e){T(e)}),x=[function(e){e.querySelectorAll("template[uuid]").forEach(function(e){var t=e.getAttribute("uuid");t&&(q(e)||(e.removeAttribute("uuid"),document.body.querySelectorAll("["+t+"]").forEach(function(e){e.remove()})))})},m,function(e){r(e,function(t){var e;t.style.display="none";try{"function"==typeof(e=new Function("$el","return "+t.getAttribute("v-if"))(t))&&(e=e())}catch(e){g(e,t)}var n=t.getAttribute("uuid");if(e){if(!n){n=y("if"),t.setAttribute("uuid",n);var r=document.createElement("div");r.innerHTML=t.innerHTML,r.querySelectorAll("*").forEach(function(e){e.setAttribute(n,"")}),t.insertAdjacentHTML("afterend",r.innerHTML)}}else n&&(document.body.querySelectorAll("["+n+"]").forEach(function(e){e.remove()}),t.removeAttribute("uuid"))},"v-if","[v-if]:not([v-by])")},function(e){function t(r){if(!r.__forcode){r.__forcode=r.getAttribute("v-for"),r.__html=r.innerHTML;try{r.__forData=new Function("$el","return "+r.__forcode)(r)}catch(e){g(e,r)}}var e=r.__forData;if(e&&r.getAttribute("for-length")!=e.length){var o=r.__html,u="";e.forEach(function(e,t){var n=o.replace(/\$v/g,r.__forcode+"["+t+"]");n=(n=n.replace(/\$i/g,t)).replace(/\$_/g,"$"),u+=n}),r.innerHTML=u,r.setAttribute("for-length",e.length),a(r)}}var n=[],r=e.querySelectorAll("[v-for]"),o=r.length;r.forEach(function(e,t){n[o-t-1]=e}),n.forEach(t),e.hasAttribute("v-for")&&t(e)},function(e){r(e,function(t){var e;try{"function"==typeof(e=new Function("$el","return "+t.getAttribute("v-show"))(t))&&(e=e())}catch(e){g(e,t)}e?t.style.removeProperty("display"):t.style.display="none"},"v-show","[v-show]")},function(e){r(e,function(i){var e,t,c=i.getAttribute("v-model"),a=i.getAttribute("v-query");if(function(e){if(!e.__modelName){var t=e.tagName.toLowerCase(),n=e.type;e.__modelName="select"===t?"onchange":"input"===t||"textarea"===t?"oninput":"onclick","select"===t?e.__valueName="value":"checkbox"===n?(e.__valueName="checked",e.__valueIsBool=!0):"radio"===n?(e.__modelName="onclick",e.__valueName="checked",e.__valueIsBool=!0):e.__valueName="value"}}(i),i.__models||(i[i.__modelName]=function(e){i.getAttribute("prevent-"+i.__modelName)&&e.preventDefault(),i.getAttribute("stop-"+i.__modelName)&&e.stopPropagation();var t,n,r=e.target&&e.target[i.__valueName]||"";if(i.__valueIsBool){var o=i.getAttribute("v-value"),u=i.getAttribute("value");t=o?c+"["+o+"] = !"+c+"["+o+"]; return "+c+"["+o+"];":u?c+"['"+u+"'] = !"+c+"['"+u+"']; return "+c+"['"+u+"'];":c+"="+!!r+"; return "+c+";"}else t=c+"=`"+r+"`; return "+c+";";try{n=new Function("$el",t)(i)}catch(e){g(e,i)}i[i.__valueName]!==n&&(i[i.__valueName]=n),A(a)},i.__models=!0),i.__valueIsBool){var n=i.getAttribute("v-value"),r=i.getAttribute("value");t=r?"return "+c+"['"+r+"']":n?"return "+c+"["+n+"]":"return "+c}else t="return "+c;try{e=new Function(t)()||""}catch(e){g(e,i)}i[i.__valueName]!==e&&requestAnimationFrame(function(){i[i.__valueName]=e})},"v-model","[v-model]")},function(e){r(e,function(t){var e;t.getAttribute("text-save")||t.setAttribute("text-save",t.getAttribute("v-text")||t.textContent);try{"function"==typeof(e=new Function("$el","return "+t.getAttribute("text-save"))(t))&&(e=e())}catch(e){g(e,t)}t.textContent!==e&&(t.textContent=e)},"v-text","[v-text]")},function(e){r(e,function(n){n.getAttribute("verk-attr").split(" ").forEach(function(e){var t;try{"function"==typeof(t=new Function("$el","return "+n.getAttribute(e))(n))&&(t=t())}catch(e){g(e,n)}n.setAttribute(e.replace("v-",""),t)})},"verk-attr","[verk-attr]")},function(e){r(e,function(t){try{var e=new Function("$el",t.getAttribute("v-watch"))(t);"function"==typeof e&&e()}catch(e){g(e,t)}},"v-watch","[v-watch]")}];function T(t){x.forEach(function(e){e(t)})}var F=[h,a],L=u(function(e){function t(t){T(t),F.forEach(function(e){e(t)})}e?t(e):document.querySelectorAll("[v-verk]").forEach(t)}),N={update:L,middlewareByUpdate:x,middlewareByInit:F,Reducer:function(n,r){var o,u,i;return i=r?(u=setTimeout,clearTimeout):(u=requestAnimationFrame,cancelAnimationFrame),function(e,t){o&&i(o),o=u(function(){o=null,n(e),t&&t()},r)}},ReducerList:u};return window.addEventListener("load",function(){document.querySelectorAll("[v-verk]").forEach(function(e){S(e),L(e),setTimeout(function(){"hidden"===e.style.visibility&&(e.style.visibility="visible")},200)})}),N});
