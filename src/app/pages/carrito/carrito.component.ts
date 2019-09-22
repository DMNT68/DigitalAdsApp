import { Component, OnInit } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular/router';
import { CarritoService, UtilService, ConectividadService } from '~/app/shared/services/service.index';

import {ListViewItemAnimation} from "nativescript-ui-listview";

@Component({
  selector: 'ns-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {

  iconClose:string;
  iconCarrito: String;
  iconBorrar: String;

  ordenes:any []=[];

  private _itemDeleteAnimation: ListViewItemAnimation;

  constructor(private router: RouterExtensions, private _util: UtilService, public _cs: CarritoService, private _connect:ConectividadService) { }

  ngOnInit() {

    this.iconClose = this._util.iconClose;
    this.iconCarrito = this._util.iconCart;
    this.iconBorrar = this._util.iconDelete;

    this.ordenes = this._cs.items;

  }

  enviarPedido() {

    if(this._connect.revisarConexion()){
      return;
    }
    

    this._util.confirm('¿Desea enviar el pedido para ser revisado?','Enviar Pedido')
    .then((result)=>{
      if(result){

        this._cs.realizarPedido().subscribe(
          ()=>{
          this._util.alert('Revisaremos tu pedido y nos pondremos en contacto contigo muy pronto.','Enviado Exitosamente')
          .then(() => this.back());
          },
           error => {
             console.log('error:::', error);
            this._util.alert(error.message,'Error al enviar pedido');
          }
        );

      }
    })
  }

  borrarItem(i:number){
    this._util.confirm('¿Deseas quitar el producto de la lista?').then((result)=>{
      if(result){
        this._cs.removerItems(i);
      }
    });
  }

  back(){
    this.router.backToPreviousPage();
  }

}
