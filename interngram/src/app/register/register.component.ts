import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormGroupDirective, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registrationForm;

  user = {
    Email: ""
  }

  constructor(
    public FormControl: FormControl,
    public FormGroup: FormGroup,
    private formBuilder: FormBuilder
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

  public registerForm = this.formBuilder.group({
    email: this.email,
    password: this.password,
    repeatPassword: this.repeatPassword
  },
  {
    validator: this.checkPasswordsMatch
  });
  
  public checkPasswordsMatch(group: FormGroup) {
    let pass1 = group.controls.password.value;
    let pass2 = group.controls.repeatPassword.value;
    return (pass1 == pass2) ? null : {'passwordMatch': false};
  }

}
