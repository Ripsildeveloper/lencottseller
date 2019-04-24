import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { AppSetting } from '../config/appSetting';

import {SignIn} from './signin/signIn.model';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  serviceUrl: string = AppSetting.serviceUrl;

  constructor(private httpClient: HttpClient) { }

  signIn(data: SignIn): Observable<any> {
    const signInurl = 'admin/validate/';
    const url: string = this.serviceUrl + signInurl;
    return this.httpClient.post<SignIn>(url, data);
  }

}
