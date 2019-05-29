import { Component, OnInit } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular/router';
import { CarritoService, UtilService } from '~/app/shared/services/service.index';

@Component({
  selector: 'ns-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css'],
  moduleId: module.id,
})
export class CarritoComponent implements OnInit {

  iconClose:string;
  iconCarrito: String;
  iconBorrar: String;

  ordenes:any []=[];

  constructor(private router: RouterExtensions, private _util: UtilService, public _cs: CarritoService) { }

  ngOnInit() {

    this.iconClose=String.fromCharCode(0xea0f);
    this.iconCarrito = String.fromCharCode(0xe93a);
    this.iconBorrar = String.fromCharCode(0xe9ac);

    this.ordenes = this._cs.items;

  }

  enviarPedido() {
    this._util.confirm('¿Desea enviar el pedido para ser revisado?','Enviar Pedido')
    .then((result)=>{
      if(result){

        this._cs.realizarPedido().subscribe(
          ()=>{
          this._util.alert('Revisaremos tu pedido y nos pondremos en contacto contigo muy pronto.','Enviado Exitosamente')
          .then(() => this.back());
          },
           error => {
             console.log('error:::', error);
            this._util.alert(error.message,'Error al enviar pedido');
          }
        );

      }
    })
  }

  borrarItem(i:number){
    this._util.confirm('¿Deseas quitar el producto de la lista?').then((result)=>{
      if(result){
        this._cs.removerItems(i);
      }
    });
  }

  back(){
    this.router.backToPreviousPage();
  }

}
