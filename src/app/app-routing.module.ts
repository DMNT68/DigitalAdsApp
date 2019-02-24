import { NgModule } from "@angular/core";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { Routes } from "@angular/router";

import { ItemsComponent } from "./item/items.component";
import { ItemDetailComponent } from "./item/item-detail.component";
import { LoginComponent } from './login/login.component';
import { SignupComponent } from "./login/signup.component";
import { ProductosComponent } from "./productos/productos.component";
import { ProductoComponent } from "./productos/producto.component";
import { TabsComponent } from './tabs/tabs.component';
import { CotizacionesComponent } from "./cotizaciones/cotizaciones.component";
import { PerfilComponent } from "./perfil/perfil.component";

const routes: Routes = [
    { path: "", redirectTo: "/login", pathMatch: "full" },
    { path: "login", component: LoginComponent },
    { path: "signup", component: SignupComponent },
    { path: "items", component: ItemsComponent },
    { path: "item/:id", component: ItemDetailComponent },
    { path: "productos", component: ProductosComponent },
    { path: "producto/:id", component: ProductoComponent },
    { path: "tabs", component: TabsComponent },
    { path: "cotizaciones", component: CotizacionesComponent },
    { path: "perfil", component: PerfilComponent },

];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
