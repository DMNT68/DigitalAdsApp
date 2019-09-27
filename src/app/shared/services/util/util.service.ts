import { Injectable } from "@angular/core"; 
import { isIOS } from "tns-core-modules/platform";
import * as utils from "tns-core-modules/utils/utils";
import * as frame from "tns-core-modules/ui/frame";
import { alert, confirm} from "tns-core-modules/ui/dialogs";
import { Toasty, ToastDuration } from 'nativescript-toasty';

@Injectable() 
export class UtilService { 

    months = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];
    days = ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"];

    //icon fonts IcoMoon-Free
    iconEmail: string;
    iconPassword: string;
    iconTelefono: string;
    iconNombre: string;
    iconCarritoAdd: string;
    iconAccountCircle: string;
    iconAccountBox: string;
    iconAdd: string;
    iconArrowDropUp: string;
    iconCheckBox: string;
    iconcheckBoxOutlineBlank: string;
    iconClose: string;
    iconModeEdit: string;
    iconDelete: string;
    iconListNumbered: string;
    iconHome: string;
    iconArrowRight: string;
    iconBack: string;
    iconCart: string;
    iconRefresh: string;
    iconRemove: string;
    iconReport: string;
    iconSearch: string;
    iconTop: string;


    constructor() {
        this.iconEmail = String.fromCharCode(0xe0e1);
        this.iconPassword = String.fromCharCode(0xe0da);
        this.iconTelefono = String.fromCharCode(0xe0cd);
        this.iconNombre = String.fromCharCode(0xe7fd);
        this.iconCarritoAdd = String.fromCharCode(0xe854);
        this.iconAccountCircle = String.fromCharCode(0xe853);
        this.iconAccountBox = String.fromCharCode(0xe851);
        this.iconAdd = String.fromCharCode(0xe145);
        this.iconArrowDropUp = String.fromCharCode(0xe5c7);
        this.iconCheckBox = String.fromCharCode(0xe834);
        this.iconcheckBoxOutlineBlank = String.fromCharCode(0xe835);
        this.iconClose = String.fromCharCode(0xe5cd);
        this.iconModeEdit = String.fromCharCode(0xe254);
        this.iconDelete = String.fromCharCode(0xe872);
        this.iconListNumbered = String.fromCharCode(0xe242);
        this.iconHome = String.fromCharCode(0xe88a);
        this.iconArrowRight = String.fromCharCode(0xe315);
        this.iconBack = String.fromCharCode(0xe317);
        this.iconCart = String.fromCharCode(0xe8cc);
        this.iconRefresh = String.fromCharCode(0xe5d5);
        this.iconRemove = String.fromCharCode(0xe15b);
        this.iconReport = String.fromCharCode(0xe160);
        this.iconSearch = String.fromCharCode(0xe8b6);
        this.iconTop = String.fromCharCode(0xe25a);
        
    } 

    public fechaFormato(fecha: Date) {
        let formateado = `${this.days[fecha.getDay()]}, ${fecha.getDay()}/${this.months[fecha.getMonth()]}/${fecha.getFullYear()}`;
        return formateado;
    }

    public alert(message: string, title?:string): Promise<void> {

        return alert({
            title: title || 'DIGITAL ADS',
            okButtonText: "OK",
            message: message
        });
        
    }

    public confirm(message: string, title?:string): Promise<boolean> {
        return confirm({
            title: title || 'DIGITAL ADS',
            message: message,
            okButtonText: "ok",
            cancelButtonText: "Cancelar"
        });
    }

    public cerrarTecladoTelefono() {
        if (isIOS) {
          frame.topmost().nativeView.endEditing(true);
        } else {
          utils.ad.dismissSoftInput();    
        }
    }

    /**
     * Método para mostrar una notificación de una acción.
     * Uso del plugin Toasty
     * @param texto Mensaje que va mostrar la notifiación
     * @param duracion Duración del mensaje puede ser 'short'(por defecto) o 'long'
     */
    public toast(texto: string, duracion:string = 'short') {

        const toast = new Toasty({ text: texto });
        
        if (duracion === 'long'){
            toast.duration = ToastDuration.LONG;
        }else if (duracion === 'short') {
            toast.duration = ToastDuration.SHORT;
        }

        toast.show();

    }
}
