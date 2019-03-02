import {Injectable, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {HttpRequestService} from "../request/http-request.service";
import {startWith} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  private apiKey = 'eff591e26e608cceeb3977ee0bfacbbe';
  private apiPath = `https://api.openweathermap.org/data/2.5/weather?appid=${this.apiKey}&q=`;


  constructor(
    private http: HttpClient,
    private httpRequest: HttpRequestService
  ) {}



  getWeather(country: string, city: string, callback) {
    const url = this.prepareRequestUrl(country, city);

    // Check for cache values
    if ( this.checkForCache(url, 60) ) {

      let currentData = JSON.parse(localStorage[url]);
      callback(this.toCelsies(currentData.result));

    } else {

      this.sendRequest(url)
        .subscribe(
          (response: any) => {
            this.setToLocalStorage(url, response);
            callback(this.toCelsies(response));
          },
          error => {
            console.error('error', error);
            error.status = 0;
            callback(error);
          }
        );
    }

  }

  private sendRequest(url) {
    return this.httpRequest.sendHttpGetRequest(url);
  }

  private setToLocalStorage(url, response) {
    let curDate = this.getCurrentDateInSeconds();
    console.log('curDate 1', curDate);
    localStorage[url] = JSON.stringify({
      result: response,
      start: curDate
    });
  }

  private getCurrentDateInSeconds(): number {
    let date = (Date.now() / 1000).toFixed(0);
    return parseFloat(date);
  }

  private checkForCache(url, timeInSeconds) {
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


  private toCelsies(response) {
    console.log('to celvin');
    return parseFloat(this.getTemperatureFromResponse(response)) - 275;
  }

  private getTemperatureFromResponse(response) {
    return response['main'].temp;
  }

  private prepareRequestUrl(country: string, city: string): string {
    return this.apiPath + city + ',' + country;
  }

  // private sendRequest(url: string): Observable<string> {
  //   return this.http.get<string>(url);
  // }
}
