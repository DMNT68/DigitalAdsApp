import { UsuarioService } from '../usuario/usuario.service';
import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { RouterExtensions } from 'nativescript-angular/router';

// Servicios


@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(public _usuarioService: UsuarioService, public router: RouterExtensions) {}

  canActivate() {
    
    if (this._usuarioService.estaLogueado()) {
      // console.log('Paso por el Guard');
      return true;
    } else {
      // console.log('Bloqueado por el Guard');
      this.router.navigate(['/login']);
      return false;
    }
  }
}