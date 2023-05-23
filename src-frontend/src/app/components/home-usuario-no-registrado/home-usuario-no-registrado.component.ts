import { Component } from '@angular/core';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-home-usuario-no-registrado',
  templateUrl: './home-usuario-no-registrado.component.html',
  styleUrls: ['./home-usuario-no-registrado.component.css']
})
export class HomeUsuarioNoRegistradoComponent {

  mostrarModal(){
    Swal.fire({
      icon: 'error',
      title: 'Debes iniciar sesión',
      showConfirmButton: false,
      timer: 1500
    })
  }
}
