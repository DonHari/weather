import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  private apiKey = "eff591e26e608cceeb3977ee0bfacbbe";
  private apiPath = `https://api.openweathermap.org/data/2.5/weather?appid=${this.apiKey}&q=`;

  constructor(
    private http: HttpClient
  ) {
  }

  getWeather(country: string, city: string, callback) {
    const url = this.prepareRequestUrl(country, city);
    this.sendRequest(url).subscribe((response) => {
      console.log(response);
      callback(response['main']['temp']);
    });
  }

  private prepareRequestUrl(country: string, city: string): string {
    return this.apiPath + city + ',' + country;
  }

  private sendRequest(url: string): Observable<string> {
    return this.http.get<string>(url);
  }
}
