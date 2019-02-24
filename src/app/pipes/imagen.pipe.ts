import { Pipe, PipeTransform } from '@angular/core';
import { URL_SERVICIOS } from '../config/config';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(img: string, tipo: string = 'usuario' ): any {

  let url = URL_SERVICIOS + '/imagen';
  
  if (!img) {
    return url + '/qwerty/asdf';
  }

  if (img.indexOf('https') >= 0 ) {
    return img;
  }


  switch (tipo) {
    case 'usuario':
       url += '/usuarios/' + img;
    break;

    case 'producto':
       url += '/productos/' + img;
    break;


    default: 
      console.log('Tipo de imagen no existe, usuarios, productos');
      url += url + '/qwerty/asdf';
  }

    return url;
  }

}
