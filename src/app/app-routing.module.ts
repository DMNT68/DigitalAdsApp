import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { LoginGuard } from './shared/services/service.index';

const routes: Routes = [
    { path: "login", loadChildren: () => import( './auth/auth.module' ).then( m => m.AuthModule ) },
    { path: "pages",canActivate:[LoginGuard], loadChildren: () => import( './pages/pages.module' ).then( m => m.PagesModule )},
    {path:'',redirectTo: 'pages/tabs-nav',pathMatch:'full'}
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
