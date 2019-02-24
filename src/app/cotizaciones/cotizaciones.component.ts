import { Component } from '@angular/core';
import {HttpClient} from '@angular/common/http'

@Component({
  selector: 'Cotizaciones',
  moduleId: module.id,
  templateUrl: `cotizaciones.component.html`,
  styleUrls: ['cotizaciones.component.css']
})
export class CotizacionesComponent {

    getLista:any;

  constructor(private http: HttpClient) {

  }

  ngOnInit(): void {
    this.http.get('https://rickandmortyapi.com/api/character/')
    .toPromise()
    .then((response)=>{
        this.getLista = (<any>response).results;
    }).catch(err=>console.log(err))
}
}