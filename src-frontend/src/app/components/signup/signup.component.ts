import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent{

  user = {
    nombreApellidos: '',
    password: '',
    email: '',
    fechaNacimiento: '',
    localidad: ''
  }

  constructor(
    private authService: AuthService,
    private router: Router
  ) {

  }

  signUp() {
    this.authService.signUp(this.user).subscribe(
      (res) => {
        console.log(res);
        localStorage.setItem('token', res.token);
        this.router.navigate(['/home']);
      },
      err=> {
        console.log(err);
      }
    );
  }
}
