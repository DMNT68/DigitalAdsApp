import { Injectable } from '@angular/core';
import { connectionType, getConnectionType, startMonitoring, stopMonitoring }from "tns-core-modules/connectivity";
import * as Toast from 'nativescript-toast';

@Injectable({
  providedIn: 'root'
})
export class ConectividadService {

  private status:boolean = false;

  constructor() { }

  // result is ConnectionType enumeration (none, wifi or mobile)
  
  public conectividadStatus (){
    this.status = false;
    const myConnectionType = getConnectionType();
    
    switch (myConnectionType) {
        case connectionType.none:
            // Denotes no Internet connection.
            this.status = true;
            Toast.makeText("No tienes conexión a internet").show();
            break;
        default:
            break;
    }
    console.log(myConnectionType);
  }

  public revisarConeccion() : boolean {

    this.conectividadStatus();
    if(this.status){
      return true;
    } else {
      return false;
    }

  }
}
