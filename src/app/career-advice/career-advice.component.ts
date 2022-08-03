import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbAlert } from '@ng-bootstrap/ng-bootstrap';
import { FavoritesService } from '../services/favorites.service';
import { JobDataService } from '../services/job-data.service';
import { LoginService } from '../services/login.service';
import { RegisterService } from '../services/register.service';

@Component({
  selector: 'app-career-advice',
  templateUrl: './career-advice.component.html',
  styleUrls: ['./career-advice.component.css']
})
export class CareerAdviceComponent implements OnInit {

  successMessage = '';
  @ViewChild('selfClosingAlert', { static: false })
  selfClosingAlert!: NgbAlert;
  catagory: any = "";
  login: any;

  jobs: any;
  constructor(private jobData: JobDataService,
    private registerService: RegisterService,
    private favoriteService: FavoritesService,
    private loginService: LoginService) {

  }
  addFavorite(job: any) {
    // console.log(job);
    this.favoriteService.addFavorite(job).subscribe(
      responce => {
        // console.log(responce);

      },
      error => {
        console.warn(error);
        if (error.status === 201) {
          this.successMessage = `Job is added to your favorite.`;
          setTimeout(() => this.selfClosingAlert.close(), 3000);
        }
        else if (error.status === 409) {
          this.successMessage = `This job is already present in your favorite.`;
          setTimeout(() => this.selfClosingAlert.close(), 3000);
        }
        else {
          this.successMessage = `Server error. Try agin later.`;
          setTimeout(() => this.selfClosingAlert.close(), 3000);
        }

      }
    )
    // console.warn(jobObj);
  }
  ngOnInit(): void {
    this.login = this.loginService.isLoggedIn();
    const username = localStorage.getItem("username");
    if (username != null) {
      this.registerService.getUserDetails(username).subscribe(
        (responce: any) => {
          this.catagory = responce.jobType;
          // console.log(responce.jobType);
          this.jobData.jobsByCatagory(encodeURIComponent(this.catagory)).subscribe((data) => {
            // console.warn("data", data);
            this.jobs = data;
            this.jobs = this.jobs.results;
          });
        }
      )
    }

  }
}
