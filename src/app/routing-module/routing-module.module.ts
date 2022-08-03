import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth.guard';
import { CareerAdviceComponent } from '../career-advice/career-advice.component';
import { FavoriteComponent } from '../favorite/favorite.component';
import { HomeComponent } from '../home/home.component';
import { JobsComponent } from '../jobs/jobs.component';
import { SerchComponent } from '../serch/serch.component';
import { JobTypeComponent } from '../update-profile/job-type/job-type.component';
import { LocationComponent } from '../update-profile/location/location.component';
import { PasswordComponent } from '../update-profile/password/password.component';
import { PhoneNumberComponent } from '../update-profile/phone-number/phone-number.component';
import { UpdateProfileComponent } from '../update-profile/update-profile.component';
import { ProfileComponent } from '../user-login/profile/profile.component';
import { SignInComponent } from '../user-login/sign-in/sign-in.component';
import { SignUpComponent } from '../user-login/sign-up/sign-up.component';
import { UserLoginComponent } from '../user-login/user-login.component';

const routes: Routes = [
  {
  path: '',
  component: HomeComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'career-advice',
    component: CareerAdviceComponent,
  },
  {
    path: 'jobs/:pageNo',
    component: JobsComponent,
  },
  {
    path: 'search/:catagory',
    component: SerchComponent,
  },
  {
    path: 'favorite',
    component: FavoriteComponent,
    canActivate:[AuthGuard],
  },
  {
    path: 'update-profile',
    component: UpdateProfileComponent,
    canActivate:[AuthGuard],
    children:[
      {
        path: 'phone',
        component: PhoneNumberComponent,
      },
      {
        path: 'location',
        component: LocationComponent,
      },
      {
        path: 'job-type',
        component: JobTypeComponent,
      },
      {
        path: 'password',
        component: PasswordComponent,
      },
    ]
  },

  {
    path: 'user',
    component: UserLoginComponent,
    children:[
      {
        path: 'sign-in',
        component: SignInComponent,
      },
      {
        path: 'sign-up',
        component: SignUpComponent,
      },
      {
        path:'profile',
        component:ProfileComponent,
        canActivate:[AuthGuard], 
      },
    ]
  },
  ];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
    ],
    exports: [
    RouterModule
    ],
    declarations: []
})
export class RoutingModuleModule { }
