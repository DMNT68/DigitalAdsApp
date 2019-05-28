import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import {NativeScriptCommonModule} from "nativescript-angular/common"
import { NativeScriptUIListViewModule } from 'nativescript-ui-listview/angular';

import { NativeScriptFormsModule } from 'nativescript-angular/forms';
import { PagesRoutingModule } from './pages-routing.module';
import { SharedModule } from '../shared/shared.module';
import { PipesModule } from '../shared/pipes/pipes.module';
import { ServiceModule } from '../shared/services/service.module';

import { ProductoComponent } from './productos/producto-detalle/producto.component';
import { ProductosComponent } from './productos/productos.component';
import { CotizacionesComponent } from './cotizaciones/cotizaciones.component';
import { PerfilComponent } from './perfil/perfil.component';
import { TabsComponent } from './tabs/tabs.component';
import { OrdenesDetalleComponent } from './cotizaciones/ordenes-detalle/ordenes-detalle.component';
import { CarritoComponent } from './carrito/carrito.component';

@NgModule({
    declarations:[
        ProductoComponent,
        ProductosComponent,
        CotizacionesComponent,
        PerfilComponent,
        TabsComponent,
        OrdenesDetalleComponent,
        CarritoComponent
    ],
    imports: [
        NativeScriptCommonModule,
        NativeScriptFormsModule,
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