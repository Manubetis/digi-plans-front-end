import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './components/signup/signup.component';
import { SigninComponent } from './components/signin/signin.component';
import { HomeComponent } from './components/home/home.component';

import { AuthGuard } from '../app/guards/auth.guard';
import { TokenInterceptorService } from './service/token-interceptor.service';
import { HomeUsuarioNoRegistradoComponent } from './components/home-usuario-no-registrado/home-usuario-no-registrado.component';
import { FooterComponent } from './compartido/footer/footer.component';
import { HeaderComponent } from './compartido/header/header.component';
import { CrearEventosComponent } from './components/home/crear-eventos/crear-eventos.component';
import { DetallesComponent } from './components/home/detalles/detalles.component';
import { EditarEventosComponent } from './components/home/editar-eventos/editar-eventos/editar-eventos.component';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    SigninComponent,
    HomeComponent,
    HomeUsuarioNoRegistradoComponent,
    FooterComponent,
    HeaderComponent,
    CrearEventosComponent,
    DetallesComponent,
    EditarEventosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
