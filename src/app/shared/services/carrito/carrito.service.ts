import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RouterExtensions } from 'nativescript-angular/router';
import {getString, setString, remove} from "tns-core-modules/application-settings";
import { map } from 'rxjs/operators';

import { URL_SERVICIOS } from '~/app/config/config';
import { Producto } from '../../models/producto.model';
import { UtilService } from '../util/util.service';
import { UsuarioService } from '../usuario/usuario.service';


@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  items: Producto [] = [];
  cantidades:number []=[];
  alturas:number []=[];
  anchos:number []=[];
  nroLetras:number []=[];
  preciosFinales:number[]=[];
  total_carrito:number = 0;

  pedidos:any[]=[];
  i:number;

  constructor(
    private http: HttpClient, 
    public _us: UsuarioService, 
    public _util: UtilService, 
    private router: RouterExtensions) { 

    this.cargarLocalData();
    this.actualizar_total();

  }

  /**
   * Función que hace un petición http - POST para registrar un pedido del usuario en la bdd
   */
  public realizarPedido() {

    let url = URL_SERVICIOS + '/orden';
    
    let parametros:any={};
    let ids: string [] = [];
    let cantidad: number [] = this.cantidades;
    let altura: number [] = this.alturas;
    let ancho: number [] = this.anchos;
    let nroletras: number [] = this.nroLetras;
    let preciosFinales: number [] = this.preciosFinales;

    for (const item of this.items) {
      ids.push(item._id);
    }
        
    parametros = {
      items: ids.join(','),
      cantidad: cantidad.join(','),
      altura: altura.join(','),
      ancho: ancho.join(','),
      numeroLetras: nroletras.join(','),
      precioFinal: preciosFinales.join(','),
      total: this.total_carrito
    }

    return this.http.post(url,parametros,{headers: this.commonHeaders()})
    .pipe(map((resp:any) => {
      this.items=[];
      this.cantidades=[];
      this.alturas=[];
      this.anchos=[];
      this.nroLetras=[];
      this.preciosFinales=[];
      this.pedidos.push(resp.nuevaOrden);
      this.cargarOrdenes();
      this.actualizar_total();
      this.guardarLocalData();
    }));

  }

  /**
   * Función que realiza una peticion http - GET. 
   * Recibe como respuesta las ordenes o pedidos del usuario que esta en sesión.
   */
  public cargarOrdenes() {

    let url = URL_SERVICIOS + '/ordenesUsuario';
    return this.http.get(url,{headers:this.commonHeaders()})
    .pipe(map((resp:any)=>{
      this.pedidos = resp.ordenes;
      return this.pedidos;
    }));
  }

  /**
   * Función  que realiza una petición http - GET. 
   * Recibe como respuesta un objeto con los productos y variantes que el usuario hizo en la cotización
   * @param id ID de la orden o pedido
   */
  public cargarOrdenDetalle(id:string) {

    let url = URL_SERVICIOS + `/detalles/${id}`;
    return this.http.get(url,{headers:this.commonHeaders()});

  }

  /**
   * Función que realiza una petición http-DELETE, que permite borrar un pedido.
   * @param id ID del pedido o orden
   */
  public borrarOrden(id:string) {

    let url = URL_SERVICIOS + `/orden/${id}`;
    let header = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      'token': this._us.token
    });

    return this.http.delete(url,{headers:header}).pipe(map((resp:any)=>{
      this.pedidos.splice(this.i,1);
      this.cargarOrdenes();
    }));
  }

  
  
  /**
   * Función que permite navegar al componente carrito que tiene la lista de productos cotizados y listo para enviar el pedido.
   */
  public verCarrito() {
    if(this._us.token){
      this.router.navigate(['/carrito'], {transition:{name:'slideTop'}});
    } else {
      this._us.logout();
    }
  }

  /**
   * Función que permite agregar un producto cotizado a la lista de pedidos.
   * @param itemParametro ID del producto.
   * @param cantidadesParametros Cantidad de unidades solicitadas por producto.
   * @param alturaParametro Longitud de altura de producto aplica solo para rótulos.
   * @param anchoParametro Longitud de ancho de producto aplica solo para rótulos.
   * @param nroLetraParametro Número de letras aplica solo para rotulos 3D.
   * @param preciofinalParametro Subtotal del producto.
   */
  public agregarCarrito(itemParametro:Producto, cantidadesParametros:number, alturaParametro:number, anchoParametro:number, nroLetraParametro:number, preciofinalParametro:number) {
  
    for (const item of this.items) {
      if(item._id == itemParametro._id){
        this._util.alert(`El producto "${itemParametro.nombre}" ya se encuentra en el pedido`);
        return;
      }
    }

    this.items.push(itemParametro);
    this.cantidades.push(cantidadesParametros);
    this.alturas.push(alturaParametro);
    this.anchos.push(anchoParametro);
    this.nroLetras.push(nroLetraParametro);
    this.preciosFinales.push(preciofinalParametro);
    this.guardarLocalData();
    this.actualizar_total();

    this._util.alert(`El producto "${itemParametro.nombre}" se ha agregado`).then( () => {
      this._util.toast('Continua cotizando o ve al carrito para realizar el pedido','long');
      this.router.backToPreviousPage();
    });

  }

  /**
   * Función que permite remover un item(producto cotizado) de la lista de pedidos.
   * @param i Posicion del arreglo de pedido
   */
  public removerItems(i:number) {
    this.items.splice(i,1);
    this.cantidades.splice(i,1);
    this.alturas.splice(i,1);
    this.anchos.splice(i,1);
    this.nroLetras.splice(i,1);
    this.preciosFinales.splice(i,1);
    this.actualizar_total();
    this.guardarLocalData();
  }

  /**
   * Función que permite vaciar la lista de pedidos.Vacia las propiedades items, cantidades, alturas, anchos, nroLetras, preciosFinales.
   */
  public vaciarCarrito() {

    this.items = [];
    this.cantidades = [];
    this.alturas = [];
    this.anchos = [];
    this.nroLetras = [];
    this.preciosFinales = [];
    this.actualizar_total();
    this.guardarLocalData();
    this.removed();

  }

  /**
   * Función que hace el calculo de sumar los subtotales
   */
  private actualizar_total(){
    this.total_carrito = 0;
    for (const t of this.preciosFinales) {
      this.total_carrito += t;
    }
  }

  /**
   * Funcion que permite remover o borrar las propiedades del pedido que fueron almacenadas en el dispositivo.
   */
  private removed() {
    remove('items');
    remove('cantidades');
    remove('alturas');
    remove('anchos');
    remove('nroLetras');
    remove('preciosFinales');
  }

  /**
   * Función que permite guardar en el almacenamiento local del dispositivo las propiedes de carrito
   */
  private guardarLocalData() {
    setString('items',JSON.stringify(this.items));
    setString('cantidades',JSON.stringify(this.cantidades));
    setString('alturas',JSON.stringify(this.alturas));
    setString('anchos',JSON.stringify(this.anchos));
    setString('nroLetras',JSON.stringify(this.nroLetras));
    setString('preciosFinales',JSON.stringify(this.preciosFinales));
  }

  /**
   * Función que permite obtener las propidades que fueron guardades en el almacenamiento del dispositivo.
   */
  private cargarLocalData() {

    let promesa = new Promise((resolve, reject)=>{

      if( getString('items') ){
        this.items = JSON.parse(getString('items'));
        this.cantidades = JSON.parse(getString('cantidades'));
        this.alturas = JSON.parse(getString('alturas'));
        this.anchos = JSON.parse(getString('anchos'));
        this.nroLetras = JSON.parse(getString('nroLetras'));
        this.preciosFinales = JSON.parse(getString('preciosFinales'));
      }

      resolve();

    });

    return promesa;

  }

  /**
   * Función que permite crear un nuevo HttpHeader para ser utilizado 
   * en la petición que necesite un header
   */
  private commonHeaders(){
    return new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      'token': this._us.token
    });
  }

}
