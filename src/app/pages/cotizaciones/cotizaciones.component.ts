import { Component } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { ObservableArray } from 'tns-core-modules/data/observable-array/observable-array';
import { ListViewEventData } from 'nativescript-ui-listview';
import { View } from 'tns-core-modules/ui/page/page';

@Component({
  selector: 'Cotizaciones',
  moduleId: module.id,
  templateUrl: `cotizaciones.component.html`,
  styleUrls: ['cotizaciones.component.css']
})
export class CotizacionesComponent {

    getLista:any;
    cargando:boolean=false;

  constructor(private http: HttpClient) {

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