
import { Component } from '@angular/core';
import { Page } from 'tns-core-modules/ui/page/page';
import { UsuarioService } from '../services/service.index';
import { Usuario } from '../models/usuario.model';
import { RouterExtensions } from 'nativescript-angular/router';


@Component({
  selector: 'Login',
  providers: [UsuarioService],
  moduleId: module.id,
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css']
})
export class LoginComponent {

  email: string;
  password: string;

  constructor(private page:Page , private router:RouterExtensions, private _usuarioService:UsuarioService) {
    this.page.actionBarHidden = true;
  }

  ingresar(){
    
    let usuario = new Usuario(null,this.email,this.password);
    this._usuarioService.login(usuario)
    .subscribe(()=> this.router.navigate([''],{ clearHistory: true,transition:{name:'fade',duration:1000,curve:'linear'} }),
      error => {
        alert(error.error.mensaje);
        console.log('error ',error);}
    );
    
  }

  irRegistrar(){
      this.router.navigate(['signup']);
  }
}