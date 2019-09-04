import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { ServiceModule } from '../../shared/services/service.module';
import { PipesModule } from '../../shared/pipes/pipes.module';
import { SharedModule } from '../../shared/shared.module';
import { CarritoComponent } from './carrito.component';
import { CarritoRoutingModule } from './carrito-routing.module';


@NgModule({
    schemas: [NO_ERRORS_SCHEMA],
    imports: [
        NativeScriptCommonModule,
        CarritoRoutingModule,
        ServiceModule,
        PipesModule,
        SharedModule

    ],
    declarations: [CarritoComponent],
    providers: []
})
export class CarritoModule { }