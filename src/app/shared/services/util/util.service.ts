import { Injectable } from "@angular/core"; 

@Injectable() 
export class UtilService { 

    months = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];
    days = ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"];

    constructor() { } 

    public fechaFormato(fecha: Date) {
        let formateado = `${this.days[fecha.getDay()]}/${this.months[fecha.getMonth()]}/${fecha.getFullYear()}`;
        return formateado;
    }

    public alert(message: string) {

        return alert({
            title: "DIGITAL ADS",
            okButtonText: "OK",
            message: message
        });
        
    }
}
