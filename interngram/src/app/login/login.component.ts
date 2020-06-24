import { CommonModule } from '@angular/common';  
import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormGroupDirective, FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginError = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {}

  public email = new FormControl('', Validators.compose([
    Validators.required,
    Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
  ]));

  public password = new FormControl('', Validators.compose([
    Validators.required,
    Validators.minLength(4),
    Validators.maxLength(15)
  ]));

  public loginForm = this.formBuilder.group({
    email: this.email,
    password: this.password
  });

  public login(){
    this.loginError = false;

    let data = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    }
    console.log("User data: ", data);

    this.authService.login(data).subscribe( async (data: [any]) => {
      console.log(data);

      if(data["error"] != undefined){
        this.loginError = true;
      }
      else{
        this.loginError = false;
        this.router.navigate(['/home']);
        localStorage.setItem('userId', data["userData"]._id); 
        localStorage.setItem('userEmail', data["userData"].Email); 
      }
    },
    error => {
      console.log("error");
    });

  }

}
