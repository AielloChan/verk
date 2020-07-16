import { HTMLAny } from './interface'
import { checkSingle } from './utils';
import { buildCss } from './runtimeFlavorcss';
import './runtimeFlavorcss'
import { onError } from './onError';


export default function bindCss(node: HTMLAny) {
  function bind(el: HTMLAny) {
    const str = el.getAttribute('css')!;
    if (!str) {
      return;
    }
    let code = '';
    if (str.indexOf('{') > -1) {
      let list: any;
      try {
        list = new Function('return ' + str)();
      } catch (err) {
        onError(err, el);
      }

      Object.keys(list).forEach(k => {
        const v = list[k]
        if (v) {
          code += k + ' '
        }
      })
    } else {
      code = str;
    }

    buildCss(code)

    if (el.className !== code) {
      el.className = code;
    }
  }
  checkSingle(node, bind, 'css', '[css]')
}