import { Pipe, PipeTransform } from '@angular/core';
import { Producto } from '../models/producto.model';

@Pipe({
  name: 'filtro'
})
export class FiltroPipe implements PipeTransform {

  transform(productos: Producto[], texto: string): Producto[] {

    if(texto.length === 0){
      return productos;
    }

    texto = texto.toLocaleLowerCase();
  
    return productos.filter( producto => {
      return producto.nombre.toLocaleLowerCase().includes(texto);
    });
  }

}
