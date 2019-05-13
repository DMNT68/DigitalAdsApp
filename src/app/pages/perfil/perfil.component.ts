import { Component } from '@angular/core';

import {prompt, inputType } from "tns-core-modules/ui/dialogs";



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

 modificar (texto:string, usuario:Usuario){

  prompt({
    title: "Editar Perfil - Digital ADS",
    message: `Vas editar ${texto}`,
    okButtonText: "Confirmar",
    cancelButtonText: "Cancelar",
    defaultText: '',
    inputType: inputType.text
  }).then((result) => {


    console.log("Dialog result: " + result.result);
    console.log("Text: " + result.text);
    console.log('usuario parametro: ', usuario);

    if(result.result){
      
      if(texto === 'Nombre'){
        usuario.nombre = result.text;
        this._usuarioService.actualizarUsuario(usuario).subscribe();
        console.log('nombre',this.usuario.nombre);
      } else if (texto === 'Correo Electrónico') {
        usuario.email = result.text;
        this._usuarioService.actualizarUsuario(usuario).subscribe();
        console.log('email',this.usuario.email);
      } else {
        usuario.telefono = result.text;
        console.log('telefono',this.usuario.telefono);
        this._usuarioService.actualizarUsuario(usuario).subscribe();
      }

    }
    
  });
}

  salir(){
    this._usuarioService.logout();
  }
}