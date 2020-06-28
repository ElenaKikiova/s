import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';


const routes: Routes = [
  {
    path: '', 
    pathMatch: 'full',
    redirectTo: '/home'
  },
  {
    path: 'home', 
    component: HomeComponent 
  },
  {
    path: 'profile', 
    component: ProfileComponent 
  },
  {
    path: 'register', 
    component: RegisterComponent 
  },
  {
    path: 'login', 
    component: LoginComponent 
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
