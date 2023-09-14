import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {environment} from '../../../assets/environment'
import { Observable } from 'rxjs/internal/Observable';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl  = environment.baseUrl
  

  constructor(private http : HttpClient) { }




  RegisterUser(Data:any):Observable<any>{

    return this.http.post(this.baseUrl+'Auth/register',Data)

  }


  login(Data:any):Observable<any>{
    return this.http.post(this.baseUrl+'Auth/login',Data)
  }

  checkLogin():Observable<any>{

    

    let sessionData = JSON.parse(sessionStorage['Credential'])
    

    let headers = new HttpHeaders();
    headers = headers.set('token', sessionData.token);

    return this.http.post(this.baseUrl+'Auth/validateToken',sessionData,{headers:headers})
    

  }


  getAllUser():Observable<any>{
    return this.http.get(this.baseUrl+'Auth/getAllUser')
  }

}
