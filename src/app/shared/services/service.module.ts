import { NgModule } from '@angular/core';
import { CommonModule} from '@angular/common';
import { HttpClientModule} from '@angular/common/http';

import { UsuarioService, ProductoService, LoginGuard, UtilService, CarritoService} from './service.index';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    UsuarioService,
    ProductoService,
    LoginGuard,
    UtilService,
    CarritoService
  ]
})
export class ServiceModule { }