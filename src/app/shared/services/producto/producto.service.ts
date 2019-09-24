import { Injectable } from "@angular/core"; 
import { HttpClient } from '@angular/common/http';
import { map} from "rxjs/operators";

import { URL_SERVICIOS } from '../../../config/config';
import { Producto } from "../../models/producto.model";

@Injectable() 
export class ProductoService { 

    totalProductos: number = 0;
    activarCarrito: boolean = false;

    constructor(private http: HttpClient) { } 

    cargarProductos(){
        let url =  URL_SERVICIOS + '/producto';

        return this.http.get<Producto[]>(url)
        .pipe(map((resp:any)=>{
            this.totalProductos = resp.total;
            return resp.productos;
        }));
    }

    cargarProducto(id: string) {

        let url = URL_SERVICIOS + '/producto/' + id;
        return this.http.get(url)
        .pipe(map((resp:any)=> {
            return resp.producto
        }));
        
    }

    buscarProductos(termino: string) {

        let url = URL_SERVICIOS + '/producto/buscar/' + termino;
        return this.http.get(url).
        pipe(map((resp: any) => resp.productos));
    
    }

} 