import { modifier } from 'ember-modifier';

const observerMap = new WeakMap();

/**
 * @param {Element} [element] The DOM element this modifier is applied to
 * @param {[Function]} [params] Positional modifier params
 */

export default modifier(function observeResize(
  element,
  [changeHandler, initializeFn] /*, positional, named*/
) {
  if (initializeFn) {
    initializeFn(element);
  }
  let observer;

  if (observerMap.has(changeHandler)) {
    observer = observerMap.get(changeHandler);
  } else {
    observer = new ResizeObserver(changeHandler);
    observerMap.set(changeHandler, observer);
  }

  observer.observe(element);

  return function () {
    observer.unobserve(element);
  };
});
