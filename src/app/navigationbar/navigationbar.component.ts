import { Component, OnInit } from '@angular/core';
import { debounceTime, distinctUntilChanged, map, Observable, OperatorFunction } from 'rxjs';
import { JobtypeService } from '../services/jobtype.service';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-navigationbar',
  templateUrl: './navigationbar.component.html',
  styleUrls: ['./navigationbar.component.css']
})
export class NavigationbarComponent implements OnInit {
  data=[''];

  public model: any;

  formatter = (result: string) => result;

  login:boolean=false;
  username:string | null='';
  constructor(private loginService:LoginService,private jobType:JobtypeService) {
  }

  ngOnInit(): void {
    this.login=this.loginService.isLoggedIn();
    this.username=localStorage.getItem('username');
    this.data=this.jobType.getJobTypes();
    
  }

  doLogout(){
    this.loginService.logout();
    location.href="/home";
  }

  search: OperatorFunction<string, readonly string[]> = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => term === '' ? []
        : this.data.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    )
    
    serchJob(){
      window.location.href = `/search/${encodeURIComponent(this.model)}`;
    }
  
}
