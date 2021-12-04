import { Injectable } from '@angular/core';
import { URL_SERVICES } from 'src/app/config/config';

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {

  constructor() { }

  //  todo este código del metodo está hecho con vanilla javascript
  uploadFile( file: File, tipo: string, id: number, token: string ) {


    return new Promise( ( resolve, reject ) => {

      let formData = new FormData();
      //  creamos una instancia para la petición ajax
      let  xhr = new XMLHttpRequest();

      formData.append( 'file0', file, file.name );

      //  configuramos la petición ajax
      xhr.onreadystatechange = () => {

        //  evaluamos si el estado de carga de imagen esta ok
        if ( xhr.readyState === 4 ) {
          //  verificamos si la respuesta del servidor es un codigo 200
          if ( xhr.status === 200 ) {
            console.log('Imagen subida');
            //  transformamos el json string de la respuesta a un json válido
            resolve( JSON.parse( xhr.response ) );
          } else {
            console.log('Falló la subida de la imagen');
            reject( xhr.response );
          }
        }
      };

      //  estructuramos la url de peticion al servicio
      //  http://acquisitions.cl/api/materials/upload
      let url = `${ URL_SERVICES }/${ tipo }/upload/${ id }`;

      //  hacemo la petición
      xhr.open('POST', url, true);
      //  configurar las cabeceras de la petición ajax
      xhr.setRequestHeader('Authorization', token);
      //  enviamos el form data
      xhr.send( formData );

    });


  }
}
