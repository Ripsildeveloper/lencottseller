import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { AppSetting } from '../config/appSetting';

import {MOQ} from './create-moq/moq.model';

@Injectable({
  providedIn: 'root'
})
export class MoqService {
  serviceUrl: string = AppSetting.serviceUrl;

  constructor(private httpClient: HttpClient) { }

  createMOQ(data: MOQ): Observable<any> {
    const categoryUrl = 'createMoq';
    const url: string = this.serviceUrl + categoryUrl;
    return this.httpClient.post<MOQ>(url, data);
  }
  viewMOQ(): Observable<any> {
    const categoryUrl = 'moqs';
    const url: string = this.serviceUrl + categoryUrl;
    return this.httpClient.get<MOQ>(url);
  }
  deleteMOQ(data): Observable<any> {
    const deleteUrl = 'moqs/';
    const url: string = this.serviceUrl + deleteUrl + data._id;
    return this.httpClient.delete<MOQ>(url);
  }
  viewSingleMOQ(data): Observable<any> {
    const moqUrl = 'moqs/';
    const moqUrl1 = '/product';
    const url: string = this.serviceUrl + moqUrl +  data ._id + moqUrl1;
    return this.httpClient.get<MOQ>(url);
  }
}
