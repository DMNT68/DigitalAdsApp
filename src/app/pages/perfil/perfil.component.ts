import { Component } from '@angular/core';

import { GestureEventData } from "tns-core-modules/ui/gestures";
import {GridLayout} from "tns-core-modules/ui/layouts/grid-layout";
import { alert, confirm, prompt, login, action, inputType } from "tns-core-modules/ui/dialogs";



import { UsuarioService } from '../../shared/services/service.index';
import { Usuario } from '../../shared/models/usuario.model';

@Component({
  selector: 'Perfil',
  moduleId:module.id,
  providers:[UsuarioService],
  templateUrl: `perfil.component.html`,
  styleUrls:['perfil.component.css']
})
export class PerfilComponent {

  usuario: Usuario;
  editar= false;

  constructor(public _usuarioService: UsuarioService) {
    this.usuario = this._usuarioService.usuario;
  }

 modificar (texto:string, Usuario:Usuario){
  prompt({
    title: "Editar",
    message: `Vas editar ${texto}`,
    okButtonText: "Confirmar",
    cancelButtonText: "Cancelar",
    defaultText: `${texto}`,
    inputType: inputType.text
  }).then((result) => {
    // The result property is true if the dialog is closed with the OK button,
    // false if closed with the Cancel button or undefined if closed with a neutral button.
    console.log("Dialog result: " + result.result);
    console.log("Text: " + result.text);
    if(result.result){
      
      if(texto === 'Nombre'){
        this.usuario.nombre = result.text;
        this._usuarioService.actualizarUsuario(this.usuario).subscribe();
        console.log('nombre',this.usuario.nombre);
      } else if (texto === 'Correo Electrónico') {
        this.usuario.email = result.text;
        this._usuarioService.actualizarUsuario(this.usuario).subscribe();
        console.log('email',this.usuario.email);
      } else {
        this.usuario.telefono = result.text;
        console.log('telefono',this.usuario.telefono);
        this._usuarioService.actualizarUsuario(this.usuario).subscribe();
      }

    }
  });
}

  salir(){
    this._usuarioService.logout();
  }
}