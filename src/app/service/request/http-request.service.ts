import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable, Subject, throwError} from 'rxjs/';
import {catchError, delay, map, retryWhen, scan, take} from 'rxjs/operators';
// import {Error} from 'tslint/lib/error';

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
          return errors
            .pipe(scan(
                (attemptCount, error) => {
                  attemptCount++;

                  if (attemptCount <= 2) {
                    return attemptCount;
                  } else {
                    throw error;
                  }
                }, 0))

            .pipe(delay(1000))
            .pipe(take(3));

        },
      )
  );

  }

}
