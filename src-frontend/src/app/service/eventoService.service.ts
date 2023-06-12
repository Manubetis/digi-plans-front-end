import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Evento } from '../interfaces/evento';

@Injectable({
    providedIn: 'root'
})
export class EventoService {

    private URL = 'http://localhost:4000/api'

    constructor(private http: HttpClient) { }

    obtenerEventos() {
        return this.http.get(this.URL + '/obtener-eventos');
    }

    obtenerEventosPorId(id: string){
        return this.http.get(this.URL + '/obtener-eventos/' + id)
    }

    obtenerEventosInscritos(idEvento:string){
        return this.http.get(this.URL+ '/eventosInscritos/' + idEvento);
    }

    crearEventos(evento: Evento) {
        return this.http.post<any>(this.URL + '/crear-evento', evento);
    }
}