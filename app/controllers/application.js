import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class ApplicationController extends Controller {
  @tracked loggedWidth;
  @tracked localStorageWidth;

  get persistedLocalStorageWidth() {
    let width = localStorage.getItem('sidebarWidth');
    if (width) {
      try {
        return parseInt(width, 10);
      } catch (e) {
        return null;
      }
    } else {
      return null;
    }
  }

  @action
  logSidebarResized(e) {
    this.loggedWidth = e[0].borderBoxSize[0].inlineSize;
  }

  @action
  persistSidebarResized(e) {
    this.localStorageWidth = e[0].borderBoxSize[0].inlineSize;
    localStorage.setItem('sidebarWidth', this.localStorageWidth);
  }

  @action
  restoreLocalStorageWidth(element) {
    if (this.persistedLocalStorageWidth) {
      this.localStorageWidth = this.persistedLocalStorageWidth;
      element.style.width = `${this.persistedLocalStorageWidth}px`;
    }
  }
}
