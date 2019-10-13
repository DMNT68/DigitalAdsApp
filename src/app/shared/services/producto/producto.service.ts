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

    /**
     * Función que realiza una peticion http, y recibe como respuesta un arreglo de objetos de productos
     */
    public cargarProductos(){
        let url =  URL_SERVICIOS + '/producto';

        return this.http.get<Producto[]>(url)
        .pipe(map((resp:any)=>{
            this.totalProductos = resp.total;
            return resp.productos;
        }));
    }

    /**
     * Funcion que realiza una petición http, mandando como parametro el id del producto que se desea como respuesta.
     * La respuesta de la petición es un objeto de producto. 
     * @param id ID de un producto
     */
    public cargarProducto(id: string) {

        let url = URL_SERVICIOS + '/producto/' + id;
        return this.http.get<Producto>(url)
        .pipe(map((resp:any)=> {
            return resp.producto
        }));
        
    }

} 