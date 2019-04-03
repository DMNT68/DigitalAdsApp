import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { NativeScriptUIListViewModule } from "nativescript-ui-listview/angular";
import {NativeScriptHttpClientModule} from 'nativescript-angular/http-client';


import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { ItemsComponent } from "./item/items.component";
import { ItemDetailComponent } from "./item/item-detail.component";

import { LoginComponent } from './login/login.component';
import { SignupComponent } from "./login/signup.component";
import { ServiceModule } from "./services/service.module";
import { ProductosComponent } from "./productos/productos.component";
import { ProductoComponent } from './productos/producto.component';
import { PipesModule } from "./pipes/pipes.module";
import { TabsComponent } from './tabs/tabs.component';
import { PerfilComponent } from "./perfil/perfil.component";
import { CotizacionesComponent } from "./cotizaciones/cotizaciones.component";

@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        NativeScriptModule,
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
        ItemsComponent,
        ItemDetailComponent,
        ProductosComponent,
        ProductoComponent,
        TabsComponent,
        PerfilComponent,
        CotizacionesComponent
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
