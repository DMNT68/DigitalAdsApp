import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { RouterExtensions } from 'nativescript-angular/router';

import {getString, setString, remove} from "tns-core-modules/application-settings";

import { UsuarioService, UtilService } from '../service.index';

import { URL_SERVICIOS } from '~/app/config/config';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  items:any [] = [];
  cantidades:any []=[];
  alturas:number []=[];
  anchos:number []=[];
  nroLetras:number []=[];
  totales:number[]=[];
  total_carrito:number = 0;

  constructor(private http: HttpClient, private _util: UtilService, private _us:UsuarioService, private router: RouterExtensions) { 
    this.cargarLocalData();
    this.actualizar_total();

  }


  verCarrito() {
    if(this._us.token){
      this.router.navigate(['/carrito'], {transition:{name:'slideTop', duration:1000}});
    } else {
      this._us.logout();
    }
  }

  agregarCarrito(itemParametro:any,cantidadesParametros:number,alturaParametro:number,anchoParametro:number,nroLetraParametro:number,totalParametro:number) {
  // agregarCarrito(itemParametro:any) {

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
    this.totales.push(totalParametro);
    this.guardarLocalData();
    this.actualizar_total();
    this._util.alert(`El producto "${itemParametro.nombre}" a sido agregado`);

  }

  realizarPedido() {

    let parametros:any={};
    let url = URL_SERVICIOS + '/orden';
    
    let header = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      'token': this._us.token
    });

    let ids: string []=[];
    let cantidad: number []=this.cantidades;
    let altura: number []=this.alturas;
    let ancho: number []=this.anchos;
    let nroletras: number []=this.nroLetras;

    for (const item of this.items) {
      ids.push(item._id);
    }
        
    parametros = {
      items: ids.join(','),
      cantidad: cantidad.join(','),
      altura: altura.join(','),
      ancho: ancho.join(','),
      numeroLetras: nroletras.join(','),
      total: this.total_carrito
    }

    return this.http.post(url,parametros,{headers: header})
    .pipe(map(()=>{
      this.items=[];
      this.cantidades=[];
      this.alturas=[];
      this.anchos=[];
      this.nroLetras=[];
      this.totales=[];
      this.actualizar_total();
      this.guardarLocalData();
    }));

  }

  removerItems(i:number) {
    this.items.splice(i,1);
    this.cantidades.splice(i,1);
    this.alturas.splice(i,1);
    this.anchos.splice(i,1);
    this.nroLetras.splice(i,1);
    this.totales.splice(i,1);
    this.actualizar_total();
    this.guardarLocalData();
  }

  actualizar_total(){
    this.total_carrito=0;
    for (const t of this.totales) {
      this.total_carrito+=t;
    }
  }

  private guardarLocalData() {
    setString('items',JSON.stringify(this.items));
    setString('cantidades',JSON.stringify(this.cantidades));
    setString('alturas',JSON.stringify(this.alturas));
    setString('anchos',JSON.stringify(this.anchos));
    setString('nroLetras',JSON.stringify(this.nroLetras));
    setString('totales',JSON.stringify(this.totales));
  }

  cargarLocalData() {
    let promesa = new Promise((resolve, reject)=>{
      if( getString('items') ){
        this.items = JSON.parse(getString('items'));
        this.cantidades = JSON.parse(getString('cantidades'));
        this.alturas = JSON.parse(getString('alturas'));
        this.anchos = JSON.parse(getString('anchos'));
        this.nroLetras = JSON.parse(getString('nroLetras'));
        this.totales = JSON.parse(getString('totales'));
      }

      resolve();

    })

    return promesa;
  }
}
