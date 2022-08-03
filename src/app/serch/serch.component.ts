import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbAlert } from '@ng-bootstrap/ng-bootstrap';
import { FavoritesService } from '../services/favorites.service';
import { JobDataService } from '../services/job-data.service';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-serch',
  templateUrl: './serch.component.html',
  styleUrls: ['./serch.component.css']
})
export class SerchComponent implements OnInit {

  successMessage = '';
  @ViewChild('selfClosingAlert', { static: false })
  selfClosingAlert!: NgbAlert;
  catagory: any = this.route.snapshot.paramMap.get('catagory');
  catagoryDecode=decodeURIComponent(this.catagory);

  jobs: any;
  constructor(private jobData: JobDataService,private favoriteService: FavoritesService, private route: ActivatedRoute, private loginService: LoginService) {

  }
  addFavorite(job: any) {
    if (this.loginService.isLoggedIn()) {
      // console.log(job);
      this.favoriteService.addFavorite(job).subscribe(
        responce=>{
          // console.log(responce);
          
        },
        error=>{
          console.warn(error);
          if(error.status===201){
            this.successMessage=`Job is added to your favorite.`;
            setTimeout(() => this.selfClosingAlert.close(), 3000);
          }
          else if(error.status===409){
            this.successMessage=`This job is already present in your favorite.`;
            setTimeout(() => this.selfClosingAlert.close(), 3000);
          }
          else{
            this.successMessage=`Server error. Try agin later.`;
            setTimeout(() => this.selfClosingAlert.close(), 3000);
          }
          
        }
      )
      // console.warn(jobObj);
    }
    else{
      console.warn("Log in first");
      this.successMessage=`Please log-in first, to add favorites.`;
      setTimeout(() => this.selfClosingAlert.close(), 3000);
      
    }
  }
  ngOnInit(): void {
    setTimeout(() => this.selfClosingAlert.close(), 5000);
    this.jobData.jobsByCatagory(this.catagory).subscribe((data) => {
      console.warn("data", data);
      this.jobs = data;
      this.jobs = this.jobs.results;
    });
  }

}
