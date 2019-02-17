import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {GeococdeService} from '../coordinates/geococde.service';

@Injectable({
  providedIn: 'root'
})
export class AnotherWeatherService {
  
  private appId = 'bb72634788f19c232216604d230e96ed';
  private proxy = 'https://cors.io/?';
  private apiPath = 'https://api.darksky.net/forecast/';
  private lat: string;
  private lng: string;


  constructor(
    private http: HttpClient,
    private geocode: GeococdeService
  ) {}

  getWeather(country: string, city: string, callback) {
    this.getGeocode(city, country).subscribe((response: any) => {
      if (response && response.results) {
        console.log('я сюда зашел');
        this.lat = response.results[0].locations[0].latLng.lat;
        this.lng = response.results[0].locations[0].latLng.lng;

        this.sendRequest().subscribe((weatherResp: any) => {
          if (weatherResp) {
            callback(this.getInCel(weatherResp.currently.temperature));
          }
        });

      }
    });
  }

   private prepareRequestUrl(): string {
    return `${this.proxy}${this.apiPath}${this.appId}/${this.lat},${this.lng}`;
   }

   private sendRequest(): Observable<string> {
     console.log('url', this.prepareRequestUrl() );
     return this.http.get<string>(this.prepareRequestUrl());
   }

  private getGeocode(city: string, country: string): Observable<string> {
    return this.http.get<string>(this.geocode.prepareURI(city, country));
  }
  
  private getInCel(result) {
    return ((result - 32) / 1.8).toFixed(0);
  }

}
