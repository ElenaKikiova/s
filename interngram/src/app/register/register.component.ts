import { CommonModule } from '@angular/common';  
import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormGroupDirective, FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  checkingEmail = false;
  usedEmailError = false;

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

  public repeatPassword = new FormControl('', Validators.compose([
    Validators.required
  ]));

  public registrationForm = this.formBuilder.group({
    email: this.email,
    password: this.password,
    repeatPassword: this.repeatPassword
  },
  {
    validator: this.checkPasswordsMatch
  });

  
  async checkEmail(){
    if(this.checkingEmail == false){
      this.checkingEmail = true;
      this.usedEmailError = false;

      setTimeout(() => {
        this.authService.checkEmail(this.email.value).subscribe( async (data: [any]) => {
          console.log(data);

          if(data["matchingEmails"] == 1) this.usedEmailError = true;
          else this.usedEmailError = false;
          
          this.checkingEmail = false;
        })
      }, 2000);
    }
  }
  
  public checkPasswordsMatch(group: FormGroup) {
    let pass1 = group.controls.password.value;
    let pass2 = group.controls.repeatPassword.value;
    return (pass1 == pass2) ? null : {'passwordMatch': false};
  }


  public register(){

    let data = {
      email: this.registrationForm.value.email,
      password: this.registrationForm.value.password
    }
    console.log("User data: ", data);

    this.authService.register(data).subscribe( async (data: [any]) => {
      console.log(data);
      this.router.navigate(['/home']);
    },
    error => {
      console.log("error");
    });

  }

}
