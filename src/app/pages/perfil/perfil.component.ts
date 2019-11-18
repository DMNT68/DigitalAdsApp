import { Component, OnInit } from '@angular/core';

import {prompt, inputType } from "tns-core-modules/ui/dialogs";
import { ios } from 'tns-core-modules/application/application';
import * as imagepicker from "nativescript-imagepicker";

import { UsuarioService, UtilService, CarritoService } from '../../shared/services/service.index';
import { Usuario } from '../../shared/models/usuario.model';


@Component({
  selector: 'ns-perfil',
  templateUrl: `perfil.component.html`,
  styleUrls:['perfil.component.css']
})
export class PerfilComponent implements OnInit{
  
  usuario: Usuario;
  img:any;
  editar= false;
	iconNombre: string;
  iconEmail: string;
  iconTelefono: string;
  iconEditar:string;
  imagenSrc: any;
  imagenActiva: boolean = false;
  avatar: string;  

  constructor(public _usuarioService: UsuarioService, private _util: UtilService, private _cs: CarritoService) {

  }

  ngOnInit(): void {
    this._usuarioService.cargaLocalData();
    this.usuario = this._usuarioService.usuario;
    this._usuarioService.imagenExistente().subscribe((resp:any)=>{
      this.imagenActiva = resp.ok;
    });
    this.avatar = this._usuarioService.crearAvatar();
    // Iconos
    this.iconNombre = this._util.iconNombre;
    this.iconEmail = this._util.iconEmail ;
    this.iconTelefono = this._util.iconTelefono;
    this.iconEditar = this._util.iconModeEdit;
    
  }

  /**
   * Función que permite modificar el nombre, correo electrónic o telefono del perfil del usuario.
   * @param texto Permite identificar que propiedad del usuario desea modificar('Nombre'/'Correo Electrónico/telefono').
   * @param usuario Objeto usuario que desea modificar.
   */
  modificar(texto:string, usuario:Usuario) {

    if (texto==='Nombre') {
      
      this.editarNombre(texto,usuario);

    } else if (texto === 'Correo Electrónico') {

      this.editarEmail(texto,usuario);    

    } else {
      
      this.editarTelefono(texto, usuario)

    }
  }

  /**
   * Función que permite modificar el nombre del usuario.
   * @param texto Mensaje o propiedad que se desea mostrar en el cuadro de diálogo.
   * @param usuario Objeto usuario. Propiedad email a modificar
   */
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

  /**
   * Función que permite modificar el email del usuario.
   * @param texto Mensaje o propiedad que se desea mostrar en el cuadro de diálogo.
   * @param usuario Objeto usuario. Propiedad email a modificar
   */
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

  /**
   * Función que permite modificar el teléfono del usuario.
   * @param texto Mensaje o propiedad que se desea mostrar en el cuadro de diálogo.
   * @param usuario Objeto usuario. Propiedad teléfono a modificar
   */
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
      } else return;
    }, ()=>{
      return;
    });
  }

  /**
   * Función que hace uso del plugin ImagePicker, que permite seleccionar una imagen del carrete del dispositivo.
   */
  public onSelectSingleTap() {
    let context = imagepicker.create({
        mode: "single",
        mediaType: 1
    });
    this.startSelection(context);
  }

  /**
   * Función que permite cambiar la imagen del usuario.
   */
  private startSelection(context) {
    
    context
    .authorize()
    .then(() => context.present())
    .then((selection) => {
      this.imagenSrc = selection.length > 0 ? selection[0] : null;
      
        selection.forEach((selected) => {

          if (ios) {
	          this.imagenActiva= true;
            // this.imagenSrc = selected.ios;
          console.log('selected ios:', selected);

          } else {
            this.imagenActiva= true;
            this.imagenSrc = selected.android.toString();
            console.log('selected Android:', selected);

          }

      });
      
    }).catch(function (e) {
        console.log(e);
    });
  }

  /**
   * Función que permite cerrar la sesión del usuario.
   */
  public salir() {
    this._util.confirm('¿Desea salir de su cuenta?').then(( res ) => {
      
      if (res){
        this._cs.vaciarCarrito();
        this._usuarioService.logout();
      }
    
    });
  
  }

  goToAbout(){
    this._util.goToAbout();
  }

}