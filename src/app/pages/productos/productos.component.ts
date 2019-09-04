import { Component, OnInit, ViewChild } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular/router';
import { ListViewEventData } from 'nativescript-ui-listview';

import { View } from 'tns-core-modules/ui/page/page';

import { Producto } from '../../shared/models/producto.model';

import { TextField } from "tns-core-modules/ui/text-field";

import { ProductoService, UtilService, CarritoService, ConectividadService } from '../../shared/services/service.index';
import { RadListViewComponent } from 'nativescript-ui-listview/angular';



@Component({
  selector: 'ns-productos',
  moduleId: module.id,
  providers: [ProductoService],
  templateUrl: `productos.component.html`,
  styleUrls:['productos.component.css']
})
export class ProductosComponent implements OnInit {

  isLoading = false;
  productos: Producto[] = [];
  textoBuscar = '';
  aparecer = false;
  iconSearch: String;
  iconClose: String;
  iconUp: String;
  iconCarrito: String;
  iconProductos: String;
  
  constructor(public _utilService: UtilService, 
      public _productosService: ProductoService, 
      public routerExtensions:RouterExtensions,
      public cs: CarritoService,
      private _connect:ConectividadService) { 
    
  }
  

  ngOnInit(): void {

    this.iconSearch = this._utilService.iconSearch;
    this.iconClose = this._utilService.iconClose;
    this.iconUp = this._utilService.iconTop;
    this.iconCarrito = this._utilService.iconCart;
    this.iconProductos = this._utilService.iconHome;
    
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
      this.getProductos();
    }, 1000);
    
  }


  @ViewChild('myRadListView', { static:false }) listViewComponent: RadListViewComponent;
  
  public onTapUp() {
    this.listViewComponent.listView.scrollToIndex(0, true);
  }

  getProductos() {
    
    this._productosService.cargarProductos()
    .subscribe(productos => {
      this.productos = productos;
    },error => {

      if (this._connect.revisarConeccion()){
        return;
      }
      console.log(error);
      
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

  
  aparecerBuscar() {

    if (!this.aparecer) {
      this.aparecer=true;
      return;
    } else {
      this.aparecer = false;
      this.textoBuscar='';
      this._utilService.cerrarTecladoTelefono();
      return;
    }

  }

  goCarrito() {
    this.cs.verCarrito();
  }

}