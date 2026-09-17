import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
interface User {
  username: string;
}
@Injectable({
  providedIn: 'root',
})

export class Auth {

  private http=inject(HttpClient);
  private baseUrl='https://bookmark-manager-2kyh.onrender.com/';
  // private baseUrl='http://localhost:8080/';
  currentUser: User | null = null;
  registerUser(data:{username:string,password:string}){
    return this.http.post(this.baseUrl+'auth/register',data,{ withCredentials: true });
  }

  loginUser(data:{username:string,password:string}){
    return this.http.post(this.baseUrl+'auth/login',data,{ withCredentials: true });
  }
 
  logoutUser(){
    return this.http.post(this.baseUrl+'auth/logout',{}, { withCredentials: true });
  }
}
