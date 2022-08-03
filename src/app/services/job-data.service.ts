import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JobDataService {
// url="https://www.themuse.com/api/public/jobs?page=0";
  constructor(private http:HttpClient ) { }
  jobs(url:string){
    return this.http.get(url);
  }

  jobsByCatagory(catagory:any){
    // console.log("https://www.themuse.com/api/public/jobs?category="+catagory+"&page=0");
    
    return this.http.get("https://www.themuse.com/api/public/jobs?category="+catagory+"&page=0")
  }
}
