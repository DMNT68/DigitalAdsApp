import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { PerfilComponent } from './perfil.component';
import { PerfilRoutingModule } from './perfil-routing.module';
import { ServiceModule } from '../../shared/services/service.module';
import { PipesModule } from '../../shared/pipes/pipes.module';
import { SharedModule } from '../../shared/shared.module';
import { UsuarioService } from '../../shared/services/usuario/usuario.service';


@NgModule({
    schemas: [NO_ERRORS_SCHEMA],
    imports: [
        NativeScriptCommonModule,
        PerfilRoutingModule,
        ServiceModule,
        PipesModule,
        SharedModule

    ],
    declarations: [PerfilComponent],
    providers: [  ]
})
export class PerfilModule { }