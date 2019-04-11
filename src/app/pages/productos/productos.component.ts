import { Component, OnInit } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular/router';
import { ListViewEventData } from 'nativescript-ui-listview';

import { View } from 'tns-core-modules/ui/page/page';


import { Producto } from '../../shared/models/producto.model';
import { TextField } from "tns-core-modules/ui/text-field";
import { ProductoService } from '../../shared/services/service.index';

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

  buscarProducto(args) {

    const texto = <TextField>args.object;
    this.textoBuscar = texto.text;

  }

  public onPullToRefreshInitiated(args: ListViewEventData) {
    
    setTimeout(() => {
      this.getProductos();
      
      const listView = args.object;
      listView.notifyPullToRefreshFinished();
      this.animacion(listView);
    }, 1000);

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