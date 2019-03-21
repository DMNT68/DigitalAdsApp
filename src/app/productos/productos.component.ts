import { Component, OnInit } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular/router';
import { registerElement } from 'nativescript-angular/element-registry';

import { PanGestureEventData } from "tns-core-modules/ui/gestures";



import { ProductoService } from '../services/service.index';
import { Producto } from '../models/producto.model';
import { TextField } from "tns-core-modules/ui/text-field";

@Component({
  selector: 'Productos',
  moduleId: module.id,
  providers: [ProductoService],
  templateUrl: `productos.component.html`,
  styleUrls:['productos.component.css']
})
export class ProductosComponent implements OnInit {

  isLoading = false;
  productos: Producto[] = [];
  textoBuscar = '';

  constructor(public _productosService: ProductoService, public routerExtensions:RouterExtensions) { 

  }


  ngOnInit(){

    console.log('Accediste al componente de productos');
    this.getProductos();
    
  }
  
  onProductoTap(productoId){
    
    this.routerExtensions.navigate(["producto/" + productoId, {
      animated: true,
      transition: {
          name: "fade",
          duration: 3000,
          curve: "easeIn"
      }
    }]);
  }

  getProductos() {
    
    this._productosService.cargarProductos()
    .subscribe(productos => {
      this.productos = productos;
    });
  
  }

  public deltaX: number;
  public deltaY: number;
  public state: number;

  onPan(args: PanGestureEventData) {

    console.log("Event name: " + args.eventName);
    console.log("Pan delta: [" + args.deltaX + ", " + args.deltaY + "] state: " + args.state);

    this.deltaX = args.deltaX;
    this.deltaY = args.deltaY;
    this.state = args.state;

    
    if (this.state === 3) {

      setTimeout(() => {
        this.getProductos();
        this.isLoading = false;
      }, 1000);
        
      this.isLoading = true;
    }


  }

  buscarProducto(args) {

    const texto = <TextField>args.object;
    this.textoBuscar = texto.text;
    // console.log("onTextChange");
    // console.log(this.textoBuscar);

}

}