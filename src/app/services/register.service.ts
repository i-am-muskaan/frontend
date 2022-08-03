import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http:HttpClient) {
 }

 registerUser(user:any){
  return this.http.post('http://ec2-54-82-228-234.compute-1.amazonaws.com:8001/api/user',user);
 }
 registerUserForAuthentication(credentials:any){
  return this.http.post('http://ec2-54-82-228-234.compute-1.amazonaws.com:8001/api/user/register',credentials);
 }
 getUserDetails(username:string){
  let queryParams = new HttpParams().append("username",username);
  console.log(queryParams);
   return this.http.get("http://ec2-54-82-228-234.compute-1.amazonaws.com:8001/api/user",{params:queryParams});
 }
 updatePhone(username:string,phoneNo:string){
  // let queryParams = new HttpParams().append("username",username)
  // queryParams.append("phoneNo",phoneNo);
  // console.log(queryParams);

  return this.http.put(`http://ec2-54-82-228-234.compute-1.amazonaws.com:8001/api/user/update/phone?username=${username}&phoneNo=${phoneNo}`,{});
 }
 updateCity(username:any,country:string,state:string,city:string){
  // let queryParams = new HttpParams().append("username",username)
  // queryParams.append("country",country);
  // queryParams.append("state",state);
  // queryParams.append("country",city);
  // console.log(queryParams);

  return this.http.put(`http://ec2-54-82-228-234.compute-1.amazonaws.com:8001/api/user/update/location?username=${username}&country=${country}&state=${state}&city=${city}`,{});
 }
 updateJob(username:any,job:string){
  return this.http.put(`http://ec2-54-82-228-234.compute-1.amazonaws.com:8001/api/user/update/job-type?username=${username}&jobType=${job}`,{});
 }
 updatePassword(body:any){
  return this.http.put(`http://http://ec2-54-82-228-234.compute-1.amazonaws.com:8001/api/user/update/password`,body);
 }
}
