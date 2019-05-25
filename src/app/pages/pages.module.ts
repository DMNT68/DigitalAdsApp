import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import {NativeScriptCommonModule} from "nativescript-angular/common"
import { PagesRoutingModule } from './pages-routing.module';
import { ProductoComponent } from './productos/producto-detalle/producto.component';
import { ProductosComponent } from './productos/productos.component';
import { CotizacionesComponent } from './cotizaciones/cotizaciones.component';
import { PerfilComponent } from './perfil/perfil.component';
import { TabsComponent } from './tabs/tabs.component';
import { SharedModule } from '../shared/shared.module';
import { PipesModule } from '../shared/pipes/pipes.module';
import { ServiceModule } from '../shared/services/service.module';
import { NativeScriptUIListViewModule } from 'nativescript-ui-listview/angular';

@NgModule({
    declarations:[
        ProductoComponent,
        ProductosComponent,
        CotizacionesComponent,
        PerfilComponent,
        TabsComponent
    ],
    imports: [
        NativeScriptCommonModule,
        NativeScriptUIListViewModule,
        PagesRoutingModule,
        ServiceModule,
        PipesModule,
        SharedModule
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]        
})
export class PagesModule {}