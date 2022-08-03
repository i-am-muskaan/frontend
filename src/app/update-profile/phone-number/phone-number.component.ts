import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbAlert } from '@ng-bootstrap/ng-bootstrap';
import { RegisterService } from 'src/app/services/register.service';

@Component({
  selector: 'app-phone-number',
  templateUrl: './phone-number.component.html',
  styleUrls: ['./phone-number.component.css']
})
export class PhoneNumberComponent implements OnInit {
  phone = ""
  
  successMessage = '';
  @ViewChild('selfClosingAlert', { static: false })
  selfClosingAlert!: NgbAlert;

  constructor(private registerService: RegisterService) { }

  ngOnInit(): void {
  }
  onSubmit() {
    console.log(localStorage.getItem('username'), this.phone);
    const username = localStorage.getItem("username");
    if (username != null) {
      this.registerService.updatePhone(username, this.phone).subscribe(
        responce => {
          console.log(responce);
        },
        error => {
          if(error.status===200){
            this.successMessage="Your phone number is updated.";
            setTimeout(() => this.selfClosingAlert.close(), 5000);
          }
          else{
            this.successMessage="There is some error!";
            setTimeout(() => this.selfClosingAlert.close(), 5000);
          }
        }
      )
    }
  }
}
