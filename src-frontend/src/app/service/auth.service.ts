import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';
import { environment } from '../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private URL = environment.apiUrl;

  constructor(private http: HttpClient, private router: Router) { }

  signUp(user: {}) {
    return this.http.post<any>(this.URL + '/signup', user);
  }

  signIn(user: {}) {
    return this.http.post<any>(this.URL + '/signin', user);
  }

  loggedIn() {
    return !!localStorage.getItem('token');
  }

  loggedInSession() {
    return !!sessionStorage.getItem('token');
  }

  logOut() {
    localStorage.removeItem('token')
    sessionStorage.removeItem('token')
    this.router.navigate(['/signin'])
  }

  getUsuario(): any {
    const token = this.getToken();

    if (!token) {
      return null;
    }

    const decodedToken: any = jwt_decode(token);

    return decodedToken || null;
  }

  getToken() {
    return localStorage.getItem('token')
  }

}
