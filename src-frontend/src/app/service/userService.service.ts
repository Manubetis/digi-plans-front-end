import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

    constructor(private http: HttpClient) {}

    revisarSiExisteEmail(email: string): Observable<any> {
      return this.http.get(`/api/check-email/${email}`);
    }

}