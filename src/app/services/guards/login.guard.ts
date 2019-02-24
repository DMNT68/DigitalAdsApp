import { UsuarioService } from '../usuario/usuario.service';
import { Injectable, Component } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

// Servicios


@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(public _usuarioService: UsuarioService, public router: Router) {}

  canActivate() {
    
    if (this._usuarioService.estaLogueado()) {
      // console.log('Paso por el Guard');
      return true;
    } else {
      // console.log('Bloqueado por el Guard');
      this.router.navigate(['login']);
      return false;
    }
  }
}