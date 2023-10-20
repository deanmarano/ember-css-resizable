import { modifier } from 'ember-modifier';

/**
 * @param {Element} [element] The DOM element this modifier is applied to
 * @param {[Function]} [params] Positional modifier params
 */

export default modifier(function observeResize(
  element,
  [changeHandler] /*, positional, named*/
) {
  changeHandler(element);
});
