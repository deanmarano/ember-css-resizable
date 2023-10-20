import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class ApplicationController extends Controller {
  @tracked loggedWidth;
  @tracked localStorageWidth;
  @tracked unifiedLocalStorageWidth;

  get persistedLocalStorageWidth() {
    this.localStorageWidth;
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

  get persistedUnifiedLocalStorageWidth() {
    let width = localStorage.getItem('unifiedSidebarWidth');
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
  set persistedUnifiedLocalStorageWidth(value) {
    localStorage.setItem('unifiedSidebarWidth', value);
    this.unifiedLocalStorageWidth = value;
  }

  @action
  logSidebarResized(e) {
    this.loggedWidth = e[0].borderBoxSize[0].inlineSize;
  }

  @action
  persistSidebarResized(e) {
    let width = e[0].borderBoxSize[0].inlineSize;
    localStorage.setItem('sidebarWidth', width);
    this.localStorageWidth = width;
  }

  @action
  restoreLocalStorageWidth(element) {
    if (this.persistedLocalStorageWidth) {
      this.localStorageWidth = this.persistedLocalStorageWidth;
      element.style.width = `${this.persistedLocalStorageWidth}px`;
    }
  }

  @action
  restoreUnifiedLocalStorageWidth(element) {
    if (this.persistedLocalStorageWidth) {
      this.unifiedLocalStorageWidth = this.persistedUnifiedLocalStorageWidth;
      element.style.width = `${this.persistedUnifiedLocalStorageWidth}px`;
    }
  }
  @action
  persistUnifiedSidebarResized(e) {
    let width = e[0].borderBoxSize[0].inlineSize;
    this.persistedUnifiedLocalStorageWidth = width;
  }
}
