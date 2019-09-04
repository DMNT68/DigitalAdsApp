import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { CarritoComponent } from './carrito.component';


const routes: Routes = [

  { path: "", component: CarritoComponent }

];

@NgModule({
imports: [NativeScriptRouterModule.forChild(routes)],
exports: [NativeScriptRouterModule]
})
export class CarritoRoutingModule { }