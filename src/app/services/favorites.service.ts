import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {

  constructor(private http:HttpClient) { }

  getFavorites(username:string){
    return this.http.get("http://localhost:8002/favorites/"+username);
  }

  addFavorite(job:any){
    let location: any = null;
      let level: any = null;
      if (job.locations.length > 0) {
        location = job.locations[0].name;
      }
      if (job.levels.length > 0) {
        level = job.levels[0].name;
      }
      let jobObj = {
        id: localStorage.getItem('username') + job.id,
        username: localStorage.getItem('username'),
        jobname: job.name,
        companyName: job.company.name,
        location: location,
        level: level,
        link: job.refs.landing_page
      }
    return this.http.post("http://localhost:8002/favorites",jobObj);
  }

  deleteFavorite(id:String){
    return this.http.delete("http://localhost:8002/delete/"+id);
  }
}
