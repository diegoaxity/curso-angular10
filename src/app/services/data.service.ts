import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private message = new Subject<string>();
  private loading = new Subject<boolean>();

  constructor() { }

  setMessage(msg: string): void {
    this.message.next(msg);
  }

  getMessage(): Observable<string> {
    return this.message.asObservable();
  }

  setToken(token: string): void {
    sessionStorage.setItem('TOKEN', token);
  }

  getToken(): string {
    return sessionStorage.getItem('TOKEN');
  }

  userIsAuthenticated(): boolean {
    const token = sessionStorage.getItem('TOKEN');
    return token !== null && token !== undefined;
  }

  setLoading(load: boolean): void {
    this.loading.next(load);
  }

  getLoading(): Observable<boolean> {
    return this.loading.asObservable();
  }
}
