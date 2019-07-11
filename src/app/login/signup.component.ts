import { Component, OnInit} from '@angular/core';
import { FormGroup,FormControl, FormBuilder, Validators } from '@angular/forms';

import { Page } from 'tns-core-modules/ui/page/page';

import { alert, prompt } from "tns-core-modules/ui/dialogs";
import { UsuarioService, UtilService } from '../shared/services/service.index';
import { Usuario } from '../shared/models/usuario.model';
import { RouterExtensions } from 'nativescript-angular/router';

@Component({
  selector: 'ns-signup',
  providers: [UsuarioService],
  moduleId: module.id,
  templateUrl: `signup.component.html`,
  styleUrls: ['signup.component.css']

})
export class SignupComponent implements OnInit {

    registroForm: FormGroup;
    iconNombre: string;
    iconEmail: string;
    iconTelefono: string;
    iconPassword: string;
   

  constructor(private page:Page, private router:RouterExtensions, private _usuarioService: UsuarioService, private _util:UtilService) {
    this.page.actionBarHidden = true;
    this.iconNombre = this._util.iconNombre;
    this.iconEmail = this._util.iconEmail;
    this.iconTelefono = this._util.iconTelefono
    this.iconPassword = this._util.iconPassword;
  }

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
      'email': new FormControl('', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]),
      'telefono': new FormControl('', [Validators.required, Validators.pattern('[0-9]*'), Validators.minLength(6),Validators.maxLength(10)]),
      'password': new FormControl('', [Validators.required, Validators.minLength(6)]),
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

      this.alert("Su cuenta ha sido creada correctamente")
       .then(()=>{

         this.router.navigate(['/login'], { clearHistory:true, transition:{
             name:'slideLeft', 
             duration:300, 
             curve:'linear'
            }
        });

      });

     }, error => {
      this._usuarioService.alert(error.error.err.errors.email.message);
      console.log('error:',error.error.err.errors.email.message);
      }
    );

  }
  
  regresarLogin(){
    this.router.navigate(['/login'], { clearHistory:true, transition:{
        name:'slideLeft',
        duration:300, 
        curve:'linear'
      }
    });
  }

  alert(message: string) {

    return alert({
        title: "DIGITAL ADS",
        okButtonText: "OK",
        message: message
    });
    
  }

}