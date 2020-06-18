import { Pipe, PipeTransform } from '@angular/core';
import { URL_SERVICES } from '../config/config';

@Pipe({
  name: 'image'
})
export class ImagePipe implements PipeTransform {

  transform(img: string, tipo: string = 'user'): any {

    let url = `${ URL_SERVICES }`;

    if ( !img ) {
      return `${ url }/user/image/notfound`;
    }

    switch (tipo) {
      case 'user':
        url += `/user/image/${ img }`;
        break;
      case 'material':
        url += `/material/image/${ img }`;
        break;
      default:
        console.log('Tipo de imagen no existe, usuarios, materiales');
        url += `/user/image/notfound`;
        break;
    }

    return url;
  }

}
