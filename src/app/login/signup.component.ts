import { Component } from '@angular/core';
import { Page } from 'tns-core-modules/ui/page/page';

import { alert, prompt } from "tns-core-modules/ui/dialogs";
import { UsuarioService } from '../services/service.index';
import { Usuario } from '../models/usuario.model';
import { RouterExtensions } from 'nativescript-angular/router';

@Component({
  selector: 'Signup',
  providers: [UsuarioService],
  moduleId: module.id,
  templateUrl: `signup.component.html`,
  styleUrls: ['login.component.css']

})
export class SignupComponent {

    nombre: string;
    email: string;
    telefono: string;
    password: string;
    password2: string;

  constructor(private page:Page, private router:RouterExtensions, private _usuarioService: UsuarioService) {
    this.page.actionBarHidden = true;
  }

  signup(){
    if (this.password !==  this.password2) {
      alert("Las contrasenias no coinciden");
      return false;
    }

    let usuario = new Usuario(
      this.nombre,
      this.email,
      this.password,
      this.telefono);

    this._usuarioService.crearUsuario(usuario)
    .subscribe(()=>{

      alert("Su cuenta ha sido creada correctamente");
      this.router.navigate(['/login']);
      
    }, error => {
      alert("No pudimos crear su cuenta. Intentalo más tarde");
      console.log('error ',error);
    });
  }
  
  regresarLogin(){
    this.router.navigate(['/login']);
  }

  alert(message: string) {
    return alert({
        title: "DIGITAL ADS",
        okButtonText: "OK",
        message: message
    });
  }

}