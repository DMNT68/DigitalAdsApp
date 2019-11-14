import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from "@angular/router";
import { PageRoute } from 'nativescript-angular/router';
import { Subscription } from 'rxjs';

import { ProductoService, UtilService, CarritoService, ConectividadService } from '../../../shared/services/service.index';
import { Producto } from '../../../shared/models/producto.model';

@Component({
  selector: 'ns-producto',
  templateUrl: `producto.component.html`,
  styleUrls:['../productos.component.css']

})
export class ProductoComponent implements OnInit, OnDestroy {

  cotizar1Form: FormGroup
  cotizar2Form: FormGroup
  
  producto: Producto;
  precioFinal: number;
  cantidad: number = 1;
  nletras: number = 0;
  alto: number = 0;
  ancho: number = 0;

  productoSubscription: Subscription;

  categoria: string;
  img: string;
  nombre: string;
  descripcion: string;
  activar:boolean=false;

  rotulos3D: boolean = false;
  rotulos: boolean = false;

  iconCarrito: String = '';
  iconMas: String = '';
  iconMenos: String = '';

  aparecer:boolean = true;
  isLoading = false;

  constructor(
    public _utilService: UtilService, 
    public _productoService: ProductoService, 
    private pageRoute: PageRoute,
    private activRoute : ActivatedRoute,
    public cs:CarritoService,
    private _connect:ConectividadService) {}
    
  ngOnInit() {
    
    this.cotizar1Form = new FormGroup({
      'altura': new FormControl('',[Validators.required, Validators.pattern('[0-9.]*[^,]')]),
      'ancho': new FormControl('',[Validators.required, Validators.pattern('[0-9.]*[^,]')])
    });
    
    this.cotizar2Form = new FormGroup({
      'altura': new FormControl('',[Validators.required, Validators.pattern('[0-9.]*[^,]')]),
      'ancho': new FormControl('',[Validators.required, Validators.pattern('[0-9.]*[^,]')]),
      'letras': new FormControl('',[Validators.required, Validators.pattern('[0-9]*')])
    });
    
    this.iconCarrito = this._utilService.iconCarritoAdd;
    this.iconMas = this._utilService.iconAdd;
    this.iconMenos = this._utilService.iconRemove;

    const id = this.activRoute.snapshot.params.id;
    this.getProducto(id);    
  }

  ngOnDestroy() {
    this.productoSubscription.unsubscribe();
  }

  /**
   * Función que permite obtener objeto el detalle del producto según el id.
   * @param id ID del producto.
   */
  public getProducto(id: string) {
    this.isLoading = true;
    this.productoSubscription =  this._productoService.cargarProducto(id)
    .subscribe(producto =>{ 
      
      this.producto = producto;
      this.img = producto.img;
      this.nombre = producto.nombre;
      this.categoria = producto.categoria.descripcion;
      this.descripcion = producto.descripcion;
      this.precioFinal = +producto.precioUni;
      
      if (this.categoria === 'Rótulos 3D') {
        this.rotulos3D = true;
      }
      if (this.categoria === 'Rótulos') {
        this.rotulos = true;
      }
      
      setTimeout(() => {
        this.isLoading = false;
      }, 500);
      
    }, error => {
      if (this._connect.revisarConexion()){
        return;
      }
      console.log(error);
    });
    
  }

  /**
   * Función que permite realizar la cotización de un producto variando
   * el precio según las unidades que se haya elegido.
   * @param cantidad Cantidad de productos.
   */
  public variarPrecio(cantidad?: number){

    if(this.precioFinal < +this.producto.precioUni && cantidad < 0){
      this.precioFinal = +this.producto.precioUni;
      this.cantidad = 1;
      this.alto = 0;
      this.ancho = 0;
      this.nletras = 0;
      this._utilService.toast('La cantidad debe ser igual o mayor a 1');
      return;
    }
    
    this.animation();
    this.cantidad += cantidad; 
    this.precioFinal = +this.producto.precioUni * this.cantidad;
    this.activar=true;

  }

  /**
   * Función que permite cotizar un rótulo 3D.
   * @param altura Longitud de la altura del rótulo(lona).
   * @param ancho Longitud del ancho del rótulo(lona).
   * @param nletras Número de letras 3D.
   */
  public variarPrecioRotulo3D(altura:number, ancho:number, nletras:number) {

    
    this._utilService.cerrarTecladoTelefono();
    
    if(!altura || !ancho || !nletras){
      this._utilService.alert("Ingresa los valores por favor");
      return;
    }
    
    if(this.precioFinal < +this.producto.precioUni && altura, nletras, ancho < 0){
      this.precioFinal = +this.producto.precioUni;
      this.cantidad = 1;
      this.alto = 1;
      this.nletras = 1;
      this.ancho = 1;
      this._utilService.alert("Ingresa los valor igual o mayor a 1");
      return;
    }

    this.alto=altura;
    this.ancho=ancho;
    this.nletras=nletras;
    
    let base: number = this.alto * this.ancho; 
    this.precioFinal = (+this.producto.precioUni * base) + (this.nletras*25);
    this.animation();
    this.activar=true;
    
  }

  /**
   * Función que permite cotizar un rótulo.
   * @param altura Longitud de la altura del rótulo.
   * @param ancho Longitud del ancho del rótulo.
   */
  public variarPrecioRotulo(altura:number, ancho:number) {

    
    this._utilService.cerrarTecladoTelefono();

    if(!altura || !ancho){
      this._utilService.alert("Ingresa los valores por favor");
      return;
    }
    
    if(this.precioFinal < +this.producto.precioUni && altura, ancho <= 0){
      this.precioFinal = +this.producto.precioUni;
      this.cantidad = 1;
      this.alto = 1;
      this.ancho = 1;
      this.nletras = 0;
      this._utilService.alert("Ingresa valores mayor a 0");
      return;
    }

    this.alto=altura;
    this.ancho=ancho;
    
    let base: number = this.alto * this.ancho; 
    this.precioFinal = +this.producto.precioUni * base;
    this.animation();
    this.activar=true;
  }

  /**
   * Función que permite agregar un producto a la lista de pedidos,
   * siempre y cuando se haya hecho una cotización de un producto
   */
  public agregarPedido(){

    if (this.rotulos || this.rotulos3D) {
      if(this.activar){ 
        this.cs.agregarCarrito(this.producto,this.cantidad,this.alto,this.ancho,this.nletras,this.precioFinal);
        this.activar = false;
      } else {
        this._utilService.toast('Debe cotizar el producto primero y calcular el precio','long');
      }
    } else {
      this.cs.agregarCarrito(this.producto,this.cantidad,this.alto,this.ancho,this.nletras,this.precioFinal);
    }

  }

  /**
   * Función que actúa como bandera que permite realizar un animación al variar el precio cuando lo calcula.
   */
  public animation(){
    this.aparecer = false;
    setTimeout(() => {
      this.aparecer = true;
    }, 1);
  }

}