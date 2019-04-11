import { Component } from '@angular/core';

import { GestureEventData } from "tns-core-modules/ui/gestures";
import {GridLayout} from "tns-core-modules/ui/layouts/grid-layout";
import { alert, confirm, prompt, login, action, inputType } from "tns-core-modules/ui/dialogs";



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

  onLongPress (event:GestureEventData){
    console.log(event.object);
    console.log(event.view);
    console.log(event.eventName);
    this.prompt();
    
}

prompt() {
  prompt({
      title: "Editar",
      message: "Your message",
      okButtonText: "Your button text",
      cancelButtonText: "Cancel text",
      neutralButtonText: "Neutral text",
      defaultText: "Default text",
      inputType: inputType.text
  }).then((result) => {
      // The result property is true if the dialog is closed with the OK button, false if closed with the Cancel button or undefined if closed with a neutral button.
      console.log("Dialog result: " + result.result);
      console.log("Text: " + result.text);
  })
}

  salir(){
    this._usuarioService.logout();
  }
}