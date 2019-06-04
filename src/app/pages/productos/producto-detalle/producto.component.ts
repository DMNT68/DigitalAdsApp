import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";


import { Producto } from '../../../shared/models/producto.model';
import { ProductoService, UtilService, CarritoService } from '../../../shared/services/service.index';
import { RouterExtensions, PageRoute } from 'nativescript-angular/router';

@Component({
  selector: 'ns-producto',
  moduleId: module.id,
  providers:[ProductoService],
  templateUrl: `producto.component.html`,
  styleUrls:['../productos.component.css']

})
export class ProductoComponent implements OnInit {

  producto: Producto;
  precioFinal: number;
  cantidad: number = 1;
  nletras: number = 0;
  alto: number = 0;
  ancho: number = 0;

  categoria: string;
  img: string;
  nombre: string;
  descripcion: string;
  activar:boolean=false;

  rotulos3D: boolean = false;
  rotulos: boolean = false;

  iconCarrito: String = '';

  constructor(
    public _utilService: UtilService, 
    public _productoService: ProductoService, 
    private activRoute: ActivatedRoute,
    private pageRoute: PageRoute,
    private _routerExtensions: RouterExtensions,
    public cs:CarritoService) {}
    
  ngOnInit() {
    this.iconCarrito = String.fromCharCode(0xe93a);

    this.pageRoute.activatedRoute.subscribe(activatedRoute=>{
      activatedRoute.paramMap.subscribe(paramMap=>{
        const id = paramMap.get('id');
        this.getProducto(id);  
      });
    });


      // const id = this.activRoute.snapshot.params.id;
      // this.getProducto(id);    
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
      this.alto = 0;
      this.ancho = 0;
      this.nletras = 0;
      this._utilService.alert("La cantidad debe ser igual o mayor a 1");
      return;
    }
    
    this.cantidad += cantidad; 
    this.precioFinal = +this.producto.precioUni * this.cantidad;
    
    this.activar=true;
  }

  variarPrecioRotulo3D() {

    
    this._utilService.cerrarTecladoTelefono();
    
    if(!this.alto || !this.ancho || !this.nletras){
      this._utilService.alert("Ingresa los valores por favor");
      return;
    }
    
    if(this.precioFinal < +this.producto.precioUni && this.alto, this.nletras, this.ancho < 0){
      this.precioFinal = +this.producto.precioUni;
      this.cantidad = 1;
      this.alto = 1;
      this.nletras = 1;
      this.ancho = 1;
      this._utilService.alert("Ingresa los valor igual o mayor a 1");
      return;
    }
    
    let base: number = this.alto * this.ancho; 
    this.precioFinal = (+this.producto.precioUni * base) + (this.nletras*25);
    this.activar=true;
    
  }

  variarPrecioRotulo() {

    
    this._utilService.cerrarTecladoTelefono();

    if(!this.alto || !this.ancho){
      this._utilService.alert("Ingresa los valores por favor");
      return;
    }
    
    if(this.precioFinal < +this.producto.precioUni && this.alto, this.ancho <= 0){
      this.precioFinal = +this.producto.precioUni;
      this.cantidad = 1;
      this.alto = 1;
      this.ancho = 1;
      this.nletras = 0;
      this._utilService.alert("Ingresa valores mayor a 0");
      return;
    }
    
    let base: number = this.alto * this.ancho; 
    this.precioFinal = +this.producto.precioUni * base;
    this.activar=true;
  }

  agregarPedido(){
    this.cs.agregarCarrito(this.producto,this.cantidad,this.alto,this.ancho,this.nletras,this.precioFinal)
  }

}