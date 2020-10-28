import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ILoginReq, ILoginRes } from '../model/security.model';

@Injectable({
  providedIn: 'root'
})
export class SecurityService {

  constructor(private http: HttpClient) { }

  login(loginData: ILoginReq): Observable<ILoginRes> {
    return this.http.post<ILoginRes>('https://reqres.in/api/login?delay=4', loginData);
  }
}
