import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbAlert } from '@ng-bootstrap/ng-bootstrap';
import { Country, State, City }  from 'country-state-city';
import { RegisterService } from 'src/app/services/register.service';


@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit {

countries:any;
states:any;
cities:any;
countryValue:any;
country:any;
stateValue:any;
state:any;
city:any;

successMessage = '';
@ViewChild('selfClosingAlert', { static: false })
selfClosingAlert!: NgbAlert;

  constructor(private registerService:RegisterService) {

  }

  ngOnInit(): void {
    this.countries= Country.getAllCountries();
    // console.log(this.countries);
    
  }
  loadState(){
    this.country=Country.getCountryByCode(this.countryValue)?.name;
    this.states=State.getStatesOfCountry(this.countryValue);
  }
  loadCity(){
    this.state=State.getStateByCodeAndCountry(this.stateValue,this.countryValue)?.name;
    this.cities=City.getCitiesOfState(this.countryValue,this.stateValue);
    
  }

  onSubmit() {
    console.log(this.city,this.state,this.country);
    this.registerService.updateCity(localStorage.getItem('username'),this.country,this.state,this.city).subscribe(
      responce=>{
        // console.log(responce);
      },
      error=>{
        console.warn(error);
        if(error.status===200){
          this.successMessage="Your location is updated.";
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
