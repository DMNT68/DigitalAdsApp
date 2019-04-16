import { Component } from '@angular/core';
import { ActivatedRoute } from "@angular/router";


import { Producto } from '../../../shared/models/producto.model';
import { ProductoService } from '../../../shared/services/service.index';
import { RouterExtensions } from 'nativescript-angular/router';

@Component({
  selector: 'Producto',
  moduleId: module.id,
  providers:[ProductoService],
  templateUrl: `producto.component.html`,
  styleUrls:['../productos.component.css']

})
export class ProductoComponent {

  producto: Producto;
  precioFinal: number;
  cantidad: number = 1;
  nletras: number;
  alto: number;
  ancho: number;

  categoria: string;
  img: string;
  nombre: string;
  descripcion: string;

  rotulos3D: boolean = false;
  rotulos: boolean = false;

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
      this.img = producto.img;
      this.nombre=producto.nombre;
      this.categoria = producto.categoria.descripcion;
      this.descripcion = producto.descripcion;
      this.precioFinal = +producto.precioUni;
      
      if (this.categoria === 'Rótulos 3D') {
        this.rotulos3D = true;
      }
      if (this.categoria === 'Rótulos') {
        this.rotulos = true;
      }

      console.log('categoria', this.categoria);
      
    });
  }

  variarPrecio(cantidad?: number){

    if(this.precioFinal < +this.producto.precioUni && cantidad < 0){
      this.precioFinal = +this.producto.precioUni;
      this.cantidad = 1;
      this.alto = 1;
      this.nletras = 1;
      this.alert("La cantidad debe ser igual o mayor a 1");
      return;
    }

    this.cantidad += cantidad; 
    this.precioFinal = +this.producto.precioUni * this.cantidad;
    // console.log(this.precioFinal);

  }

  variarPrecioRotulo3D() {

    if(!this.alto || !this.ancho || !this.nletras){
      this.alert("Ingresa los valores por favor");
      return;
    }

    if(this.precioFinal < +this.producto.precioUni && this.alto, this.nletras, this.ancho < 0){
      this.precioFinal = +this.producto.precioUni;
      this.cantidad = 1;
      this.alto = 1;
      this.nletras = 1;
      this.alert("Ingresa los valor igual o mayor a 1");
      return;
    }

    let base: number = this.alto * this.ancho; 
    this.precioFinal = (+this.producto.precioUni * base) + (this.nletras*25);
    // console.log(this.precioFinal);
  }

  variarPrecioRotulo() {

    if(!this.alto || !this.ancho){
     this.alert("Ingresa los valores por favor");
      return;
    }

    if(this.precioFinal < +this.producto.precioUni && this.alto, this.ancho < 0){
      this.precioFinal = +this.producto.precioUni;
      this.cantidad = 1;
      this.alto = 1;
      this.alert("Ingresa los valor igual o mayor a 1");
      return;
    }

    let base: number = this.alto * this.ancho; 
    this.precioFinal = +this.producto.precioUni * base;
    // console.log(this.precioFinal);
  }

  onBackButtonTap(): void {
    this._routerExtensions.back();
    this.rotulos3D=false;
    this.rotulos=false;
  }


  alert(message: string) {
    return alert({
        title: "DIGITAL ADS",
        okButtonText: "OK",
        message: message
    });
  }
}