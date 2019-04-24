import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { ReactiveFormsModule } from '@angular/forms'; 
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import {NativeScriptHttpClientModule} from 'nativescript-angular/http-client';

import { NativeScriptUIListViewModule } from "nativescript-ui-listview/angular";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

import { LoginComponent } from './login/login.component';
import { SignupComponent } from "./login/signup.component";
import { ServiceModule } from "./shared/services/service.module";
import { ProductosComponent } from "./pages/productos/productos.component";
import { ProductoComponent } from './pages/productos/producto-detalle/producto.component';
import { PipesModule } from "./shared/pipes/pipes.module";
import { TabsComponent } from './pages/tabs/tabs.component';
import { PerfilComponent } from "./pages/perfil/perfil.component";
import { CotizacionesComponent } from "./pages/cotizaciones/cotizaciones.component";
import { CarritoComponent } from "./pages/carrito/carrito.component";

@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        NativeScriptModule,
        ReactiveFormsModule,
        NativeScriptFormsModule,
        NativeScriptHttpClientModule,
        NativeScriptUIListViewModule,
        AppRoutingModule,
        ServiceModule,
        PipesModule
    ],
    declarations: [
        AppComponent,
        LoginComponent,
        SignupComponent,
        ProductosComponent,
        ProductoComponent,
        TabsComponent,
        PerfilComponent,
        CotizacionesComponent,
        CarritoComponent
    ],
    providers: [],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
/*
Pass your application module to the bootstrapModule function located in main.ts to start your app
*/
export class AppModule { }
