import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { UserService } from 'src/app/service/userService.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder, AbstractControl, ValidationErrors } from '@angular/forms';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  user = {
    nombreApellidos: '',
    password: '',
    email: '',
    fechaNacimiento: '',
    localidad: ''
  }

  formulario: FormGroup;

  mensajeErrorCorreo = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    public fb: FormBuilder
  ) {
    this.formulario = this.fb.group({
      nombreApellidos: ['', [Validators.required]],
      password: ['', [Validators.required]],
      fechaNacimiento: ['', [Validators.required, this.validarMayorEdad]],
      localidad: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
    })
  }

  validarMayorEdad(control: AbstractControl): ValidationErrors | null {
    const fechaActual = new Date();
    const fechaNacimiento = new Date(control.value);
  
    const anioActual = fechaActual.getFullYear();
    const mesActual = fechaActual.getMonth();
    const diaActual = fechaActual.getDate();
  
    const anioNacimiento = fechaNacimiento.getFullYear();
    const mesNacimiento = fechaNacimiento.getMonth();
    const diaNacimiento = fechaNacimiento.getDate();
  
    let edad = anioActual - anioNacimiento;
  
    if (mesActual < mesNacimiento || (mesActual === mesNacimiento && diaActual < diaNacimiento)) {
      edad--;
    }
  
    if (edad <= 18) {
      return { invalid: true };
    }
  
    return null;
  }

  signUp() {
    this.authService.signUp(this.user).subscribe(
      (res) => {
        console.log(res);
        localStorage.setItem('token', res.token);
        this.router.navigate(['/home']);
      },
      (err) => {
        console.log(err);
        this.mensajeErrorCorreo = 'El correo electrónico ya existe';
      }
    );
  }
}
