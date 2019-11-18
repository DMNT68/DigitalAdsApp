import { Injectable } from "@angular/core"; 
import { HttpClient } from '@angular/common/http';
import { RouterExtensions } from 'nativescript-angular/router';
import { Toasty, ToastDuration } from 'nativescript-toasty';
import { available, availableSync  } from "nativescript-appavailability";
import { isIOS } from "tns-core-modules/platform";
import * as utils from "tns-core-modules/utils/utils";
import * as frame from "tns-core-modules/ui/frame";
import { alert, confirm} from "tns-core-modules/ui/dialogs";
import { openUrl } from "tns-core-modules/utils/utils";
import { URL_SERVICIOS } from '../../../config/config';
import { map } from 'rxjs/operators';
import { Information } from '../../models/information.model';


@Injectable() 
export class UtilService { 

    //icon fonts IcoMoon-Free
    iconEmail: string;
    iconPassword: string;
    iconPassword2: string;
    iconPassword2Bold: string;
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
    iconVisibility: string;
    iconVisibilityOff: string;
    iconFacebook: string;


    constructor(private router:RouterExtensions, private http: HttpClient) {
        this.iconEmail = String.fromCharCode(0xe0e1);
        this.iconPassword = String.fromCharCode(0xe0da);
        this.iconPassword2 = String.fromCharCode(0xe899);
        this.iconPassword2Bold = String.fromCharCode(0xe897);
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
        this.iconVisibility = String.fromCharCode(0xe8f4);
        this.iconVisibilityOff = String.fromCharCode(0xe8f5);
        this.iconFacebook = String.fromCharCode(0xe902);
    } 

    /**
     * Función que permite ejecutar una alerta como cuadro de diálogo.
     * @param message Mensaje para mostrar el cuadro de diálogo
     * @param title Título para el cuadro de dialogo, paramentro opcional si no manda un valor por defecto es "Digital ADS"
     */
    public alert(message: string, title?:string): Promise<void> {

        return alert({
            title: title || 'DIGITAL ADS',
            okButtonText: "OK",
            message: message
        });
        
    }

    /**
     * Función que permite ejecutar una alerta como cuadro de diálogo.
     * @param message Mensaje para mostrar el cuadro de diálogo
     * @param title Título para el cuadro de dialogo, paramentro opcional si no manda un valor por defecto es "Digital ADS"
     * @param ok Establecer el texto para okButtonText. Por defecto sera "OK"
     */
    public confirm(message: string, title?:string,ok?:string): Promise<boolean> {
        return confirm({
            title: title || 'DIGITAL ADS',
            message: message,
            okButtonText: "OK",
            cancelButtonText: "Cancelar"
        });
    }

    /**
     * Función que cierra el teclado.
     */
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
     * 
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

    /**
     * Abre el navegador o la aplicación de la red social correspondiente
     * @param msg Mensaje de confirmación
     * @param provider Red social Ej: 'fb://'
     * @param url Enlace de la red social
     * @param userId Usuario de la red social a cual va a puntar
     */
    public openLink(msg:string,provider:string,url:string,userId:string) {
        this.confirm(msg,'','IR').then((res)=>{

            if(res){

                if (availableSync(provider)) {
                    openUrl(provider + (isIOS ? "/user?screen_name=" : "user?user_id=") + userId);
                    this.router.backToPreviousPage();
                } else {
                    openUrl(url);
                    this.router.backToPreviousPage();

                }

             }


        });
    }

    /**
     * Función que permitir dirigir a la pantalla de about
     */
    public goToAbout() {
        this.router.navigate(['/about'], {transition:{name:'slide'}});
    }

    /**
     * Función que permite traer la información de la base de datos mediate
     * el procotolo http
     */
    public getInformation(){
        let url = URL_SERVICIOS + '/info';
        return this.http.get(url).pipe(map((res:Information)=>{
            return res.info;
        }));
    }



}
