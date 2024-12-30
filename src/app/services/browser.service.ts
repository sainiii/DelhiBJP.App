import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BrowserService {

  private widthOfSmallScreen = 993;

  get isHandHeldDevice() {
    return this.isSmallDevice();
  }

  private isSmallDevice() {
    return (window && window.innerWidth < this.widthOfSmallScreen) ? true : false;
  }

  getWidth = (): number => {
    return window.innerWidth;
  }
}
