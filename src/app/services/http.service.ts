import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { translateUrls } from '../consts/endpoints.const';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private httpClient: HttpClient) { }

  getTranslation(phrase): Observable<any> {
    return this.httpClient.get(`${translateUrls.EN}/${phrase}`);
  }
}
