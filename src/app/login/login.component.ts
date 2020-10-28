import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ILoginReq } from '../model/security.model';
import { DataService } from '../services/data.service';
import { SecurityService } from '../services/security.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isLoading = false;
  formLogin: FormGroup;

  constructor(private formBuilder: FormBuilder, private security: SecurityService, private router: Router, private data: DataService) {
    this.formLogin = this.formBuilder.group({
      username: ['eve.holt@reqres.in', [Validators.required, Validators.minLength(3), Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)]],
      password: ['', Validators.required]
    });

    this.data.getLoading().subscribe(loading => {
      this.isLoading = loading;
    });
  }

  ngOnInit(): void {
  }

  login(): void {
    this.data.setLoading(true);

    const loginData = {
      email: this.formLogin.get('username').value,
      password: this.formLogin.get('password').value
    } as ILoginReq;

    this.security.login(loginData).subscribe(res => {
      // Bloque de onNext
      console.log(res);
      this.data.setToken(res.token);
      this.router.navigate(['home']);
      this.data.setLoading(false);
    }, err => {
      // Bloque de onError
      console.log(err);
      this.data.setMessage(err.error.error);
      this.data.setLoading(false);
    });
  }
}
