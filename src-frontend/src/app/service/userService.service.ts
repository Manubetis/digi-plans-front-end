import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

    constructor(private http: HttpClient) {}

    revisarSiExisteEmail(email: string): Observable<boolean> {
      return this.http.get<boolean>(`/api/check-email/`);
    }

}