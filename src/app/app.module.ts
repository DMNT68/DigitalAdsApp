import { NgModule, NO_ERRORS_SCHEMA, LOCALE_ID } from "@angular/core";

import localeEs from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';
registerLocaleData(localeEs);
import {NativeScriptHttpClientModule} from 'nativescript-angular/http-client';
import { NativeScriptModule } from "nativescript-angular/nativescript.module";

import { AppRoutingModule } from "./app-routing.module";
import { ServiceModule } from "./shared/services/service.module";
import { PipesModule } from "./shared/pipes/pipes.module";
import { SharedModule } from "./shared/shared.module";

import { AppComponent } from "./app.component";

@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        NativeScriptModule,
        NativeScriptHttpClientModule,
        AppRoutingModule,
        ServiceModule,
        PipesModule,
        SharedModule
    ],
    declarations: [
        AppComponent
    ],
    providers: [{ provide: LOCALE_ID, useValue: 'es-ES' }],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
/*
Pass your application module to the bootstrapModule function located in main.ts to start your app
*/
export class AppModule { }
