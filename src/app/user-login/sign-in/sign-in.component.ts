import { Component, OnInit, ViewChild } from '@angular/core';
import { debounceTime, Subject } from 'rxjs';

import { LoginService } from 'src/app/services/login.service';
import { NgbAlert } from '@ng-bootstrap/ng-bootstrap'


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  credentials={
    username:'',
    password:''
  }
  private _success = new Subject<string>();
  @ViewChild('selfClosingAlert', { static: false })
  selfClosingAlert!: NgbAlert;
  successMessage='';

  constructor(private loginService:LoginService) { }

  ngOnInit(): void {
    this._success.subscribe(message =>{ 
      this.successMessage = message;
      console.log(message);}
      );
    this._success.pipe(debounceTime(5000)).subscribe(() => {
      if (this.selfClosingAlert) {
        this.selfClosingAlert.close();
      }
    });
  }
  onSubmit(){
    console.log("form is submitted");
    if((this.credentials.username!='' && this.credentials.password!='') && (this.credentials.username!=null && this.credentials.password!=null)){
      console.log(this.credentials);
      this.loginService.genareteToken(this.credentials).subscribe(
        (response:any)=>{
          // console.log(response);
          this.loginService.loginUser(response.Token,this.credentials.username);
          window.location.href="/user/profile";
        },
        (error:any)=>{
          if(error.status==0){
            this.successMessage="Server Error! Try again later...";
            setTimeout(() => this.selfClosingAlert.close(), 5000);
          }
          else{
            this.successMessage=error.error.message;
            setTimeout(() => this.selfClosingAlert.close(), 5000);
            // console.warn(error);
          }
        }    
      )
    }else{
      this.successMessage="Empty Credential";
      setTimeout(() => this.selfClosingAlert.close(), 5000);
    }
  }

}
