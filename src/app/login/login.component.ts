
import { Component } from '@angular/core';
import { Page } from 'tns-core-modules/ui/page/page';
import { UsuarioService, UtilService} from '../shared/services/service.index';
import { Usuario } from '../shared/models/usuario.model';
import { RouterExtensions } from 'nativescript-angular/router';


@Component({
  selector: 'ns-login',
  providers: [UsuarioService],
  moduleId: module.id,
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css']
})
export class LoginComponent {

  email: string;
  password: string;
  iconEmail: string= '';
  iconPassword: string = '';

  constructor(private page:Page , private router:RouterExtensions, public _usuarioService:UsuarioService, private _util:UtilService) {
    this.page.actionBarHidden = true;
    this.iconEmail = this._util.iconEmail;
    this.iconPassword = this._util.iconPassword;
    
  }

  ingresar(){
    
    let usuario = new Usuario(null,this.email,this.password);
    this._usuarioService.login(usuario)
    .subscribe(() => this.router.navigate(['/'],{ clearHistory: true,transition:{name:'slide',duration:300,curve:'linear'} }),
      error => {
        this._usuarioService.alert(error.error.error.message);
        this._usuarioService.processing = false;
      }
    );
    
  }

  irRegistrar(){

    this.router.navigate(['/signup'], {
      transition:{
        name:'slideRight', 
        duration:300, 
        curve:'linear'
      }
    });

  }

  
}