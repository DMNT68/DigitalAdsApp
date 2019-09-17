import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

import { Producto } from '../../../shared/models/producto.model';
import { ProductoService, UtilService, CarritoService, ConectividadService } from '../../../shared/services/service.index';
import { PageRoute } from 'nativescript-angular/router';
import { Subscription } from 'rxjs';

import * as Toast from 'nativescript-toast';

@Component({
  selector: 'ns-producto',
  moduleId: module.id,
  providers:[ProductoService],
  templateUrl: `producto.component.html`,
  styleUrls:['../productos.component.css']

})
export class ProductoComponent implements OnInit, OnDestroy {

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
    this.iconCarrito = this._utilService.iconCarritoAdd;
    this.iconMas = this._utilService.iconAdd;
    this.iconMenos = this._utilService.iconRemove;

    // this.pageRoute.activatedRoute.subscribe(activatedRoute=>{
    //   activatedRoute.paramMap.subscribe(paramMap=>{
    //     const id = paramMap.get('id');
    //     this.getProducto(id);  
    //   });
    // });
      const id = this.activRoute.snapshot.params.id;
      this.getProducto(id);    
  }

  ngOnDestroy() {
    this.productoSubscription.unsubscribe();
  }

  getProducto(id: string) {
    this.isLoading = true;
    this.productoSubscription =  this._productoService.cargarProducto(id)
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
      
      setTimeout(() => {
        this.isLoading = false;
      }, 500);
      
    },
    error => {
      if (this._connect.revisarConexion()){
        return;
      }
      console.log(error);
    }
    );
    
  }

  variarPrecio(cantidad?: number){

    
    if(this.precioFinal < +this.producto.precioUni && cantidad < 0){
      this.precioFinal = +this.producto.precioUni;
      this.cantidad = 1;
      this.alto = 0;
      this.ancho = 0;
      this.nletras = 0;
      this._utilService.alert("La cantidad debe ser igual o mayor a 1");
      return;
    }
    
    this.animation();

    this.cantidad += cantidad; 
    this.precioFinal = +this.producto.precioUni * this.cantidad;
    
    this.activar=true;
  }

  variarPrecioRotulo3D(altura:number, ancho:number, nletras:number) {

    
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

  variarPrecioRotulo(altura:number, ancho:number) {

    
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

  agregarPedido(){

    if (this.rotulos || this.rotulos3D) {
      if(this.activar){ 
        this.cs.agregarCarrito(this.producto,this.cantidad,this.alto,this.ancho,this.nletras,this.precioFinal);
        this.activar = false;
      } else {
        Toast.makeText('Debes cotizar el producto primero').show();
      }
    } else {
      this.cs.agregarCarrito(this.producto,this.cantidad,this.alto,this.ancho,this.nletras,this.precioFinal);
    }

  }

  animation(){
    this.aparecer = false;
    setTimeout(() => {
      this.aparecer = true;
    }, 1);
  }

}