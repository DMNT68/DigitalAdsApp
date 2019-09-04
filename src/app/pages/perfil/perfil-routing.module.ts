import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { PerfilComponent } from './perfil.component';


const routes: Routes = [

  { path: "", component: PerfilComponent }

];

@NgModule({
imports: [NativeScriptRouterModule.forChild(routes)],
exports: [NativeScriptRouterModule]
})
export class PerfilRoutingModule { }