import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Evento } from 'src/app/interfaces/evento';
import { AuthService } from 'src/app/service/auth.service';
import { EventoService } from 'src/app/service/eventoService.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-eventos',
  templateUrl: './editar-eventos.component.html',
  styleUrls: ['./editar-eventos.component.css']
})
export class EditarEventosComponent implements OnInit {

  formulario: FormGroup;

  formularioEvento: Evento = {
    _id: '',
    titulo: '',
    fecha: new Date(),
    categoria: '',
    localidad: '',
    datos_de_interes: '',
    creador: ''
  };

  evento!: any;

  usuario!: any;

  fechaFormateada!: string;

  constructor(
    private eventoService: EventoService,
    private authService: AuthService,
    private route: Router,
    public fb: FormBuilder
  ) {
    this.formulario = this.fb.group({
      titulo: ['', [Validators.required]],
      fecha: ['', [Validators.required, this.validarFecha]],
      categoria: ['', [Validators.required]],
      localidad: ['', [Validators.required]],
      datos_de_interes: ['']
    })
  }

  ngOnInit(): void {
    this.usuario = this.authService.getUsuario();

    const url = window.location.href;
    const splittedUrl = url.split('/');

    const valorId = splittedUrl[5];

    this.obtenerEventoPorId(valorId);
  }

  validarFecha(control: AbstractControl): { [key: string]: any } | null {
    const fechaIntroducida = new Date(control.value);
    const fechaActual = new Date();

    if (fechaIntroducida < fechaActual) {
      return { 'fechaAnterior': true };
    } else {
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

  obtenerEventoPorId(id: string) {
    this.eventoService.obtenerEventosPorId(id).subscribe({
      next: (res: any) => {
        this.evento = res;
        this.formularioEvento = res;
        this.cargarValoresFormulario();
      },
      complete: () => {
        console.log('Obtención de eventos realizada');
      },
      error: (err) => {
        console.log('Ocurrió un error:' + err);
      }
    });
  }

  formatearFecha(fechaOriginal: string) {
    const fecha = new Date(fechaOriginal);
    const año = fecha.getFullYear();
    const mes = ("0" + (fecha.getMonth() + 1)).slice(-2);
    const dia = ("0" + fecha.getDate()).slice(-2);

    this.fechaFormateada = `${año}-${mes}-${dia}`;
  }

  cargarValoresFormulario() {
    this.formatearFecha(this.evento.fecha);

    this.formulario.patchValue({
      titulo: this.evento.titulo,
      fecha: this.fechaFormateada,
      categoria: this.evento.categoria,
      localidad: this.evento.localidad,
      datos_de_interes: this.evento.datos_de_interes
    });
  }

  editarEventoForm() {
    const url = window.location.href;
    const splittedUrl = url.split('/');

    const valorId = splittedUrl[5];

    this.editarEvento(valorId);
  }

  editarEvento(id: string) {
    const data = {
      titulo: this.evento.titulo,
      fecha: this.evento.fecha,
      categoria: this.evento.categoria,
      localidad: this.evento.localidad,
      datos_de_interes: this.evento.datos_de_interes
    }

    this.eventoService.actualizarEvento(id, data).subscribe({
      complete: () => {
        Swal.fire({
          icon: 'success',
          title: 'Evento actualizado correctamente!',
          showConfirmButton: false,
          timer: 1500
        })
        this.route.navigate(['/home']);
        console.log('Se ha acutaizado el evento correctamente');
      },
      error: (err) => {
        console.log('Ocurrió un error:' + err);
      }
    })
  }
}
