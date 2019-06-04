import { Component, OnInit, ViewChild} from '@angular/core';
import { RouterExtensions } from 'nativescript-angular/router';
import { ListViewEventData } from 'nativescript-ui-listview';

import { View } from 'tns-core-modules/ui/page/page';

import { Producto } from '../../shared/models/producto.model';

import { TextField } from "tns-core-modules/ui/text-field";

import { ProductoService, UtilService, CarritoService } from '../../shared/services/service.index';
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
  suma: number = 1;
  iconSearch: String;
  iconClose: String;
  iconUp: String;
  iconCarrito: String;
  iconProductos: String;

  
  
  constructor(public _utilService: UtilService, 
      public _productosService: ProductoService, 
      public routerExtensions:RouterExtensions,
      public cs: CarritoService) { 
    
    this.iconSearch = String.fromCharCode(0xe986);
    this.iconClose = String.fromCharCode(0xea0f);
    this.iconUp = String.fromCharCode(0xea41);
    this.iconCarrito = String.fromCharCode(0xe93a);
    this.iconProductos = String.fromCharCode(0xe900);
    
  }
  

  ngOnInit(){

    console.log('Accediste al componente de productos');
    
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
      this.getProductos();
    }, 1000);
    
  }
  
  @ViewChild('myRadListView') listViewComponent: RadListViewComponent;
  public onTapUp() {
    this.listViewComponent.listView.scrollToIndex(0, true);
  }
  
  onProductoTap(id){
    this.routerExtensions.navigate([`/producto/${id}` , {
      transition:{name:'slideTop',duration:1000,curve:'linear'}
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

  
  aparecerBuscar(valor:number) {

    this._utilService.cerrarTecladoTelefono();

    this.suma += valor;
    let residuo= 0;
    residuo = this.suma % 2;
    
    if (residuo === 0) {
      this.aparecer=true;
      return;
    } else {
      this.aparecer = false;
      this.textoBuscar='';
      return;
    }
  }

  goCarrito() {
    this.cs.verCarrito();
  }

}