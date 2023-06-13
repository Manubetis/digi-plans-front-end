import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Evento } from 'src/app/interfaces/evento';
import { AuthService } from 'src/app/service/auth.service';
import { EventoService } from 'src/app/service/eventoService.service';

@Component({
  selector: 'app-detalles',
  templateUrl: './detalles.component.html',
  styleUrls: ['./detalles.component.css']
})
export class DetallesComponent implements OnInit {

  eventos: Evento[] = [];

  constructor(private eventoService: EventoService) { }

  ngOnInit(): void {
    const url = window.location.href;
    const splittedUrl = url.split('/');

    const valorId = splittedUrl[5];

    this.obtnerEventoPorId(valorId)
  }

  obtnerEventoPorId(id: string) {
    this.eventoService.obtenerEventosPorId(id).subscribe({
      next: (res: any) => {
        this.eventos = [res];
      },
      complete: () => {
        console.log('Obtención de eventos realizada');
      },
      error: (err) => {
        console.log('Ocurrió un error:' + err);
      }
    });
  }

}
