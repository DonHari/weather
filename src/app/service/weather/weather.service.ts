import {Injectable, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {HttpRequestService} from "../request/http-request.service";
import {HttpCacheService} from "../cache/http-cache.service";

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  private apiKey = 'eff591e26e608cceeb3977ee0bfacbbe';
  private apiPath = `https://api.openweathermap.org/data/2.5/weather?appid=${this.apiKey}&q=`;


  constructor(
    private http: HttpClient,
    private httpRequest: HttpRequestService,
    private cache: HttpCacheService
  ) {}



  getWeather(country: string, city: string, callback) {
    const url = this.prepareRequestUrl(country, city);

    // Check for cache values
    if ( this.cache.checkForCache(url, 60) ) {

      let currentData = JSON.parse(localStorage[url]);
      callback(this.toCelsies(currentData.result));

    } else {

      this.sendRequest(url)
        .subscribe(
          (response: any) => {
            this.cache.setToLocalStorage(url, response);
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


  private toCelsies(response) {
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
