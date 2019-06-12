import { Component } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { ListViewEventData } from 'nativescript-ui-listview';
import { View } from 'tns-core-modules/ui/page/page';

import { UtilService, CarritoService } from '../../shared/services/service.index';
import { RouterExtensions } from 'nativescript-angular/router';

@Component({
  selector: 'ns-cotizaciones',
  moduleId: module.id,
  templateUrl: `cotizaciones.component.html`,
  styleUrls: ['cotizaciones.component.css']
})
export class CotizacionesComponent {

    getLista:any;
    cargando:boolean=false;
    cotizaciones: any[]=[];
    iconCotizaciones: string;
    iconIr:string;
    iconRevisado:string;
    iconNoRevisado:string;

  constructor(private http: HttpClient, private router:RouterExtensions,private _utilService: UtilService, private _cs:CarritoService) {
    
  }

  ngOnInit(): void {
    this.iconCotizaciones = this._utilService.iconListNumbered;
    this.iconIr = this._utilService.iconArrowRight;
    this.iconRevisado = this._utilService.iconCheckBox;
    this.iconNoRevisado = this._utilService.iconcheckBoxOutlineBlank;
    this.cargarOrdenes();
  }

  irDetalle(id:string) { 

    this.router.navigate([`/detalles/${id}` , {
      transition:{name:'slide',duration:1000}
    }]);
  
  }
  
  cargarOrdenes() {
    this._cs.cargarOrdenes().subscribe(ordenes=>{
      this.cotizaciones = ordenes;
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

}