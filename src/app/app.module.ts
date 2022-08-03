import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClientModule } from '@angular/common/http';
import { SidebarModule } from 'ng-cdbangular';
import { NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavigationbarComponent } from './navigationbar/navigationbar.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { SignInComponent } from './user-login/sign-in/sign-in.component';
import { SignUpComponent } from './user-login/sign-up/sign-up.component';
import { RoutingModuleModule } from './routing-module/routing-module.module';
import { JobsComponent } from './jobs/jobs.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProfileComponent } from './user-login/profile/profile.component';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FavoriteComponent } from './favorite/favorite.component';
import { UpdateProfileComponent } from './update-profile/update-profile.component';
import { MenubarComponent } from './update-profile/menubar/menubar.component';
import { PhoneNumberComponent } from './update-profile/phone-number/phone-number.component';
import { LocationComponent } from './update-profile/location/location.component';
import { JobTypeComponent } from './update-profile/job-type/job-type.component';
import { PasswordComponent } from './update-profile/password/password.component';
import { SerchComponent } from './serch/serch.component';
import { CareerAdviceComponent } from './career-advice/career-advice.component'



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavigationbarComponent,
    UserLoginComponent,
    SignInComponent,
    SignUpComponent,
    JobsComponent,
    ProfileComponent,
    FavoriteComponent,
    UpdateProfileComponent,
    MenubarComponent,
    PhoneNumberComponent,
    LocationComponent,
    JobTypeComponent,
    PasswordComponent,
    SerchComponent,
    CareerAdviceComponent
  ],
  imports: [
    BrowserModule,
    RoutingModuleModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    SidebarModule,
    NgbModule,
    NgbTypeaheadModule
    
  ],
  exports:[FontAwesomeModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
