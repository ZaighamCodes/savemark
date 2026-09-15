import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Auth {

  private http=inject(HttpClient);
  private baseUrl='http://localhost:8080/';

  registerUser(data:{username:string,password:string}){
    return this.http.post(this.baseUrl+'register',data);
  }

}
