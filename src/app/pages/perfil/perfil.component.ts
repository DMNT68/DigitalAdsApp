import { Component } from '@angular/core';

import {prompt, inputType } from "tns-core-modules/ui/dialogs";

import { UsuarioService, UtilService } from '../../shared/services/service.index';
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
	iconNombre: string;
  iconEmail: string;
  iconTelefono: string;
  iconEditar:string;
  

  constructor(public _usuarioService: UsuarioService, private _util: UtilService) {
    this.usuario = this._usuarioService.usuario;
    this.iconNombre = this._util.iconNombre;
    this.iconEmail = this._util.iconEmail ;
    this.iconTelefono = this._util.iconTelefono;
    this.iconEditar = this._util.iconModeEdit;
  }

  modificar(texto:string, usuario:Usuario) {

    if (texto==='Nombre') {
      
      this.editarNombre(texto,usuario);

    } else if (texto === 'Correo Electrónico') {

      this.editarEmail(texto,usuario);    

    } else {
      
      this.editarTelefono(texto, usuario)

    }
  }

  private editarNombre(texto:string, usuario:Usuario) {
    prompt({
      title: `Editar Perfil - Digital ADS`,
      message: `Editar ${texto}`,
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
  }

  private editarEmail(texto:string, usuario:Usuario) {
    prompt({
      title: "Editar Perfil - Digital ADS",
      message: `Editar ${texto}`,
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
  }

  private editarTelefono(texto:string, usuario:Usuario) {
    prompt({
      title: "Editar Perfil - Digital ADS",
      message: `Editar ${texto}`,
      okButtonText: "Confirmar",
      cancelButtonText: "Cancelar",
      defaultText: `${usuario.telefono}`,
      inputType: inputType.number
    }).then((result) => {

      if(result.result && result.text.length <= 10){
          usuario.telefono = result.text;
          this._usuarioService.actualizarUsuario(usuario)
          .subscribe(()=>{
              this._usuarioService.alert(`El ${texto} ha sido modificado`);
            },error => {
              console.log('error:',error); 
              this._usuarioService.alert(`!No se pudo modificar. Error: ${error}`);
            }
          ); 
      } else {
        this._usuarioService.alert('!No se pudo realizar la petición. El número que ingreso no es válido');
        return;
      }
    }, ()=>{
      return;
    });
  }

  salir(){
    this._usuarioService.logout();
  }
}