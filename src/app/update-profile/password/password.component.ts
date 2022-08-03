import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbAlert } from '@ng-bootstrap/ng-bootstrap';
import { RegisterService } from 'src/app/services/register.service';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css']
})
export class PasswordComponent implements OnInit {

  body={
    username:localStorage.getItem('username'),
    oldpass:"",
    newpass:""
  }
  cnfpass="";

  successMessage = '';
  @ViewChild('selfClosingAlert', { static: false })
  selfClosingAlert!: NgbAlert;

  constructor(private registerService:RegisterService) { }

  ngOnInit(): void {
  }
  onSubmit(){
    this.registerService.updatePassword(this.body).subscribe(
      responce=>{},
      error=>{
        if(error.status===200){
          this.successMessage="Your password is updated.";
          setTimeout(() => this.selfClosingAlert.close(), 5000);
        }
        else{
          this.successMessage=error.error;
          setTimeout(() => this.selfClosingAlert.close(), 5000);
        }
      }
    )

    
  }

}
