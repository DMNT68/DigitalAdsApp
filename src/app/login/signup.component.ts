import { Component, OnInit} from '@angular/core';
import { FormGroup,FormControl, FormBuilder, Validators } from '@angular/forms';

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
export class SignupComponent implements OnInit {

    registroForm: FormGroup;

  constructor(private page:Page, private router:RouterExtensions, private _usuarioService: UsuarioService) {
    this.page.actionBarHidden = true;
  }

  sonIguales(campo1: string, campo2: string) {

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
      'nombre': new FormControl('', [Validators.required, Validators.minLength(3)]),
      'email': new FormControl('', [Validators.required, Validators.email]),
      'telefono': new FormControl('', Validators.required),
      'password': new FormControl('', Validators.required),
      'password2': new FormControl('', Validators.required),
    }, {validators: this.sonIguales('password','pasword2')});

  }

  signup(){
    
  if(this.registroForm.invalid){
    this.alert("Llene los campos correctamente");
  }

    let usuario = new Usuario(
      this.registroForm.value.nombre,
      this.registroForm.value.email,
      this.registroForm.value.password,
      this.registroForm.value.telefono);

     this._usuarioService.crearUsuario(usuario)
     .subscribe(()=>{
       this.alert("Su cuenta ha sido creada correctamente").then(()=>this.router.navigate(['/login']));
     });

  }
  
  regresarLogin(){
    this.router.navigate(['login']);
  }

  alert(message: string) {
    return alert({
        title: "DIGITAL ADS",
        okButtonText: "OK",
        message: message
    });
  }

}