import { Injectable } from "@angular/core"; 
import { RouterExtensions } from 'nativescript-angular/router';
import { HttpClient,HttpHeaders } from "@angular/common/http";

import { throwError } from "rxjs";
import { map} from "rxjs/operators";

import {getString, setString, remove} from "tns-core-modules/application-settings";

import {UtilService} from "../service.index"

import { Usuario } from '../../models/usuario.model';
import { URL_SERVICIOS } from '../../../config/config';

@Injectable() 
export class UsuarioService { 

  usuario: Usuario;
  token: string;

  processing = false;

  constructor(private router: RouterExtensions , private http:HttpClient) { 
      this.cargaLocalData();
  } 

  estaLogueado() {
    this.cargaLocalData();
      return(this.token.length > 5 ) ? true : false; 
    }

  cargaLocalData() {

      if ( getString('token') ) {
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
      // console.log('guardar',this.token);
  }

  login (usuario: Usuario) {

    this.processing = true;
    
    let url=URL_SERVICIOS + '/login';

    if(!usuario.email || !usuario.password) {
        this.alert("Ingresa tu datos por favor.");
        this.processing=false;
        return throwError("Ingresa tu datos por favor.");
    }

    return this.http.post(url,usuario)
    .pipe(map((resp:any)=>{

        this.guardarLocaData(String(resp._id) , String(resp.token) , resp.usuario);
        setTimeout(() => {
          this.processing=false;
        }, 1000);
        return true;

    }));

  }

  logout() {

      this.usuario = null;
      this.token = '';
  
      remove('usuario');
      remove('token');

      this.router.navigate(['/login'], {clearHistory:true ,transition:{name:'slideRight', duration:300}});
  
    }

  crearUsuario(usuario:Usuario){

      let url=URL_SERVICIOS + '/usuario';

      if(!usuario.email || !usuario.password || !usuario.telefono) {
        this.alert("Por favor ingresa tu datos por favor.");
          return throwError("Por favor ingresa tus datos por favor.");
      }
      
      return this.http.post(url,usuario);

  }

  public alert(message: string) {

    return alert({
        title: "DIGITAL ADS",
        okButtonText: "OK",
        message: message
    });
    
  }

  actualizarUsuario(usuario: Usuario) {

    let url = URL_SERVICIOS + '/usuario/' + usuario._id;
    
    let header = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      'token': this.token
    });
    
    return this.http.put(url, usuario, {headers: header})
    .pipe(map((resp: any) => {
      
      if (usuario._id === this.usuario._id) {
        let usuarioDB: Usuario = resp.usuario;
        this.guardarLocaData(String(usuarioDB._id) , this.token , usuarioDB);
      }
      
      return true;

    }));

  }

} 