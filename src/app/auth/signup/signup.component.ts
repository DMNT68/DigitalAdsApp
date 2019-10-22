import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl, Validators } from '@angular/forms';
import { RouterExtensions } from 'nativescript-angular/router';
import { Page } from 'tns-core-modules/ui/page/page';
import { alert } from "tns-core-modules/ui/dialogs";

import { UsuarioService, UtilService, ConectividadService } from '../../shared/services/service.index';
import { Usuario } from '../../shared/models/usuario.model';

@Component({
  selector: 'ns-signup',
  templateUrl: `signup.component.html`,
  styleUrls: ['signup.component.css']

})
export class SignupComponent implements OnInit{

    registroForm: FormGroup;
    iconNombre: string;
    iconEmail: string;
    iconTelefono: string;
    iconPassword: string;
    iconPassword2: string;
    iconVisibility: string = '';
    iconVisibilityOff: string = '';

    visibility: boolean = true;

  constructor(private page:Page, private router:RouterExtensions, public _usuarioService: UsuarioService, private _util:UtilService, private _connect:ConectividadService) {
    this.page.actionBarHidden = true;
    this.iconNombre = this._util.iconNombre;
    this.iconEmail = this._util.iconEmail;
    this.iconTelefono = this._util.iconTelefono
    this.iconPassword = this._util.iconPassword2;
    this.iconPassword2 = this._util.iconPassword2Bold;
    this.iconVisibility = this._util.iconVisibility;
    this.iconVisibilityOff = this._util.iconVisibilityOff;
  }

  /**
   * Función que permite validar la contraseña que el usuario ingresa.
   * @param campo1 Primera contraseña.
   * @param campo2 Segunda contraseña que ayuda a verificar si las contraseñas coinciden.
   */
  public sonIguales(campo1: string, campo2: string) {

    return (group: FormGroup) => {

      let pass1 = group.controls['password'].value;
      let pass2 = group.controls['password2'].value;

      if (pass1 === pass2) {
        return null;
      }

      return {sonIguales: true};

    };

  }

  ngOnInit() { 

    this.registroForm = new FormGroup({
      'nombre': new FormControl('', [Validators.required,Validators.minLength(3)]),
      'email': new FormControl('', [Validators.required, Validators.email]),
      'telefono': new FormControl('', [Validators.required, Validators.pattern('[0-9]*'), Validators.minLength(6),Validators.maxLength(10)]),
      'password': new FormControl('', [Validators.required, Validators.minLength(6)]),
      'password2': new FormControl('', Validators.required),
    }, {validators: this.sonIguales('password','pasword2')});

  }

  /**
   * Función que realiza un nuevo registro de un usuario.
   */
  public signup(){

    if(this.registroForm.invalid){
      this.alert("Llene los campos correctamente");
    }
    
    if(this._connect.revisarConexion()){
      return;
    }

    let usuario = new Usuario(
      this.registroForm.value.nombre,
      this.registroForm.value.email,
      this.registroForm.value.password,
      this.registroForm.value.telefono);

     this._usuarioService.crearUsuario(usuario)
     .subscribe(()=>{

      this.alert("Su cuenta ha sido creada correctamente").then(()=>{
         this.router.navigate(['/login'], { clearHistory:true, transition:{name:'slideLeft'}});
      });

     }, error => {
      this._usuarioService.alert(error.error.err.errors.email.message);
      this._usuarioService.processing = false;
      console.log('error:',error.error.err.errors.email.message);
      }
    );

  }
  
  /**
   * Función que permite navegar al componente login.
   */
  public regresarLogin(){
    this.router.navigate(['/login'], { clearHistory:true, transition:{name:'slideLeft'}});
  }

  /**
   * Función que permite ejeuctar un alerta como cuadro de diálogo.
   * @param message Mensaje del cuadro de diálogo.
   */
  public alert(message: string) {

    return alert({
        title: "DIGITAL ADS",
        okButtonText: "OK",
        message: message
    });
    
  }

}