import { Injectable } from "@angular/core"; 
import { RouterExtensions } from 'nativescript-angular/router';
import { HttpClient,HttpHeaders  } from "@angular/common/http";

import { throwError } from "rxjs";
import { map} from "rxjs/operators";

import {getString, setString, remove} from "application-settings";


import { Usuario } from '../../models/usuario.model';
import { URL_SERVICIOS } from '../../config/config';

@Injectable() 
export class UsuarioService { 

    usuario: Usuario;
    token: string;

    constructor(private router: RouterExtensions , private http:HttpClient) { 
        this.cargaLocalData();
    } 

    estaLogueado() {
        return(this.token.length > 5 ) ? true : false; 
      }

    cargaLocalData() {

        if ( getString('token')) {
          this.token = getString('token');
          this.usuario = JSON.parse( getString('usuario') );
        } else {
          this.token = '';
          this.usuario = null;
        }
    
      }

    guardarLocaData(id: string, token: string, usuario: Usuario){
        
        setString('id',id);
        setString('token',token);
        setString('usuario',JSON.stringify(usuario));
        this.usuario = usuario;
        this.token = token;
    }

    login (usuario: Usuario) {
        let url=URL_SERVICIOS + '/login';
        if(!usuario.email || !usuario.password) {
            this.alert("Por favor ingresa tu datos por favor.");
            return throwError("Por favor tus datos por favor.");
        }
        return this.http.post(url,usuario)
        .pipe(map((resp:any)=>{
            this.guardarLocaData(String(resp._id) , String(resp.token) , resp.usuario);
            console.log('ingreso correctamente');
        }))

    }

    logout() {

        this.usuario = null;
        this.token = '';
    
        remove('usuario');
        remove('token');

        this.alert('Espero que vuelvas. Hasta luego');
        this.router.navigate(['/login']);
    
      }

    crearUsuario(usuario:Usuario){

        let url=URL_SERVICIOS + '/usuario';

        if(!usuario.email || !usuario.password || !usuario.telefono) {
            this.alert("Por favor ingresa tu datos por favor.");
            return throwError("Por favor ingresa tus datos por favor.");
        }

        // let options = this.createRequestOptions();

        return this.http.post(url,usuario);

    }

    // private createRequestOptions() {
    //     let headers = new HttpHeaders({
    //         "Content-Type": "application/x-www-form-urlencoded"
    //     });
    //     return headers;
    // }

    alert(message: string) {
        return alert({
            title: "DIGITAL ADS",
            okButtonText: "OK",
            message: message
        });
      }

} 