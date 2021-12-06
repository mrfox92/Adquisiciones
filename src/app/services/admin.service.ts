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
