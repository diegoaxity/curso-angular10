import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ColorDetailComponent } from './color-detail/color-detail.component';
import { ColorsComponent } from './colors/colors.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AuthService } from './services/auth.service';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthService]
  },
  {
    path: 'colors',
    component: ColorsComponent
  },
  {
    path: 'color-detail',
    component: ColorDetailComponent
  },
  {
    path: 'color-detail/:id',
    component: ColorDetailComponent
  },
  {
    path: '**',
    redirectTo: '/login'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
