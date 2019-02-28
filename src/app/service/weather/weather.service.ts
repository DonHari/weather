import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {HttpRequestService} from "../request/http-request.service";


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
    console.log('смотри сюда', this.httpRequest.sendHttpGetRequest(url));
    this.httpRequest.sendHttpGetRequest(url)
       .subscribe(
      (response: any) => {
              console.log('next 98765', response);
              callback(this.toCelvin(response));
          },
      error => {
              console.log('error 12345', error);
              callback(error.status.toString());
          },
         () => console.log('HTTP request completed.')
      );
  }

  private toCelvin(response) {
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
