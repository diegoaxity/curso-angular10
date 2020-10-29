import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IColor } from '../model/colors.model';

@Injectable({
  providedIn: 'root'
})
export class ColorsService {

  constructor(private http: HttpClient) { }

  createColor(value: IColor) {
    return this.http.post('https://super-rest.herokuapp.com/diego/colors', value);
  }

  editColor(id: string, value: IColor) {
    return this.http.put('https://super-rest.herokuapp.com/diego/colors/' + id, value);
  }

  getColors(): Observable<[IColor]> {
    return this.http.get<[IColor]>('https://super-rest.herokuapp.com/diego/colors');
  }

  getColor(id: string): Observable<IColor> {
    return this.http.get<IColor>('https://super-rest.herokuapp.com/diego/colors/' + id);
  }

  deleteColor(id: string) {
    return this.http.delete('https://super-rest.herokuapp.com/diego/colors/' + id);
  }
}
