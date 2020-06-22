import { CommonModule } from '@angular/common';  
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user = {
    Email: "",
    Password: ""
  }

  loginError = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {}

  public login(){
    this.loginError = false;
    console.log(this.user);

    console.log("User data: ", this.user);

    this.authService.login(this.user).subscribe( async (data: [any]) => {
      console.log(data);

      if(data["error"] != undefined){
        this.loginError = true;
      }
      else{
        this.router.navigate(['/home']);
      }
    },
    error => {
      console.log("error");
    });

  }

}
