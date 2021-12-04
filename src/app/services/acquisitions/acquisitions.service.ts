import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserService } from '../user/user.service';
import { URL_SERVICES } from 'src/app/config/config';
import { map } from 'rxjs/operators';
import { UploadFileService } from '../upload-file/upload-file.service';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AcquisitionsService {

  private token: string = '';

  constructor(
    public http: HttpClient,
    public userService: UserService,
    private uploadFileService: UploadFileService
  ) {
    this.token = this.userService.token;
  }

  getAcquisitionUser() {
    //  http://acquisitions.cl/api/acquisition/19
    const userId = this.userService.user.id;
    const url = `${ URL_SERVICES }/acquisition/${ userId }`;
    const headers = new HttpHeaders()
      .set('Authorization', this.token);

    return this.http.get( url, { headers } );
  }

  getInvoicesProvider( providerId: number ) {

    //  http://acquisitions.cl/api/provider/invoices/{id}

    const url = `${ URL_SERVICES }/provider/invoices/${ providerId }`;
    const headers = new HttpHeaders()
      .set('Authorization', this.token);

    return this.http.get( url, { headers } );
  }

  getOutOfStock() {

    //  http://acquisitions.cl/api/acquisition/materials

    const url = `${ URL_SERVICES }/acquisition/materials/outofstock`;
    const headers = new HttpHeaders()
      .set('Authorization', this.token);

    return this.http.get( url, { headers } );

  }


  createMaterialsInvoice( materials: any ) {

    //  http://acquisitions.cl/api/acquisition/store
    const url = `${ URL_SERVICES }/acquisition`;
    const $json = JSON.stringify( materials );
    const params = `json=${ $json }`;

    const headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', this.token);

    return this.http.post( url, params, { headers } )
      .pipe(
        map( resp => resp )
      );
    // console.log( materials );
  }


  //  subir imagen
  updateImage( file: File, id: number ) {

    this.uploadFileService.uploadFile( file, 'materials', id, this.token )
        .then( (resp: any) => {
          // console.log( resp );
          if ( resp.status === 'success' ) {

            //  enviamos la notificación al usuario
            Swal.fire({
              title: 'Imagen Actualizada!',
              text: 'Imagen material actualizada con éxito',
              icon: 'success',
              confirmButtonText: 'OK'
            });

            //  guardamos en el storage
            // this.guardarStorage( resp.user.id, this.token, resp.user );
          }
        })
        .catch( resp => {
          console.log( resp );
        });

  }
}
