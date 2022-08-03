import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  url="http://ec2-54-82-228-234.compute-1.amazonaws.com:8001/api/user/login";

  constructor(private http:HttpClient) { }

  genareteToken(credential:any){
    return this.http.post(`${this.url}`,credential);
  }
  //for login user
  loginUser(token: string,username:string){
    localStorage.setItem("token",token);
    localStorage.setItem("username",username);
    return true;
  }

  isLoggedIn(){
    let token=localStorage.getItem("token");
    if(token===undefined||token===''||token===null){
      return false;
    }
    else{
      return true;
    }
  }

  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    return true;
  }

  getToken(){
    return localStorage.getItem('token');
  }
}
