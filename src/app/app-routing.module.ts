import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { LoginGuard } from './shared/services/service.index';

const routes: Routes = [
    { path: "login", loadChildren: () => import( './login/login/login.module' ).then( m => m.LoginModule ) },
    { path: "signup", loadChildren: () => import( './login/signup/signup.module' ).then( m => m.SignupModule ) },
    { path: "",canActivate:[LoginGuard], loadChildren: () => import( './pages/pages.module' ).then( m => m.PagesModule )} 
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
