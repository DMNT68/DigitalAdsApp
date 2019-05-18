import { Component } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { ObservableArray } from 'tns-core-modules/data/observable-array/observable-array';
import { ListViewEventData } from 'nativescript-ui-listview';
import { View } from 'tns-core-modules/ui/page/page';

import { UtilService } from '../../shared/services/service.index';

@Component({
  selector: 'ns-cotizaciones',
  moduleId: module.id,
  templateUrl: `cotizaciones.component.html`,
  styleUrls: ['cotizaciones.component.css']
})
export class CotizacionesComponent {

    getLista:any;
    cargando:boolean=false;
    cotizaciones: any[];
    code = 0xe93a;
    fecha: Date;

  constructor(private http: HttpClient, private _utilService: UtilService) {
    this.fecha = new Date();
    let formato = this._utilService.fechaFormato(this.fecha);
    this.cotizaciones = [
      {'img': String.fromCharCode(this.code),
       'productos':3,
       'fecha': this.fecha,
       'total': 199.59 
      },
      { 'img': String.fromCharCode(this.code),
       'productos':10,
       'fecha': this.fecha,
       'total': 99.59 
      },
      { 'img': String.fromCharCode(this.code),
       'productos':1,
       'fecha': this.fecha,
       'total': 19.59 
      },
      { 'img': String.fromCharCode(this.code),
       'productos':4,
       'fecha': this.fecha,
       'total': 239.59 
      },
      { 'img': String.fromCharCode(this.code),
       'productos':10,
       'fecha': this.fecha,
       'total': 1459
      },
      { 'img': String.fromCharCode(this.code),
       'productos':3,
       'fecha': this.fecha,
       'total': 199.59 
      },
      { 'img': String.fromCharCode(this.code),
       'productos':6,
       'fecha': this.fecha,
       'total': 199.59 
      },
      { 'img': String.fromCharCode(this.code),
       'productos':3,
       'fecha': this.fecha,
       'total': 1349.59 
      },
      { 'img': String.fromCharCode(this.code),
       'productos':1,
       'fecha': this.fecha,
       'total': 19 
      },
      { 'img': String.fromCharCode(this.code),
       'productos':3,
       'fecha': this.fecha,
       'total': 199.59 
      },
      { 'img': String.fromCharCode(this.code),
       'productos':1,
       'fecha': this.fecha,
       'total': 200.59 
      },
    ]
  }

  ngOnInit(): void {
    this.cargar();
  }

  cargar() {

    this.http.get('https://rickandmortyapi.com/api/character/')
    .toPromise()
    .then((response)=>{
        
        this.getLista = (<any>response).results;
    }).catch(err=>console.log(err))
    
  }
  
  public onPullToRefreshInitiated(args: ListViewEventData) {
    
    setTimeout(() => {
      this.cargar();
      
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