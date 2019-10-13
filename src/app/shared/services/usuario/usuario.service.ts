import { Injectable } from "@angular/core"; 
import { RouterExtensions } from 'nativescript-angular/router';
import { HttpClient,HttpHeaders } from "@angular/common/http";
import {getString, setString, remove} from "tns-core-modules/application-settings";
import { map} from "rxjs/operators";
import { throwError } from "rxjs";

import { Usuario } from '../../models/usuario.model';
import { URL_SERVICIOS } from '../../../config/config';
import { SubirArchivoService } from '../subirArchivo/subir-archivo.service';


@Injectable() 
export class UsuarioService { 

  usuario: Usuario;
  token: string;
  avatar: string;


  processing = false;

  constructor(private router: RouterExtensions , private http:HttpClient, private _sas:SubirArchivoService) { 
      this.cargaLocalData();
  } 

  /**
   * Función que permite crear un avatar con la primer letra del nombre y apellido.
   * Ejemplo resultado: nombre(Andrés Salgado) avatar(AS)
   */
  public crearAvatar(): string {
    let nombre = this.usuario.nombre;
    let arregloNombre = nombre.split(' ');
    let avatar = arregloNombre.map(letra => letra.charAt(0)).slice(0,2).join('');
    avatar.toUpperCase();
    return avatar;
  }

  /**
   * Función que verifica si un token existe en el almacenamiento local del dispositivo,
   * con lo que permite saber a donde navegar (Login o tabs-nav) cuando la aplicacion se ejecuta.
   * Si retorna "True" navega a tabs-nav, si retorna "False" navega a Login.
   */
  public estaLogueado() {
    this.cargaLocalData();
    return(this.token.length > 5 ) ? true : false; 
  }

  /**
   * Función que permite cargar los datos guardados en el almacenamiento local del dispositvo.
   */
  public cargaLocalData() {

      if ( getString('token') ) {
        this.token = getString('token');
        this.usuario = JSON.parse( getString('usuario') );
      } else {
        this.token = '';
        this.usuario = null;
      }
  
    }

  /**
   * Función que permite guardar los datos del usuario en el almacenamiento del dispositivo.
   * @param id Parametro ID del usuario.
   * @param token Token del usuario que inicia sesión.
   * @param usuario Objeto usuario
   */
  private guardarLocaData(id: string, token: string, usuario: Usuario){
      
      setString('id',id);
      setString('token',token);
      setString('usuario',JSON.stringify(usuario));
      this.usuario = usuario;
      this.token = token;

  }

  /**
   * Función que permite autenticar a un usuario.
   * @param usuario Objeto Usuario
   */
  public login (usuario: Usuario) {

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
        }, 500);
        return true;

    }));

  }

  /**
   * Función que permite cerrar sesión y navegar a Login,
   * borrando o removiendo los datos guardados del almacenamiento del dispositivo.
   */
  public logout() {

    remove('usuario');
    remove('token');
    remove('id');

    this.usuario = null;
    this.token = '';

    this.router.navigate(['/login'], {clearHistory:true ,transition:{name:'slideRight'}});
  
    }


  /**
   * Función que permite crear o registrar un usuario en una bdd.
   * @param usuario Objeto usuario
   */
  public crearUsuario(usuario:Usuario){

      this.processing = true;
      let url=URL_SERVICIOS + '/usuario';

      if(!usuario.email || !usuario.password || !usuario.telefono) {
        this.alert("Por favor ingresa tu datos por favor.");
        this.processing=false;
        return throwError("Por favor ingresa tus datos por favor.");
      }
      
      return this.http.post(url,usuario).pipe(map(()=>{
        setTimeout(() => {
          this.processing=false;
        }, 500);
        return true;
      }));

  }

  /**
   * Función que permite ejecutar una alerta como cuadro de dialogo
   * @param message Mensaje para mostrar el cuadro de dialogo
   * @param title Título para el cuadro de dialogo, paramentro opcional si no manda un valor por defecto es "Digital ADS"
   */
  public alert(message: string, title?:string) {

    return alert({
        title: title || 'DIGITAL ADS',
        okButtonText: "OK",
        message: message
    });
    
  }

  /**
   * Función que permite modificar un registro de un usuario de la bdd.
   * @param usuario Objeto usuario
   */
  public actualizarUsuario(usuario: Usuario) {

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

  /**
   * Función que retorna la respuesta a una petición http
   */
  imagenExistente() {
    let url = `${URL_SERVICIOS}/imagen-existe/usuarios/${this.usuario.img}`;
    return this.http.get(url);
  }

  cambiarImagen(archivo: File , id: string) {

    this._sas.subirArhivo(archivo, 'usuarios', id)
    .then((resp: any) => {
      this.usuario.img = resp.usuario.img;
      this.alert('Imagen Actualizada');
      this.guardarLocaData(id, this.token, this.usuario);
    })
    .catch(resp => {
      this.alert(resp.err.message,'Error al actualizar imagen');
    });
    
  }

} 