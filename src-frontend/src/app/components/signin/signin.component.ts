import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})

export class SigninComponent{

  user = {
    email: '',
    password: ''
  }

  formulario: FormGroup;

  mantenerSesion: boolean = true;

  errorMensaje: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.formulario = this.fb.group({
      password: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
    })
  }

  signIn() {
    this.authService.signIn(this.user).subscribe(
      (res) => {
        console.log(res);
        if (this.mantenerSesion) {
          localStorage.setItem('token', res.token);
          this.router.navigate(['/home']);
        }else{
          sessionStorage.setItem('token', res.token);
          this.router.navigate(['/home']);
        }
      },
      (err) =>{
        console.log(err);
        this.errorMensaje = 'El correo electrónico o la contraseña esta mal introducido';
      }
    );
  }

  mantenerSesionIniciada() {
    this.mantenerSesion = !this.mantenerSesion;
  }
}
