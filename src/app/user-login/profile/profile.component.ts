import { Component, OnInit } from '@angular/core';
import { RegisterService } from 'src/app/services/register.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user:any;

  constructor(private registerService:RegisterService) { }

  ngOnInit(): void {
    const username = localStorage.getItem("username");
    if(username!=null){
      this.registerService.getUserDetails(username).subscribe(
        responce=>{
          this.user=responce;
          console.log(responce);
        }
      )
    }
  }
}
