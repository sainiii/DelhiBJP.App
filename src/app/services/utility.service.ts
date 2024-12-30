import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor() { }

  _keyStr: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

  GetFormattedDate(params: string): string {
    let UTCDateTZ = params + 'Z';
    let todayTime = new Date(UTCDateTZ);
    return todayTime.toDateString();
  }

  GetUTCWithTimeZone(params: string): Date {
    let UTCDateTZ = params + 'Z';
    let todayTime = new Date(UTCDateTZ);
    return todayTime;
  }

  GetFormattedDateWithTime(params: string) {
    let UTCDateTZ = params + 'Z';
    let todayTime = new Date(UTCDateTZ);
    let options = {
      weekday: "short", year: "numeric", month: "short",
      day: "numeric", hour: "2-digit", minute: "2-digit"
    };
    return todayTime.toLocaleTimeString("en-us", {
      weekday: "short", year: "numeric", month: "short",
      day: "numeric", hour: "2-digit", minute: "2-digit"
    });
  }

  toDate(_date: string): number {
    const date = new Date(_date);
    const day = date.getDate();
    const monthIndex = date.getMonth();
    const year = date.getFullYear();
    return new Date(year, monthIndex, day, 0, 0, 0, 0).getTime();
  }
  toTimeFormat(_date: string) {
    const d = new Date(_date);
    const h = d.getHours();
    const m = d.getMinutes();
    const s = d.getSeconds();
    let _h: string = h.toString();
    let _m: string = m.toString();
    let _s: string = s.toString();

    if (h < 10) {
      _h = '0' + h;
    }
    if (m < 10) {
      _m = '0' + m;
    }
    if (s < 10) {
      _s = '0' + s;
    }
    return _h + ':' + _m + ':' + _s;
  }

  timeConvert(time) {
    // Check correct time format and split into components
    time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

    if (time.length > 1) { // If time format correct
      time = time.slice(1);  // Remove full string match value
      time[5] = +time[0] < 12 ? ' AM' : ' PM'; // Set AM/PM
      time[0] = +time[0] % 12 || 12; // Adjust hours
    }
    return time.join(''); // return adjusted time or original string
  }

  calculateAge(birthday) { // birthday is a date
    const date = new Date(birthday);
    const ageDifMs = Date.now() - date.getTime();
    const ageDate = new Date(ageDifMs); // miliseconds from epoch
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }

  isValidDate(d: any) {
    let isavlid: boolean;
    if (Object.prototype.toString.call(d) === '[object Date]') {
      if (isNaN(d.getTime())) {  // d.valueOf() could also work
        isavlid = false;
      } else {
        isavlid = true;
      }
    } else {
      isavlid = false;
    }
    return isavlid;
  }

  toDateFormat(_date: string, format = 'DD-MMM-YYYY'): string {
    let UTCDateTZ = _date + 'Z';
    let todayTime = new Date(UTCDateTZ);
    const day = todayTime.getDate();
    const monthIndex = todayTime.getMonth();
    const year = todayTime.getFullYear();
    const DAYS = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
    const MONTH_NAMES_FULL = ['January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];
    const MONTH_NUMBERS = ['01', '02', '03', '04', '05', '06',
      '07', '08', '09', '10', '11', '12'
    ];

    if (format === 'DD-MMM-YYYY') {
      return (day < 10 ? '0' + day : day) + '-' + MONTH_NAMES[monthIndex] + '-' + year;
    } else if (format === 'YYYY-MM-DD') {
      return year + '-' + MONTH_NUMBERS[monthIndex] + '-' + (day < 10 ? '0' + day : day);
    } if (format === 'MM/YY') {
      return '${MONTH_NUMBERS[monthIndex]}/${year}';
    } else {
      return (day < 10 ? '0' + day : day) + '-' + MONTH_NAMES[monthIndex] + '-' + year;
    }
  }

  getLocalStorage(name: string) {
    return JSON.parse(localStorage.getItem(name));
  }

  setLocalStorage(name: string, value: any) {
    localStorage.setItem(name, JSON.stringify(value));
  }

  deleteLocalStorage(name: string) {
    localStorage.removeItem(name);
  }

  clearLocalStorage() {
    localStorage.clear();
  }

  getCookie(name: string) {
    const ca: Array<string> = document.cookie.split(';');
    const caLen: number = ca.length;
    const cookieName = name + '=';
    for (let i = 0; i < caLen; i += 1) {
      if (ca[i].indexOf(name, 0) > -1) {
        let c: string;
        c = ca[i].substring(cookieName.length + 1, ca[i].length);
        return c;
      }
    }
    return '';
  }

  deleteCookie(name: string) {
    this.setCookie(name, '', -1);
  }

  setCookie(name: string, value: string, expireDays: number, path: string = '') {
    const d: Date = new Date();
    d.setTime(d.getTime() + expireDays * 24 * 60 * 60 * 1000);
    const expires: string = 'expires=' + d.toUTCString();
    document.cookie = name + '=' + value + '; ' + expires + (path.length > 0 ? '; path=' + path : '');
  }

  naturalCompare(a, b) {
    var ax = [], bx = [];

    a.replace(/(\d+)|(\D+)/g, function (_, $1, $2) { ax.push([$1 || Infinity, $2 || ""]) });
    b.replace(/(\d+)|(\D+)/g, function (_, $1, $2) { bx.push([$1 || Infinity, $2 || ""]) });

    while (ax.length && bx.length) {
      var an = ax.shift();
      var bn = bx.shift();
      var nn = (an[0] - bn[0]) || an[1].localeCompare(bn[1]);
      if (nn) return nn;
    }

    return ax.length - bx.length;
  }

  // group object array into multiple arrays based on property
  // Example: this.groupBy(dataArray, data => data.Standard);
  groupBy(array: any[], propertyLamdaEx) {
    const map = new Map();
    array.forEach((item) => {
      const key = propertyLamdaEx(item);
      const collection = map.get(key);

      if (!collection) {
        map.set(key, [item]);
      }
      else {
        collection.push(item);
      }
    });
    return map;
  }

  encodeToBase64(e) {
    let t = "";
    let n, r, i, s, o, u, a;
    let f = 0;
    e = this._utf8_encode(e);
    while (f < e.length) {
      n = e.charCodeAt(f++);
      r = e.charCodeAt(f++);
      i = e.charCodeAt(f++);
      s = n >> 2;
      o = (n & 3) << 4 | r >> 4;
      u = (r & 15) << 2 | i >> 6;
      a = i & 63;
      if (isNaN(r)) {
        u = a = 64
      }
      else if (isNaN(i)) {
        a = 64
      }
      t = t + this._keyStr.charAt(s) + this._keyStr.charAt(o) + this._keyStr.charAt(u) + this._keyStr.charAt(a);
    }
    return t;
  }

  decodeFromBase64(e) {
    let t = "";
    let n, r, i;
    let s, o, u, a;
    let f = 0;
    e = e.replace(/[^A-Za-z0-9\+\/\=]/g, "");
    while (f < e.length) {
      s = this._keyStr.indexOf(e.charAt(f++));
      o = this._keyStr.indexOf(e.charAt(f++));
      u = this._keyStr.indexOf(e.charAt(f++));
      a = this._keyStr.indexOf(e.charAt(f++));
      n = s << 2 | o >> 4;
      r = (o & 15) << 4 | u >> 2;
      i = (u & 3) << 6 | a;
      t = t + String.fromCharCode(n);
      if (u != 64) {
        t = t + String.fromCharCode(r);
      }
      if (a != 64) {
        t = t + String.fromCharCode(i)
      }
    }
    t = this._utf8_decode(t);
    return t;
  }

  _utf8_encode(e) {
    e = e.replace(/\r\n/g, "\n");
    let t = "";
    for (let n = 0; n < e.length; n++) {
      let r = e.charCodeAt(n);
      if (r < 128) {
        t += String.fromCharCode(r);
      }
      else if (r > 127 && r < 2048) {
        t += String.fromCharCode(r >> 6 | 192);
        t += String.fromCharCode(r & 63 | 128);
      }
      else {
        t += String.fromCharCode(r >> 12 | 224);
        t += String.fromCharCode(r >> 6 & 63 | 128);
        t += String.fromCharCode(r & 63 | 128);
      }
    } return t;
  }

  _utf8_decode(e) {
    let t = "";
    let n = 0;
    let r = 0;
    let c1 = 0;
    let c2 = 0;
    let c3 = 0;
    while (n < e.length) {
      r = e.charCodeAt(n);
      if (r < 128) {
        t += String.fromCharCode(r); n++;
      }
      else if (r > 191 && r < 224) {
        c2 = e.charCodeAt(n + 1);
        t += String.fromCharCode((r & 31) << 6 | c2 & 63); n += 2;
      }
      else {
        c2 = e.charCodeAt(n + 1);
        c3 = e.charCodeAt(n + 2);
        t += String.fromCharCode((r & 15) << 12 | (c2 & 63) << 6 | c3 & 63);
        n += 3;
      }
    }
    return t;
  }

  // get random n number of elements from array
  getRandom(arr, n) {
    var result = new Array(n),
      len = arr.length,
      taken = new Array(len);
    if (n > len)
      throw new RangeError("getRandom: more elements taken than available");
    while (n--) {
      var x = Math.floor(Math.random() * len);
      result[n] = arr[x in taken ? taken[x] : x];
      taken[x] = --len in taken ? taken[len] : len;
    }
    return result;
  }

  toTitleCase(str) {
    return str.replace(
      /\w\S*/g,
      function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      }
    );
  }
}
