import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImagenPipe } from './imagen.pipe';
import { FiltroPipe } from './filtro.pipe';

@NgModule({
  declarations: [
    ImagenPipe,
    FiltroPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ImagenPipe,
    FiltroPipe
  ]
})
export class PipesModule {

  
 }