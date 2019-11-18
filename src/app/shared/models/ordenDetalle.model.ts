import { Producto } from './producto.model';
export interface Detalle {
    cantidad?:     number;
    altura?:       number;
    ancho?:        number;
    numeroLetras?: number;
    _id?:          string;
    precioFinal?:  number;
    producto?:     Producto;

}