import { NgModule } from "@angular/core";
import { NativeScriptRouterModule } from 'nativescript-angular/router';
import { Routes } from "@angular/router";
import { ProductoComponent } from "./productos/producto-detalle/producto.component";
import { PerfilComponent } from "./perfil/perfil.component";
import { CotizacionesComponent } from "./cotizaciones/cotizaciones.component";
import { ProductosComponent } from "./productos/productos.component";
import { TabsComponent } from "./tabs/tabs.component";

const routes: Routes = [
    {path:'tabs', component: TabsComponent, children:[
        { path: "productos", component: ProductosComponent, outlet:'productosTab'},
        { path: "cotizaciones", component: CotizacionesComponent, outlet:'cotizacionesTab'},
        { path: "perfil", component: PerfilComponent, outlet:'perfilTab'}       
    ] 
    },
    {path: "producto/:id", component: ProductoComponent},
    {path: '', redirectTo:'tabs', pathMatch:'full'}
];


@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class PagesRoutingModule {}