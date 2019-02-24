import { Injectable } from "@angular/core"; 
import { HttpClient } from '@angular/common/http';
import { throwError } from "rxjs";
import { map} from "rxjs/operators";
import { URL_SERVICIOS } from '../../config/config';

@Injectable() 
export class ProductoService { 

    totalProductos: number = 0;

    constructor(private http: HttpClient) { } 

    cargarProductos(){
        let url =  URL_SERVICIOS + '/producto';

        return this.http.get(url)
        .pipe(map((resp:any)=>{
            this.totalProductos = resp.total;
            return resp.productos;
        }));
    }

    cargarProducto(id: string){
        let url = URL_SERVICIOS + '/producto/' + id;
        return this.http.get(url)
        .pipe(map((resp:any)=> {
            console.log(resp);
            return resp.producto
        }));
    }

} 