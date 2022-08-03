import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbAlert } from '@ng-bootstrap/ng-bootstrap'
import { debounceTime, Subject } from 'rxjs';
import { LoginService } from 'src/app/services/login.service';
import { RegisterService } from 'src/app/services/register.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  @ViewChild('selfClosingAlert', { static: false })
  selfClosingAlert!: NgbAlert;
  successMessage = '';

  confirmPassword = '';
  user = {
    name: '',
    email: '',
    username: '',
    password: ''
  }
  userCheck = {
    name: false,
    email: false,
    username: false,
    password: false,
    confirmPassword: false
  }



  constructor(private registerService: RegisterService, private loginService: LoginService) { }

  ngOnInit(): void {

  }


  usernameValidation() {
    var pattern = /^[a-z0-9_-]{6,10}$/;
    let field: any = document.getElementById('username');
    if (this.user.username.match(pattern)) {
      field.className = "form-control is-valid";
      this.userCheck.username = true;
    }
    else {
      field.className = "form-control is-invalid";
      this.userCheck.username = false;
    }
  }

  nameValidation() {
    var pattern = /^[A-Za-z -]+$/;
    let field: any = document.getElementById('name');
    if (this.user.name.match(pattern)) {
      field.className = "form-control is-valid";
      this.userCheck.name = true;
    }
    else {
      field.className = "form-control is-invalid";
      this.userCheck.name = false;
    }
  }

  emailValidation() {
    let pattern = /[\w._%+-]+@[\w.-]+\.[a-zA-Z]{2,4}/;
    let field: any = document.getElementById('email');
    if (this.user.email.match(pattern)) {
      field.className = "form-control is-valid";
      this.userCheck.email = true;
    }
    else {
      field.className = "form-control is-invalid";
      this.userCheck.email = false;
    }
  }

  passwordValidation() {
    let pattern = /^[a-zA-Z0-9!@#$%^&*]{8,16}$/;
    let field: any = document.getElementById('password');
    if (this.user.password.match(pattern)) {
      field.className = "form-control is-valid";
      this.userCheck.password = true;
    }
    else {
      field.className = "form-control is-invalid";
      this.userCheck.password = false;
    }
  }
  cPasswordValidation() {
    let field: any = document.getElementById('cPassword');
    if (this.user.password === this.confirmPassword) {
      field.className = "form-control is-valid";
      this.userCheck.confirmPassword = true;
    }
    else {
      field.className = "form-control is-invalid";
      this.userCheck.confirmPassword = false;
    }
  }
  checkDetails() {
    for (let key of Object.values(this.userCheck)) {
      if (!key) {
        return false;
      }
    }
    return true;
  }
  onSubmit() {
    if (!this.checkDetails()) {
      this.successMessage = 'Fill valid details!';
      setTimeout(() => this.selfClosingAlert.close(), 5000);
    }
    else {
      this.registerService.registerUser(this.user).subscribe(
        (response: any) => {
          // console.log(response);
        },
        error => {
          console.warn(error);
          if (error.status === 200) {
            const credentials = {
              username: this.user.username,
              password: this.user.password
            }
            // console.log(credentials);

            // this.registerService.registerUserForAuthentication(credentials).subscribe(
            //   response=>{
            //     console.log(response);
            //   },
            // error1=>{
            // console.log(error1);
            // if(error1.status===201){
            this.loginService.genareteToken(credentials).subscribe(
              (response: any) => {
                // console.log(response);
                this.loginService.loginUser(response.Token, credentials.username);
                window.location.href = "/update-profile/job-type";

              },
              (error1: any) => {
                this.successMessage = error1.error;
                setTimeout(() => this.selfClosingAlert.close(), 5000);
                // console.warn(error);
              }
            )
            }   
            // }
            // );}
            else{
            this.successMessage=error.error;
            setTimeout(() => this.selfClosingAlert.close(), 5000);
          }

        }
      );
    }
  }

}
