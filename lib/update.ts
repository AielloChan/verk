import { HTMLAny } from './interface'
import bindIf from './bindIf';
import bindFor from './bindFor';
import bindText from './bindText';
import bindBind from './bindBind';
import bindCss from './bindCss';
import bindWatch from './bindWatch';
import bindShow from './bindShow';
import { updateTemplate, initTemplate } from './bindTemplate';
import { Reducer } from './utils';

export function queryUpdate(query: string | null) {
  if (query) {
    document.body.querySelectorAll(query).forEach(function (v) {
      update(v)
    })
  } else {
    update(document.body)
  }
}

export const update = Reducer(function (node) {
  updateAsync(node)
});

export const middlewareByUpdate: Function[] = [updateTemplate, initTemplate, bindIf, bindFor, bindShow, bindCss, bindBind, bindText, bindWatch]


export function updateAsync(node: HTMLAny) {
  middlewareByUpdate.forEach(function (fn) {
    fn(node)
  })
}

