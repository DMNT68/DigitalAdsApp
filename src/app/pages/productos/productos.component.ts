import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular/router';
import { ListViewEventData } from 'nativescript-ui-listview';
import { RadListViewComponent } from 'nativescript-ui-listview/angular';
import { View } from 'tns-core-modules/ui/page/page';
import { TextField } from "tns-core-modules/ui/text-field";
import { Subscription } from 'rxjs';

import { Producto } from '../../shared/models/producto.model';
import { ProductoService, UtilService, CarritoService, ConectividadService } from '../../shared/services/service.index';



@Component({
  selector: 'ns-productos',
  templateUrl: `productos.component.html`,
  styleUrls:['productos.component.css']
})
export class ProductosComponent implements OnInit, OnDestroy {

  isLoading = false;
  productos: Producto[] = [];
  productosSubs: Subscription;
  textoBuscar = '';
  aparecer = false;
  
  constructor(public _utilService: UtilService, 
      public _productosService: ProductoService, 
      public routerExtensions:RouterExtensions,
      public cs: CarritoService,
      private _connect:ConectividadService) { 
    
  }

  ngOnInit(): void {
    
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
      this.getProductos();
    }, 500);
    
  }

  ngOnDestroy() {
    this.productosSubs.unsubscribe();
  }


  @ViewChild('myRadListView', { static:false }) listViewComponent: RadListViewComponent;
  
  /**
   * Función que realizar un desplazamiento hacia arriba, al principio de arreglo oroductos.
   */
  public onTapUp() {
    this.listViewComponent.listView.scrollToIndex(0, true);
  }

  /**
   * Función que permite obtener un arreglo con todos los productos.
   */
  public getProductos() {
    
    this.productosSubs = this._productosService.cargarProductos()
    .subscribe(productos => {
      this.productos = productos;
    },error => {

      if (this._connect.revisarConexion()){
        return;
      }
      console.log(error);
      
    });
  
  }

  /**
   * Función que permite obtener el texto de un campo. Este ayudara a realizar la busqueda de un producto.
   * @param args Argumento de entrada
   */
  public buscarProducto(args) {

    const texto = <TextField>args.object;
    this.textoBuscar = texto.text;

  }

  /**
   * Función que permite realizar actualización de a la página el gesto pull to refresh.
   * @param args evento de tipo ListViewEventData
   */
  public onPullToRefreshInitiated(args: ListViewEventData) {
    
    setTimeout(() => {
      this.getProductos();
      
      const listView = args.object;
      listView.notifyPullToRefreshFinished();
      this.animacion(listView);
    }, 500);

  }

  /**
   * Función que permite realizar una naimación donde renderizar gradualmente los elementos de la vista. 
   * @param target parametro de tipo Viev
   */
  public animacion(target: View) {
    let duration = 300;
    target.animate({ opacity: 0, duration: duration })
          .then(() => target.animate({ opacity: 1, duration: duration }))
        .catch((e) => {
            console.log(e.message);
        });
  }

  /**
   * Funcion que actual como bandera para determinar cuando el teclado del dispositivo debe desaparecer,
   * y borrar texto de busqueda.
   */
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

  onSubmit() {
    this._utilService.cerrarTecladoTelefono();
  }

  /**
   * Función que permite navegar al componente carrito.
   */
  public goCarrito() {
    this.cs.verCarrito();
  }

}