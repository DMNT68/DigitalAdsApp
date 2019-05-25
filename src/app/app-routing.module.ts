import { NgModule } from "@angular/core";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { Routes } from "@angular/router";


import { LoginComponent } from './login/login.component';
import { SignupComponent } from "./login/signup.component";
import { LoginGuard } from './shared/services/service.index';


const routes: Routes = [
    { path: "login", component: LoginComponent },
    { path: "signup", component: SignupComponent },
    { path: "",canActivate:[LoginGuard], loadChildren:'~/app/pages/pages.module#PagesModule'} 
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
