import { Component, OnInit } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular/router';
import { registerElement } from 'nativescript-angular/element-registry';


import { ProductoService } from '../services/service.index';
import { Producto } from '../models/producto.model';
import { CardView } from 'nativescript-cardview';
registerElement('CardView', () => CardView);

@Component({
  selector: 'Productos',
  moduleId: module.id,
  providers: [ProductoService],
  templateUrl: `productos.component.html`,
  styleUrls:['productos.component.css']
})
export class ProductosComponent implements OnInit {

  data = [];

  productos: Producto[] = [];


  constructor(public _productosService: ProductoService, public routerExtensions:RouterExtensions) {
    this.getProductos();
  }


  ngOnInit(): void{
    
  }
  
  onProductoTap(productoId){
    console.log('tapppp...');
    this.routerExtensions.navigate(["producto/" + productoId, {
      animated: true,
      transition: {
          name: "slideBottom",
          duration: 3000,
          curve: "easeIn"
      }
    }]);
  }

  getProductos() {
    
    this._productosService.cargarProductos()
    .subscribe(productos => this.productos = productos);
  
  }

  

}