import { Injectable } from '@angular/core';
import { connectionType, getConnectionType}from "tns-core-modules/connectivity";

import { UtilService } from '../util/util.service';

@Injectable({
  providedIn: 'root'
})
export class ConectividadService {

  private status:boolean = false;

  constructor(private _util:UtilService) { }

  // result is ConnectionType enumeration (none, wifi or mobile)
  
  /**
   * Función que permite verificar la conectividad del dispositivo en este caso la de tener internet.
   */
  public conectividadStatus (){
    this.status = false;
    const myConnectionType = getConnectionType();
    
    switch (myConnectionType) {
        case connectionType.none:
            // Denotes no Internet connection.
            this.status = true;
            this._util.toast('No tiene conexión a internet');
            break;
        default:
            break;
    }
  }

  /**
   * Función que permite verificar el estado de la conectividad. Retorna un boolean 
   */
  public revisarConexion(): boolean {

    this.conectividadStatus();
    
    if(this.status){
      return true;
    } else {
      return false;
    }

  }
}
