import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AnotherWeatherService {

  private appId = "c8lCOI3c";
  private clientId = "dj0yJmk9dGNJZ2VrM0ZYY210JnM9Y29uc3VtZXJzZWNyZXQmc3Y9MCZ4PWUz";
  private signature = "e8c06ea42edc510e1e26d7ab174b47be1a31ce81";
  private apiPath = `https://weather-ydn-yql.media.yahoo.com/forecastrss`;

  constructor(
    private http: HttpClient
  ) {
  }

  getWeather(country: string, city: string, callback) {
    const url = this.prepareRequestUrl(country, city);
    const headers = this.prepareHeaders(country, city);
    this.sendRequest(url, headers).subscribe((response) => {
      console.log(response);
      callback(response['main']['temp']);
    });
  }

  private prepareRequestUrl(country: string, city: string): string {
    return `${this.apiPath}?location=${city},${country}&format=json`;
  }

  private prepareHeaders(country: string, city: string): HttpHeaders {
    let timestamp = new Date().getTime() / 1000;
    return new HttpHeaders({
      'Yahoo-App-Id': this.appId,
      'Authorization': 'OAuth',
      'oauth_consumer_key': this.clientId,
      'oauth_signature_method': 'HMAC-SHA1',
      'oauth_timestamp': timestamp.toString(),
      'oauth_version': '1.0',
      'oauth_signature': this.signature,
      'location': encodeURI(`${country},${city}`),
      'oauth_nonce': Math.random().toString(36).substring(2),
      'format': 'json'
    })
  }

  private sendRequest(url: string, headers: HttpHeaders): Observable<string> {
    const httpOptions = {
      headers: headers
    };
    return this.http.get<string>(url, httpOptions);
  }
}
