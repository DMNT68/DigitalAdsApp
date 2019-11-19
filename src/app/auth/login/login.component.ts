import { Component } from '@angular/core';
import { Page } from 'tns-core-modules/ui/page/page';
import { RouterExtensions } from 'nativescript-angular/router';

import { UsuarioService, UtilService, ConectividadService} from '../../shared/services/service.index';
import { Usuario } from '../../shared/models/usuario.model';

@Component({
  selector: 'ns-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css']
})
export class LoginComponent {

  public email: string;
  public password: string;
  public visibility: boolean = true;

  constructor(private page:Page , private router:RouterExtensions, public _usuarioService:UsuarioService, public _util:UtilService, private _connect:ConectividadService) {
    this.page.actionBarHidden = true;
  }

  /**
   * Función que permite autenticar un usuario.
   */
  public ingresar(){

    if (this._connect.revisarConexion()){
      return;
    }
    
    let usuario = new Usuario(null,this.email,this.password);
    this._usuarioService.login(usuario)
    .subscribe(() => {
      this.router.navigate(['/'],{ clearHistory: true,transition:{name:'slide'} })
    },
      error => {
        this._usuarioService.alert(error.error.error.message);
        this._usuarioService.processing = false;
      }
    );
    
  }

  /**
   * Función que permite navegar al componente signup.
   */
  irRegistrar(){
    this.router.navigate(['login/signup'], {transition:{name:'slideRight'}});
  }

  
}