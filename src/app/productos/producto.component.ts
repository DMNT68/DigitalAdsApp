import { Component } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

import { Producto } from '../models/producto.model';
import { ProductoService } from '../services/service.index';
import { RouterExtensions } from 'nativescript-angular/router';

@Component({
  selector: 'Producto',
  moduleId: module.id,
  providers:[ProductoService],
  templateUrl: `producto.component.html`,
  styleUrls:['productos.component.css']

})
export class ProductoComponent {

  producto:Producto;
  precioFinal:number;
  cantidad:number=1;
  nombre:string;

  constructor(private _productoService: ProductoService, private activRoute: ActivatedRoute,
    private _routerExtensions: RouterExtensions) {

    activRoute.params.subscribe(
      params => {
        let id = params['id'];
        this.getProducto(id);
      }
      
    );
  }

  getProducto(id: string) {
    this._productoService.cargarProducto(id)
    .subscribe(producto =>{ 
      this.producto = producto;
      this.precioFinal = +producto.precioUni;
      this.nombre = producto.categoria.descripcion;
    });
  }

  variarPrecio(cantidad:number){

    if(this.precioFinal < +this.producto.precioUni && cantidad < 0){
      this.precioFinal = +this.producto.precioUni;
      this.cantidad=1;
      return;
    }

    this.cantidad += cantidad; 
    this.precioFinal = +this.producto.precioUni * this.cantidad;
    console.log(this.precioFinal);

  }

  onBackButtonTap(): void {
    this._routerExtensions.backToPreviousPage();
}

}