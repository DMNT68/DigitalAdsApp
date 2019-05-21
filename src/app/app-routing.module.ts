import { NgModule } from "@angular/core";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { Routes } from "@angular/router";


import { LoginComponent } from './login/login.component';
import { SignupComponent } from "./login/signup.component";
import { ProductoComponent } from "./pages/productos/producto-detalle/producto.component";
import { TabsComponent } from './pages/tabs/tabs.component';
import { CotizacionesComponent } from "./pages/cotizaciones/cotizaciones.component";
import { PerfilComponent } from "./pages/perfil/perfil.component";
import { LoginGuard } from './shared/services/service.index';
import { ProductosComponent } from './pages/productos/productos.component';


const routes: Routes = [
    { path: "login", component: LoginComponent },
    { path: "signup", component: SignupComponent },
    
    { path: "",canActivate:[LoginGuard], children: [
        {path:'tabs', component: TabsComponent, children:[
            
            { path: "productos", component: ProductosComponent, outlet:'productosTab'},
            { path: "cotizaciones", component: CotizacionesComponent, outlet:'cotizacionesTab'},
            { path: "perfil", component: PerfilComponent, outlet:'perfilTab'}       
        ] 
        },
        { path: "producto/:id", component: ProductoComponent},
        {path: '', redirectTo:'tabs', pathMatch:'full'}
    ]}
    
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
