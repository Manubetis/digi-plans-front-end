import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from '../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private URL = environment.apiUrl;

  constructor(private http: HttpClient) { }

  obtenerUsuario(id: string): Observable<any> {
    return this.http.get(this.URL + '/obtener-usuario/' + id);
  }

  inscribirUsuario(data: Object) {
    return this.http.put(this.URL + '/inscribirUsuario', data);
  }

  desinscribirUsuario(data: Object) {
    return this.http.put(this.URL + '/desinscribirUsuario', data);
  }

  obtenerEventoCreadoPorUsuario(id_creador: string) {
    return this.http.get(this.URL + '/obtener-eventos/creador/' + id_creador);
  }

}