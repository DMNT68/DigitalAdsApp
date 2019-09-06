import { Component, OnDestroy, OnInit } from '@angular/core';
import { ListViewEventData } from 'nativescript-ui-listview';
import { View } from 'tns-core-modules/ui/page/page';

import { UtilService, CarritoService, UsuarioService, ConectividadService } from '../../shared/services/service.index';
import { RouterExtensions } from 'nativescript-angular/router';

@Component({
  selector: 'ns-cotizaciones',
  templateUrl: `cotizaciones.component.html`,
  styleUrls: ['cotizaciones.component.css']
})
export class CotizacionesComponent implements OnInit{

    getLista:any;
    cargando:boolean=false;
    cotizaciones: any[]=[];
    iconCotizaciones: string;
    iconIr:string;
    iconRevisado:string;
    iconNoRevisado:string;
    iconRefresh:string;
    isLoading = false;

  

  constructor(private _us: UsuarioService,
              private router:RouterExtensions,
              private _utilService: UtilService, 
              private _cs:CarritoService,
              private _connect:ConectividadService) {
    
  }

  ngOnInit(): void {

    this.iconCotizaciones = this._utilService.iconListNumbered;
    this.iconIr = this._utilService.iconArrowRight;
    this.iconRevisado = this._utilService.iconCheckBox;
    this.iconNoRevisado = this._utilService.iconcheckBoxOutlineBlank;
    this.iconRefresh = this._utilService.iconRefresh;
    this.cargarOrdenes();
    
  }

  obtenerPosicionArreglo(i:number) { 
    this._cs.i=i;
  }
  
  cargarOrdenes() {
    this._cs.cargarOrdenes().subscribe(ordenes=>{
      this.cotizaciones = ordenes;
    }, error => {
      if (this._connect.revisarConexion()){
        return;
      }
      console.log(error);
    });
  }
  
  public onPullToRefreshInitiated(args: ListViewEventData) {
    
    setTimeout(() => {
      this.cargarOrdenes();
      
      const listView = args.object;
      listView.notifyPullToRefreshFinished();
      this.animacion(listView);
    }, 1000);
    this.cargando=true;
  }

  animacion(target: View) {
    let duration = 300;
    target.animate({ opacity: 0, duration: duration })
          .then(() => target.animate({ opacity: 1, duration: duration }))
        .catch((e) => {
            console.log(e.message);
        });
  }

  recargar() {
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
      this.cargarOrdenes();
    }, 500);
  }

}