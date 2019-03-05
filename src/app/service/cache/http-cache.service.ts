import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpCacheService {

  constructor() { }

  private getCurrentDateInSeconds(): number {
    let date = (Date.now() / 1000).toFixed(0);
    return parseFloat(date);
  }

  public checkForInfinityCache(key): boolean {
    return !!localStorage[key];

  }

  public checkForCache(url, timeInSeconds): boolean {
    let curDate: number = this.getCurrentDateInSeconds();

    if (localStorage[url]) {
      let curStorage = JSON.parse(localStorage[url]);
      if ((curDate - curStorage.start) > timeInSeconds) {
        localStorage.removeItem(url);
        return false;
      } else {
        return true;
      }
    }
    return false;
  }

  public setToLocalStorage(key, response) {
    let curDate = this.getCurrentDateInSeconds();
    localStorage[key] = JSON.stringify({
      result: response,
      start: curDate
    });
  }

}
