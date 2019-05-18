import { Component } from '@angular/core';

import {prompt, inputType } from "tns-core-modules/ui/dialogs";



import { UsuarioService } from '../../shared/services/service.index';
import { Usuario } from '../../shared/models/usuario.model';

@Component({
  selector: 'ns-perfil',
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

  modificar(texto:string, usuario:Usuario) {

    if (texto==='Nombre') {

      prompt({
        title: "Editar Perfil - Digital ADS",
        message: `Vas editar ${texto}`,
        okButtonText: "Confirmar",
        cancelButtonText: "Cancelar",
        defaultText: `${usuario.nombre}`,
        inputType: inputType.text
      }).then((result) => {
  
        if (result.result) {
            usuario.nombre = result.text;
            this._usuarioService.actualizarUsuario(usuario)
            .subscribe(()=>{
                this._usuarioService.alert(`El ${texto} ha sido modificado`);
              },error => {
                console.log('error:',error);  
                this._usuarioService.alert(`No se pudo modificar. Error: ${error}`);
              }
            );
        } else return;

    });

    } else if (texto === 'Correo Electrónico') {

      prompt({
        title: "Editar Perfil - Digital ADS",
        message: `Vas editar ${texto}`,
        okButtonText: "Confirmar",
        cancelButtonText: "Cancelar",
        defaultText: `${usuario.email}`,
        inputType: inputType.email
      }).then((result) => {
        
        if (result.result) {
            usuario.email = result.text;
            this._usuarioService.actualizarUsuario(usuario)
            .subscribe(()=>{
                this._usuarioService.alert(`El ${texto} ha sido modificado`);
              },error => {
                console.log('error:',error); 
                this._usuarioService.alert(`No se pudo modificar. Error: ${error}`); 
              }
            );
        } else return;

    });

    } else {
      
      prompt({
        title: "Editar Perfil - Digital ADS",
        message: `Vas editar ${texto}`,
        okButtonText: "Confirmar",
        cancelButtonText: "Cancelar",
        defaultText: `${usuario.telefono}`,
        inputType: inputType.number
      }).then((result) => {

        if(result.result){
            usuario.telefono = result.text;
            this._usuarioService.actualizarUsuario(usuario)
            .subscribe(()=>{
                this._usuarioService.alert(`El ${texto} ha sido modificado`);
              },error => {
                console.log('error:',error); 
                this._usuarioService.alert(`No se pudo modificar. Error: ${error}`);
              }
            ); 
        } else return;
        
    });

    }
}

  salir(){
    this._usuarioService.logout();
  }
}