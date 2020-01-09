import { Component, OnDestroy, OnInit } from '@angular/core';
import { ListViewEventData } from 'nativescript-ui-listview';
import { View } from 'tns-core-modules/ui/page/page';
import { Subscription } from 'rxjs';

import { UtilService, CarritoService, ConectividadService } from '../../shared/services/service.index';

@Component({
  selector: 'ns-cotizaciones',
  templateUrl: `cotizaciones.component.html`,
  styleUrls: ['cotizaciones.component.css']
})
export class CotizacionesComponent implements OnInit, OnDestroy {

    getLista:any;
    cargando:boolean=false;
    cotizaciones: any[]=[];
    cotizacionesSubs: Subscription;
    isLoading = false;

  constructor(public _utilService: UtilService, private _cs:CarritoService, private _connect:ConectividadService) {
    
  }

  ngOnInit(): void {

    this.cargarOrdenes();
    
  }

  ngOnDestroy() {
    this.cotizacionesSubs.unsubscribe();
  }

  /**
   * Función que permite obtener la posición del arreglo.
   * @param idx Posición del arreglo.
   */
  obtenerPosicionArreglo(idx:number) { 
    this._cs.index=idx;
  }
  
  /**
   * Función que permite obtener un arreglo con todos los pedidos del usuario.
   */
  public cargarOrdenes() {
    this.cotizacionesSubs = this._cs.cargarOrdenes().subscribe(ordenes=>{
      this.cotizaciones = ordenes;
    }, error => {
      if (this._connect.revisarConexion()){
        return;
      }
      console.log(error);
    });
  }
  

  /**
   * Función que permite realizar actualización de a la página el gesto pull to refresh.
   * @param args evento de tipo ListViewEventData
   */
  public onPullToRefreshInitiated(args: ListViewEventData) {
    
    setTimeout(() => {
      this.cargarOrdenes();
      
      const listView = args.object;
      listView.notifyPullToRefreshFinished();
      this.animacion(listView);
    }, 1000);
    this.cargando=true;
  }

  /**
   * Función que permite realizar una naimación donde renderizar gradualmente los elementos de la vista. 
   * @param target parametro de tipo Viev
   */
  animacion(target: View) {
    let duration = 300;
    target.animate({ opacity: 0, duration: duration })
          .then(() => target.animate({ opacity: 1, duration: duration }))
        .catch((e) => {
            console.log(e.message);
        });
  }

  /**
   * Funcion que permite controlar el componente de interface loading
   */
  recargar() {
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
      this.cargarOrdenes();
    }, 500);
  }

}