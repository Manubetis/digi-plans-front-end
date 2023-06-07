import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Evento } from 'src/app/interfaces/evento';
import { EventoService } from 'src/app/service/eventoService.service';

@Component({
  selector: 'app-crear-eventos',
  templateUrl: './crear-eventos.component.html',
  styleUrls: ['./crear-eventos.component.css']
})
export class CrearEventosComponent {

  formulario: FormGroup;

  constructor(
    private eventoService: EventoService,
    private router: Router,
    public fb: FormBuilder
  ) {
    this.formulario = this.fb.group({
      titulo: ['', [Validators.required]],
      fecha: ['', [Validators.required, this.validarFecha]],
      categoria: ['', [Validators.required]],
      localidad: ['', [Validators.required]],
      datos_de_interes:['']
    })
  }

  validarFecha(control: AbstractControl): { [key: string]: any } | null {
    const fechaIntroducida = new Date(control.value);
    const fechaActual = new Date();

    if (fechaIntroducida < fechaActual) {
      return { 'fechaAnterior': true };
    }else{
      return null
    }
  }

  crearEvento() {
    console.log(this.formulario.value)
    this.eventoService.crearEventos(this.formulario.value).subscribe(
      (res) => {
        console.log(res);
        this.router.navigate(['/home']);
      },
      (err) => {
        console.log(err);
      }
    );
  }

}
