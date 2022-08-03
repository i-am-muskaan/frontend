import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { NgbAlert } from '@ng-bootstrap/ng-bootstrap';
import { JobDataService } from 'src/app/services/job-data.service';
import { FavoritesService } from '../services/favorites.service';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.css']
})
export class JobsComponent implements OnInit {

  successMessage = '';
  @ViewChild('selfClosingAlert', { static: false })
  selfClosingAlert!: NgbAlert;
  page: any = this.route.snapshot.paramMap.get('pageNo');
  pageNo: number = parseInt(this.page);
  url: string = "https://www.themuse.com/api/public/jobs?page=" + this.pageNo;
  jobs: any;
  login: any;
  constructor(jobData: JobDataService,private favoriteService: FavoritesService, private route: ActivatedRoute, private router: Router, private loginService: LoginService) {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    }

    this.router.events.subscribe((evt: any) => {
      if (evt instanceof NavigationEnd) {
        // trick the Router into believing it's last link wasn't previously loaded
        this.router.navigated = false;
        // if you need to scroll back to top, here is the right place
        window.scrollTo(0, 0);
      }
    });

    jobData.jobs(this.url).subscribe((data) => {
      console.warn("data", data);
      this.jobs = data;
      this.jobs = this.jobs.results;
    });
    // this.jobs=this.jobs.results;

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
    this.login = this.loginService.isLoggedIn();
    const username = localStorage.getItem("username");
  }

}
