import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpHeaders} from '@angular/common/http';
import {GeocodeService} from '../coordinates/geocode.service';
import {HttpRequestService} from '../request/http-request.service';
import {HttpCacheService} from "../cache/http-cache.service";

const headers = new HttpHeaders({'Access-Control-Allow-Origin': 'https://www.google.com'});

@Injectable({
  providedIn: 'root'
})


export class DarkskyWeatherService {


  private appId = 'bb72634788f19c232216604d230e96ed';
  private proxy = 'https://cors.io/?';
  private apiPath = 'https://api.darksky.net/forecast/';
  private lat: string;
  private lng: string;


  constructor(
    private httpRequest: HttpRequestService,
    private geocode: GeocodeService,
    private cache: HttpCacheService
  ) {}

  private getCoordinatesFromResponse(response) {
    return response.results[0].locations[0].latLng;
  }

  getWeather(country: string, city: string, callback) {

    // geocode cache
    if (this.cache.checkForInfinityCache(`${city}&${country}`)) {
      let currentGeocode = JSON.parse(localStorage[`${city}&${country}`]);

      this.lat = this.getCoordinatesFromResponse(currentGeocode.result).lat;
      this.lng = this.getCoordinatesFromResponse(currentGeocode.result).lng;

      const url = this.prepareRequestUrl();
      this.getTemperature(url, callback);

    }
    else {
      this.getGeocode(city, country).subscribe(
        (response: any) => {
          if (response && response.results) {

            this.cache.setToLocalStorage(`${city}&${country}`, response);

            this.lat = this.getCoordinatesFromResponse(response).lat;
            this.lng = this.getCoordinatesFromResponse(response).lng;

            const url = this.prepareRequestUrl();
            this.getTemperature(url, callback);
          }
        },
        error => {
          error.status = 0;
          callback(error);
        });
    }
  }

  private getTemperature(url, callback){
    // if cache available
    if (this.cache.checkForCache(url, 60)) {

      let currentData = JSON.parse(localStorage[url]);
      callback(this.getInCelsius(currentData.result));

    }
    else {
      this.sendRequest(url).subscribe(
        (weatherResp: any) => {

          if (weatherResp) {
            // set value to cache
            this.cache.setToLocalStorage(url, weatherResp.currently.temperature);
            callback(this.getInCelsius(weatherResp.currently.temperature));
          }
        },
        error => {
          error.status = 0;
          callback(error);
        }
      );
    }
  }

   private prepareRequestUrl(): string {
    return `${this.proxy}${this.apiPath}${this.appId}/${this.lat},${this.lng}`;
   }

   private sendRequest(url): Observable<any> {
     return this.httpRequest.sendHttpGetRequest(url);
   }

  private getGeocode(city: string, country: string): Observable<any> {
    return this.httpRequest.sendHttpGetRequest(this.geocode.prepareURI(city, country));
  }

  private getInCelsius(result) {
    return ((result - 32) / 1.8).toFixed(0);
  }

}
