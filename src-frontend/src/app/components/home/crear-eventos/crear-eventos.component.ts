import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Evento } from 'src/app/interfaces/evento';
import { AuthService } from 'src/app/service/auth.service';
import { EventoService } from 'src/app/service/eventoService.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-eventos',
  templateUrl: './crear-eventos.component.html',
  styleUrls: ['./crear-eventos.component.css']
})
export class CrearEventosComponent implements OnInit{

  formulario: FormGroup;

  eventoCreado!: Evento;

  usuario!: any;

  constructor(
    private eventoService: EventoService,
    private authService: AuthService,
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

  ngOnInit(): void {
    this.usuario = this.authService.getUsuario();
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

  mostrarModal() {
    Swal.fire({
      icon: 'success',
      title: 'Evento creado correctamente!',
      showConfirmButton: false,
      timer: 1500
    })
  }

  crearEvento() {
    console.log(this.formulario.value)

    this.eventoCreado = {
      _id: '',
      titulo: this.formulario.value.titulo,
      categoria: this.formulario.value.categoria,
      fecha: this.formulario.value.fecha,
      localidad: this.formulario.value.localidad,
      datos_de_interes: this.formulario.value.datos_de_interes,
      creador: this.usuario._id
    }

    this.eventoService.crearEventos(this.eventoCreado).subscribe(
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
