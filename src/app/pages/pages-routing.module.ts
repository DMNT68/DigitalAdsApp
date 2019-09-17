import { NgModule } from "@angular/core";
import { NativeScriptRouterModule } from 'nativescript-angular/router';
import { Routes } from "@angular/router";
import { ProductoComponent } from "./productos/producto-detalle/producto.component";
import { CotizacionesComponent } from "./cotizaciones/cotizaciones.component";
import { ProductosComponent } from "./productos/productos.component";
import { TabsNavComponent } from "./tabs-nav/tabs-nav.component";
import { OrdenesDetalleComponent } from "./cotizaciones/ordenes-detalle/ordenes-detalle.component";
import { CarritoComponent } from './carrito/carrito.component';

const routes: Routes = [
    {path:'tabs-nav', component: TabsNavComponent, children:[
        { path: "productos", component: ProductosComponent, outlet:'productosTab'},
        { path: "cotizaciones", component: CotizacionesComponent, outlet:'cotizacionesTab'},
        { path: "perfil", loadChildren: () => import( './perfil/perfil.module' ).then( m => m.PerfilModule ), outlet:'perfilTab'}       
    ] 
    },
    {path: "detalles/:id", component: OrdenesDetalleComponent},
    {path: "producto/:id", component: ProductoComponent},
    {path: "carrito", component: CarritoComponent},
    {path: '', redirectTo:'tabs-nav', pathMatch:'full'}
];


@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class PagesRoutingModule {}