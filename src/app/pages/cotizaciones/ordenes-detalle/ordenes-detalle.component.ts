import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {  RouterExtensions } from 'nativescript-angular/router';
import { Subscription } from 'rxjs';

import { CarritoService, UtilService, ConectividadService } from '../../../shared/services/service.index';
import { Detalle } from '../../../shared/models/ordenDetalle.model';
import { Orden, OrdenClass } from '../../../shared/models/orden.model';

@Component({
  selector: 'ns-ordenes-detalle',
  templateUrl: './ordenes-detalle.component.html',
  styleUrls: ['./ordenes-detalle.component.css']
})
export class OrdenesDetalleComponent implements OnInit, OnDestroy {

  detalles:Detalle[]=[];
  orden:OrdenClass={}
  isLoading = false;
  detalleSubcription: Subscription;

  constructor( 
    private activRoute : ActivatedRoute,
    private _routerExtensions: RouterExtensions,
    public cs:CarritoService,
    public _util: UtilService,
    private _connect:ConectividadService) { }

  ngOnInit() {

    const id = this.activRoute.snapshot.params.id;
    this.getOrdenDetalle(id); 

  }

  ngOnDestroy(){
    this.detalleSubcription.unsubscribe();
  }

  /**
   * Función que permite obtener objeto el detalle de una orden o pedido segun el id del pedido.
   * @param id ID de la orden o pedido.
   */
  public getOrdenDetalle(id:string){
    this.isLoading = true;
    this.detalleSubcription = this.cs.cargarOrdenDetalle(id).subscribe((resp:Orden)=>{
    setTimeout(() => {
        this.isLoading = false;
      }, 500);
      this.orden = resp.orden;
      this.detalles = resp.detalles;
    },
      error => {
  
        if (this._connect.revisarConexion()){
          return;
        }
        console.log(error);
      } 
       
    );

  }

  /**
   * Función que permite borrar el pedido u orden.
   * @param id ID del pedido u orden.
   */
  public borrarOrden(id:string) {

    if(this._connect.revisarConexion()){
      return;
    }
    
    this._util.confirm('¿Quiere eliminar el pedido?','Eliminar Pedido').then((res)=>{
      if(res){
        this.cs.borrarOrden(id).subscribe(()=>{
          this._util.toast('El pedido se ha eliminado');
          this._routerExtensions.backToPreviousPage();
        });
      }
    });
  }

}
