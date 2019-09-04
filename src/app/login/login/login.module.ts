import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { ReactiveFormsModule } from '@angular/forms';
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { NativeScriptFormsModule } from 'nativescript-angular/forms';


import { LoginRoutingModule } from "./login-routing.module";
import { UsuarioService } from '../../shared/services/usuario/usuario.service';
import { LoginComponent } from "./login.component";

@NgModule({
    schemas: [NO_ERRORS_SCHEMA],
    imports: [
        NativeScriptCommonModule,
        ReactiveFormsModule,
        NativeScriptFormsModule,
        LoginRoutingModule
    ],
    declarations: [LoginComponent],
    providers: [ UsuarioService ] 
})
export class LoginModule { }