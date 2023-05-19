import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// Components
import { HomeComponent } from './components/home/home.component';
import { HomeUsuarioNoRegistradoComponent } from './components/home-usuario-no-registrado/home-usuario-no-registrado.component';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';

import { AuthGuard } from '../app/guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/homeUsuarioNoRegistrado', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'signin', component: SigninComponent },
  { path: 'signup', component: SignupComponent },
  {path: 'homeUsuarioNoRegistrado', component:HomeUsuarioNoRegistradoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
