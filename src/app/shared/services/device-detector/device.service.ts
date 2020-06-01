/**
 * Created by ahsanayaz on 08/11/2016.
 */
import { Inject, Injectable, Optional, PLATFORM_ID } from '@angular/core';
import * as Constants from './device.const';
import { ReTree } from './retree.service';
import { isPlatformBrowser, isPlatformServer, isPlatformWorkerApp } from '@angular/common';
import { REQUEST } from '@nguniversal/express-engine/tokens';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {
  ua = '';
  userAgent = '';
  os = '';
  browser = '';
  device = '';
  // tslint:disable-next-line:variable-name
  os_version = '';
  // tslint:disable-next-line:variable-name
  browser_version = '';

  constructor(@Inject(PLATFORM_ID) private platform: any,
              @Optional() @Inject(REQUEST) private req: any) {

    if (this.isPlatformBrowser()) {
      this.ua = window.navigator.userAgent;

    } else if (this.isPlatformServer()) {
      this.ua = req.headers['user-agent'];
    }
    this._setDeviceInfo();
  }

  private _setDeviceInfo() {
    const reTree = new ReTree();
    const ua = this.ua;
    this.userAgent = ua;
    const mappings = [
      { 'const': 'OS', prop: 'os' },
      { 'const': 'BROWSERS', prop: 'browser' },
      { 'const': 'DEVICES', prop: 'device' },
      { 'const': 'OS_VERSIONS', prop: 'os_version' }
    ];

    mappings.forEach((mapping) => {
      this[mapping.prop] = Object.keys(Constants[mapping.const]).reduce((obj: any, item: any) => {
        obj[Constants[mapping.const][item]] = reTree.test(ua, Constants[`${mapping.const}_RE`][item]);
        return obj;
      }, {});
    });

    mappings.forEach((mapping) => {
      this[mapping.prop] = Object.keys(Constants[mapping.const])
        .map((key) => {
          return Constants[mapping.const][key];
        })
        .reduce((previousValue, currentValue) => {
          return (previousValue === Constants[mapping.const].UNKNOWN && this[mapping.prop][currentValue])
            ? currentValue : previousValue;
        }, Constants[mapping.const].UNKNOWN);
    });

    this.browser_version = '0';
    if (this.browser !== Constants.BROWSERS.UNKNOWN) {
      const re = Constants.BROWSER_VERSIONS_RE[this.browser];
      const res = reTree.exec(ua, re);
      if (!!res) {
        this.browser_version = res[1];
      }
    }

    /* WORKAROUND */
    const url = this.isPlatformBrowser() ? window.location.href : this.req.url;
    if (url.indexOf('/partner') !== -1) {
      this.device = 'unknown';
    }
  }

  getDeviceInfo(): any {
    return {
      userAgent: this.userAgent,
      os: this.os,
      browser: this.browser,
      device: this.device,
      os_version: this.os_version,
      browser_version: this.browser_version
    };
  }

  isIOS() {
    return [
      Constants.DEVICES.IPHONE,
      Constants.DEVICES.I_POD,
      Constants.DEVICES.I_PAD
    ].some((item) => {
      return this.device === item;
    });
  }

  isSafari() {
    return this.device === Constants.BROWSERS.SAFARI;
  }

  isTouchDevice() {

    const prefixes = ' -webkit- -moz- -o- -ms- '.split(' ');

    // tslint:disable-next-line:only-arrow-functions
    const mq = function(q) {
      return window.matchMedia(q).matches;
    };

    if (('ontouchstart' in window) || (window as any).DocumentTouch) {
      return true;
    }

    // include the 'heartz' as a way to have a non matching MQ to help terminate the join
    // https://git.io/vznFH
    const query = ['(', prefixes.join('touch-enabled),('), 'heartz', ')'].join('');
    return mq(query);
  }

  isMobile() {
    return [
      Constants.DEVICES.ANDROID,
      Constants.DEVICES.IPHONE,
      Constants.DEVICES.I_POD,
      Constants.DEVICES.BLACKBERRY,
      Constants.DEVICES.FIREFOX_OS,
      Constants.DEVICES.WINDOWS_PHONE,
      Constants.DEVICES.VITA,

      // Make mobile version on tablets (temporary)
      Constants.DEVICES.I_PAD,
      Constants.DEVICES.FIREFOX_OS
    ].some((item) => {
      return this.device === item || (this.isPlatformBrowser() && this.isTouchDevice());
    });
  }

  isTablet() {
    return [
      Constants.DEVICES.I_PAD,
      Constants.DEVICES.FIREFOX_OS
    ].some((item) => {
      return this.device === item;
    });
  }

  isDesktop() {
    return [
      Constants.DEVICES.PS4,
      Constants.DEVICES.CHROME_BOOK,
      Constants.DEVICES.UNKNOWN
    ].some((item) => {
      return this.device === item && !this.isMobile();
    });
  }

  isPlatformServer() {
    return isPlatformServer(this.platform);
  }

  isPlatformBrowser() {
    return isPlatformBrowser(this.platform);
  }

  isPlatformWorker() {
    return isPlatformWorkerApp(this.platform);
  }
}
