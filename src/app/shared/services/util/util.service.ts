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
    public iconEmail: string = String.fromCharCode(0xe0e1);
    public iconPassword: string = String.fromCharCode(0xe0da);
    public iconPassword2: string = String.fromCharCode(0xe899);
    public iconPassword2Bold: string = String.fromCharCode(0xe897);
    public iconPhone: string = String.fromCharCode(0xe0cd);
    public iconName: string = String.fromCharCode(0xe7fd);
    public iconCartAdd: string = String.fromCharCode(0xe854);
    public iconAccountCircle: string = String.fromCharCode(0xe853);
    public iconAccountBox: string = String.fromCharCode(0xe851);
    public iconAdd: string = String.fromCharCode(0xe145);
    public iconArrowDropUp: string = String.fromCharCode(0xe5c7);
    public iconCheckBox: string = String.fromCharCode(0xe834);
    public iconcheckBoxOutlineBlank: string = String.fromCharCode(0xe835);
    public iconClose: string = String.fromCharCode(0xe5cd);
    public iconModeEdit: string = String.fromCharCode(0xe254);
    public iconDelete: string = String.fromCharCode(0xe872);
    public iconListNumbered: string = String.fromCharCode(0xe242);
    public iconHome: string = String.fromCharCode(0xe88a);
    public iconArrowRight: string = String.fromCharCode(0xe315);
    public iconBack: string = String.fromCharCode(0xe317);
    public iconCart: string = String.fromCharCode(0xe8cc);
    public iconRefresh: string = String.fromCharCode(0xe5d5);
    public iconRemove: string = String.fromCharCode(0xe15b);
    public iconReport: string = String.fromCharCode(0xe160);
    public iconSearch: string = String.fromCharCode(0xe8b6);
    public iconTop: string = String.fromCharCode(0xe25a);
    public iconVisibility: string = String.fromCharCode(0xe8f4);
    public iconVisibilityOff: string = String.fromCharCode(0xe8f5);
    public iconFacebook: string = String.fromCharCode(0xe902);
    public icontWtsapp: string= String.fromCharCode(0xe908);
    public iconInstagram: string= String.fromCharCode(0xe906);
    public iconLocation: string= String.fromCharCode(0xe947);
    public iconGmail: string= String.fromCharCode(0xe90c);
    public iconInfo: string= String.fromCharCode(0xe88f);
    public iconArrowLeft: string= String.fromCharCode(0xe5c4);

    constructor(private router:RouterExtensions, private http: HttpClient) {
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
        this.router.navigate(['/pages/about'], {transition:{name:'slide'}});
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
