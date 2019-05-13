import { Injectable } from "@angular/core"; 

import { isIOS } from "tns-core-modules/platform";
import * as utils from "tns-core-modules/utils/utils";
import * as frame from "tns-core-modules/ui/frame";

@Injectable() 
export class UtilService { 

    months = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];
    days = ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"];

    constructor() { } 

    public fechaFormato(fecha: Date) {
        let formateado = `${this.days[fecha.getDay()]}, ${fecha.getDay()}/${this.months[fecha.getMonth()]}/${fecha.getFullYear()}`;
        return formateado;
    }

    public alert(message: string) {

        return alert({
            title: "DIGITAL ADS",
            okButtonText: "OK",
            message: message
        });
        
    }

    public cerrarTecladoTelefono() {
        if (isIOS) {
          frame.topmost().nativeView.endEditing(true);
          console.log('sigue');
            } else {
          utils.ad.dismissSoftInput();
          console.log('sigue');
    
            }
        }
}
