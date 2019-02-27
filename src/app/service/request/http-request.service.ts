import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable, Observer, throwError} from "rxjs";
import {concatMap, delay, retryWhen, take} from "rxjs/operators";

const headers = new HttpHeaders();
// .set('Access-Control-Allow-Origin', '*')


@Injectable({
  providedIn: 'root'
})

export class HttpRequestService {

  constructor(
    private http: HttpClient
  ) {}

  sendHttpGetRequest(url: string): Observable<object> {
    return this.http.
    get(url, {headers})
      .pipe(
      retryWhen(errors => {
          console.log('errors');
          return errors
            .pipe(delay(1000))
            .pipe(take(10))
            .pipe(concatMap(error =>  '123'));
        }
      )
  );

  }

}
