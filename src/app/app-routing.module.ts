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
import { LoginGuard } from "./services/guards/login.guard";

const routes: Routes = [
    { path: "",canActivate:[LoginGuard], component: TabsComponent  },
    { path: "login", component: LoginComponent },
    { path: "signup", component: SignupComponent },
    { path: "items", component: ItemsComponent, canActivate:[LoginGuard] },
    { path: "item/:id", component: ItemDetailComponent, canActivate:[LoginGuard] },
    { path: "productos", component: ProductosComponent, canActivate:[LoginGuard] },
    { path: "producto/:id", component: ProductoComponent, canActivate:[LoginGuard] },
    { path: "cotizaciones", component: CotizacionesComponent, canActivate:[LoginGuard] },
    { path: "perfil", component: PerfilComponent, canActivate:[LoginGuard] }

];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
