import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { LoginGuard } from './shared/services/service.index';

const routes: Routes = [
    { path: "login", loadChildren: "~/app/login/login/login.module#LoginModule" },
    { path: "signup", loadChildren: "~/app/login/signup/signup.module#SignupModule"},
    { path: "",canActivate:[LoginGuard], loadChildren:'~/app/pages/pages.module#PagesModule'} 
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
