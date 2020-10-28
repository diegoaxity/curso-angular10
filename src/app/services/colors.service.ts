import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IColor } from '../model/colors.model';

@Injectable({
  providedIn: 'root'
})
export class ColorsService {

  constructor(private http: HttpClient) { }

  createColor(value: IColor) {
    return this.http.post('https://super-rest.herokuapp.com/diego/colors', value);
  }
}
