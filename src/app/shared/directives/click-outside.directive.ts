import { Directive, ElementRef, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[clickOutside]'
})
export class ClickOutsideDirective {

  @Output() private clickOutside = new EventEmitter<any>();

  constructor(private elementRef: ElementRef) {
  }

  @HostListener(`document:touchend`, ['$event', '$event.target']) // workaround for ios devices not handling properly 'click'
  @HostListener(`document:click`, ['$event', '$event.target'])
  onClick(event, targetElement) {
    if (this.isIOS() && event.type === 'click') {
      return;
    }
    if (!this.isIOS() && event.type === 'touchend') {
      return;
    }

    if (!targetElement) {
      return;
    }

    const path = event.path || (event.composedPath && event.composedPath()) || this.getPath(targetElement);
    const clickedInside = path.indexOf(this.elementRef.nativeElement) !== -1;
    if (clickedInside) {
      return;
    }

    this.clickOutside.emit(event);
  }

  private getPath(target) {
    let path = [];
    let currentElem = target;
    while (currentElem) {
      path.push(currentElem);
      currentElem = currentElem.parentElement;
    }
    if (path.indexOf(window) === -1 && path.indexOf(document) === -1)
      path.push(document);
    if (path.indexOf(window) === -1)
      path.push(window);
    return path;
  }

  private isIOS() {
    const iDevices = [
      'iPad Simulator',
      'iPhone Simulator',
      'iPod Simulator',
      'iPad',
      'iPhone',
      'iPod'
    ];

    if (!!navigator.platform) {
      while (iDevices.length) {
        if (navigator.platform === iDevices.pop()){ return true; }
      }
    }

    return false;
  }

}
