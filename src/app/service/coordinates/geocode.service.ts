import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeocodeService {

  constructor(private http: HttpClient) { }

  private apiKey = 'iXrmsSYauD98g6XNtLMXGqZKZRYuhXwH';
  private apiPath = `http://open.mapquestapi.com/geocoding/v1/address?key=${this.apiKey}&location=`;
  currentUrl: string;

  private getLocation(city: string, country: string): string {
    return `${city},${country}`;
  }

  prepareURI(city: string, country: string): string {
    this.currentUrl = this.apiPath + this.getLocation(city, country);
    return this.currentUrl;
  }

  private sendRequest(url: string): Observable<string> {
    return this.http.get<string>(url);
  }


}
