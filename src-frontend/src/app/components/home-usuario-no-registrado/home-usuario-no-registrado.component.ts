import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2'
import { EventoService } from 'src/app/service/eventoService.service';
import { Evento } from 'src/app/interfaces/evento';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/interfaces/usuario';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-home-usuario-no-registrado',
  templateUrl: './home-usuario-no-registrado.component.html',
  styleUrls: ['./home-usuario-no-registrado.component.css']
})
export class HomeUsuarioNoRegistradoComponent implements OnInit{

  constructor(
    private eventoService: EventoService,
    private router: Router
  ) {

  }

  eventos: Evento[] = [];
  listaEventosFiltrada: Evento[] = [];

  ngOnInit(): void {
    this.obtenerEventos();
    if (localStorage.getItem('token') || sessionStorage.getItem('token')) {
      this.router.navigate(['/home']);
    }
  }

  mostrarModal() {
    Swal.fire({
      icon: 'error',
      title: 'Debes iniciar sesión',
      showConfirmButton: false,
      timer: 1500
    })
  }

  obtenerEventos() {
    this.eventoService.obtenerEventos().subscribe({
      next: (res: any) => {
        console.log(res);
        this.eventos = res;
        this.listaEventosFiltrada = res;
      },
      complete: () => {
        console.log('Obtención de eventos realizada');
      },
      error: (err) => {
        console.log('Ocurrió un error:' + err);
      }});
  }

  filtrarEventoPorCategoria(categoria: string) {
    this.listaEventosFiltrada = this.eventos.filter(evento => evento.categoria === categoria);
  }
}
