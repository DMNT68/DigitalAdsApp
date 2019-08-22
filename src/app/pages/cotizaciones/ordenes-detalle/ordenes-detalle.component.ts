import { Component, OnInit, OnDestroy } from '@angular/core';
import { PageRoute, RouterExtensions } from 'nativescript-angular/router';
import { CarritoService, UsuarioService, UtilService } from '../../../shared/services/service.index';
import { Subscription } from 'rxjs';

@Component({
  selector: 'ns-ordenes-detalle',
  templateUrl: './ordenes-detalle.component.html',
  styleUrls: ['./ordenes-detalle.component.css'],
  moduleId: module.id,
})
export class OrdenesDetalleComponent implements OnInit, OnDestroy {

  detalles:any[]=[];
  orden:any={}

  isLoading = false;

  iconDelete: string;

  detalleSubcription: Subscription;

  constructor( private pageRoute: PageRoute,
    private _routerExtensions: RouterExtensions,
    public cs:CarritoService,
    private _us: UsuarioService,
    private _util: UtilService) { }

  ngOnInit() {

    this.detalleSubcription = this.pageRoute.activatedRoute.subscribe(activatedRoute=>{
      activatedRoute.paramMap.subscribe(paramMap=>{
        const id = paramMap.get('id');
        this.getOrdenDetalle(id);  
      });
    });

    this.iconDelete = this._util.iconDelete;

  }

  ngOnDestroy(){
    this.detalleSubcription.unsubscribe();
  }

  getOrdenDetalle(id:string){
    this.isLoading = true;
    this.cs.cargarOrdenDetalle(id).subscribe((resp:any)=>{
    setTimeout(() => {
        this.isLoading = false;
      }, 1000);
      this.orden=resp.orden;
      this.detalles=resp.detalles;
    });
  }

  borrarOrden(id:string) {
    this._util.confirm('¿Quieres eliminar la orden?','Eliminar Orden').then((res)=>{
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
