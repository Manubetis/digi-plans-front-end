import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class EventoService {

    private URL = 'http://localhost:4000/api'

    constructor(private http: HttpClient) { }

    obtenerEventos() {
        return this.http.get(this.URL + '/obtener-eventos');
    }

}