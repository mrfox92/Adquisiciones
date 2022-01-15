import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { URL_SERVICES } from '../config/config';
import { UserService } from './user/user.service';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(
    private http: HttpClient,
    private userService: UserService
  ) { }


  getOffices( filter: any ) {
    //  http://acquisitions.cl/api/administrador/offices
    //  enviar token admin
    //  enviar parametros

    const $json = JSON.stringify( filter );
    //  agregamos las cabeceras
    const headers = new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .set('Authorization', this.userService.token);
    //  pasamos nuestros parametros
    const params = `json=${ $json }`;

    const url = `${ URL_SERVICES }/administrador/offices`;

    return this.http.post( url, params, { headers },  );
  }

  getOfficesByYear( anio: number ) {
    //  http://acquisitions.cl/api/administrador/offices/year

    const $json = JSON.stringify( anio );
    //  agregamos las cabeceras
    const headers = new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .set('Authorization', this.userService.token);
    //  pasamos nuestros parametros
    const params = `json=${ $json }`;

    const url = `${ URL_SERVICES }/administrador/offices/year`;

    return this.http.post( url, params, { headers },  );
  }

  getOrders() {
    //  http://acquisitions.cl/api/administrador/orders
    const headers = new HttpHeaders()
        .set('Authorization', this.userService.token);

    let url = `${ URL_SERVICES }/administrador/orders`;
    return this.http.get( url, { headers } );
  }

  //  paginacion
  getPrevPage( prevPageUrl: string , termino: string = '', search: boolean = false ) {

    let url = '';
    if ( search ) {
      url = `${ prevPageUrl }&search=${ termino }`;
    } else{
      url = `${ prevPageUrl }`;
    }

    const headers = new HttpHeaders()
        .set('Authorization', this.userService.token);

    return this.http.get( url, { headers } );
  }

  getNextPage( nextPageUrl: string, termino: string = '', search: boolean = false ) {

    let url = '';
    if ( search ) {
      url = `${ nextPageUrl }&search=${ termino }`;
    } else {
      url = `${ nextPageUrl }`;
    }

    const headers = new HttpHeaders()
        .set('Authorization', this.userService.token);

    return this.http.get( url, { headers } );
  }

  searchOrder( search: string ) {
    //  http://acquisitions.cl/api/order/search/order?search=120

    const headers = new HttpHeaders()
        .set('Authorization', this.userService.token);

    let url = `${ URL_SERVICES }/administrador/orders/search?search=${ search }`;

    return this.http.get( url, { headers } );
  }



  compareByYear( years: any ) {

    // http://acquisitions.cl/api/administrador/offices/compare

    const $json = JSON.stringify( years );
    //  agregamos las cabeceras
    const headers = new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .set('Authorization', this.userService.token);
    //  pasamos nuestros parametros
    const params = `json=${ $json }`;

    const url = `${ URL_SERVICES }/administrador/offices/compare`;

    return this.http.post( url, params, { headers },  );
  }

  //  /administrador/materials/invoices

  geInvoicesByYear( anio: number ) {
    const $json = JSON.stringify( anio );
    //  agregamos las cabeceras
    const headers = new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .set('Authorization', this.userService.token);
    //  pasamos nuestros parametros
    const params = `json=${ $json }`;

    const url = `${ URL_SERVICES }/administrador/materials/invoices`;

    return this.http.post( url, params, { headers },  );
  }
}
