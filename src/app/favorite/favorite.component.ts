import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbAlert } from '@ng-bootstrap/ng-bootstrap';
import { FavoritesService } from '../services/favorites.service';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.css']
})
export class FavoriteComponent implements OnInit {
  favorites:any=[];
  successMessage = '';
  @ViewChild('selfClosingAlert', { static: false })
  selfClosingAlert!: NgbAlert;
  constructor(private favorite:FavoritesService)  {
    
  } 

  ngOnInit(): void {
    setTimeout(() => this.selfClosingAlert.close(), 3000);

    const username=localStorage.getItem('username');
    if(username!=null){
      this.favorite.getFavorites(username).subscribe(
        (response:any)=>{
          // console.log(response);
          this.favorites=response;

        },
        error=>{
          // console.warn(error);
        }
      )
    }
  }
  delete(id:string){
    this.favorite.deleteFavorite(id).subscribe(
      responce=>{
        document.getElementById(id)?.remove();
        this.successMessage="Job is removed from your favorite.";
        setTimeout(() => this.selfClosingAlert.close(), 3000);
      },
      error=>{
        console.warn(error);
        
      }
    )
  }

}
