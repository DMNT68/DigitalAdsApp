import { NgModule } from '@angular/core';
import { CommonModule} from '@angular/common';
import { HttpClientModule} from '@angular/common/http';

import {
        UsuarioService, 
        ProductoService, 
        LoginGuard, 
        UtilService, 
        CarritoService, 
        SubirArchivoService,
        ConectividadService
      } from './service.index';
      
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
    CarritoService,
    SubirArchivoService,
    ConectividadService
  ]
})
export class ServiceModule { }