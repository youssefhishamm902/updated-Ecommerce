import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';
import {jwtDecode} from 'jwt-decode';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  

  constructor(private httpclient : HttpClient, private router: Router) { }
  userData:any;

  signUp(data: object):Observable<any> {
    return this.httpclient.post(`${environment.baseUrl}/api/v1/auth/signup`, data);
  }


  signIn(data: object):Observable<any> {
    return this.httpclient.post(`${environment.baseUrl}/api/v1/auth/signin`, data);
  }

  getUserData():void{
   this.userData = jwtDecode(localStorage.getItem('myToken') !);
  }

  signOut(){
    // 1)
    localStorage.removeItem('myToken');

    // 2)
    this.userData = null;

    // 3)
     this.router.navigate(['/login']);

  }
}
