import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/interfaces/usuario';
import { AuthService } from 'src/app/service/auth.service';
import { UserService } from 'src/app/service/userService.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{

  usuario!: Usuario;

  esAdmin: boolean = false;

  constructor(public authService: AuthService, private userService: UserService){
  }
  
  ngOnInit(): void {
    this.usuario = this.authService.getUsuario();
    if (this.usuario) {
      this.comprobarRole();
    }
  }

  comprobarRole(){
    if(this.usuario.role === 'admin'){
      this.esAdmin = true
    }
  }
}
