import { Component, OnInit } from '@angular/core';
import { PageRoute, RouterExtensions } from 'nativescript-angular/router';
import { CarritoService, UsuarioService, UtilService } from '../../../shared/services/service.index';

@Component({
  selector: 'ns-ordenes-detalle',
  templateUrl: './ordenes-detalle.component.html',
  styleUrls: ['./ordenes-detalle.component.css'],
  moduleId: module.id,
})
export class OrdenesDetalleComponent implements OnInit {

  detalles:any[]=[];
  orden:any={}

  constructor( private pageRoute: PageRoute,
    private _routerExtensions: RouterExtensions,
    public cs:CarritoService,
    private _us: UsuarioService,
    private _util: UtilService) { }

  ngOnInit() {

    this.pageRoute.activatedRoute.subscribe(activatedRoute=>{
      activatedRoute.paramMap.subscribe(paramMap=>{
        const id = paramMap.get('id');
        this.getOrdenDetalle(id);  
      });
    });

  }

  getOrdenDetalle(id:string){
    this.cs.cargarOrdenDetalle(id).subscribe((resp:any)=>{
      this.orden=resp.orden;
      this.detalles=resp.detalles;
    });
  }

  borrarOrden(id:string) {
    this._util.confirm('¿Quieres Elminar la orden?','Eliminar Orde').then((res)=>{
      if(res){
        this.cs.borrarOrden(id).subscribe(()=>{
          this._util.alert('La orden se ha eliminado').then(()=>{
            this._routerExtensions.backToPreviousPage();
          });
        });
      }
    });
  }

}
