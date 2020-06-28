import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { URL_SERVICES } from 'src/app/config/config';
import { UserService } from '../user/user.service';
import { Office } from '../../models/Office.model';

@Injectable({
  providedIn: 'root'
})
export class OfficesService {
  token: string = '';
  constructor(public userService: UserService, public http: HttpClient ) {
    this.token = this.userService.token;
  }

  getOffices() {
    //  http://acquisitions.cl/api/offices
    const url = `${ URL_SERVICES }/offices`;
    return this.http.get( url );
  }

  getOffice( idOffice: number ) {
    //  http://acquisitions.cl/api/offices/1
    const url = `${ URL_SERVICES }/offices/${ idOffice }`;
    return this.http.get( url );
  }

  getDeptos() {
    //  http://acquisitions.cl/api/offices/departments/list
    const url = `${ URL_SERVICES }/offices/departments/list`;
    return this.http.get( url );
  }

  createOffice( office: Office ) {
    //  obtener el token de usuario autenticado
    //  http://acquisitions.cl/api/offices
    let url = `${ URL_SERVICES }/offices`;
    //  modiifcar cabeceras peticion
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', this.token);
    //  enviamos la data
    let json = JSON.stringify( office );
    //  enviamos los parametros
    let params = `json=${ json }`;
    //  retornar peticion
    return this.http.post( url, params, { headers } );
  }

  updateOffice( office: Office ) {
    //  http://acquisitions.cl/api/offices/51
    let url = `${ URL_SERVICES }/offices/${ office.id }`;
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', this.token);
    let json = JSON.stringify( office );
    let params = `json=${ json }`;
    return this.http.put( url, params, { headers } );

  }

  getPrevPage( prevPageUrl: string , termino: string = '', search: boolean = false ) {

    let url = '';
    if ( search ) {
      url = `${ prevPageUrl }&search=${ termino }`;
    } else{
      url = `${ prevPageUrl }`;
    }

    return this.http.get( url );
  }

  getNextPage( nextPageUrl: string, termino: string = '', search: boolean = false ) {

    let url = '';
    if ( search ) {
      url = `${ nextPageUrl }&search=${ termino }`;
    } else {
      url = `${ nextPageUrl }`;
    }

    return this.http.get( url );
  }

  searchOffice( search: string ) {
    //  http://acquisitions.cl/api/offices/search/office?search=aseso
    let url = `${ URL_SERVICES }/offices/search/office?search=${ search }`;

    return this.http.get( url );
  }

  deleteOffice( idOffice: number ) {
    //  http://acquisitions.cl/api/offices/51
    let url = `${ URL_SERVICES }/offices/${ idOffice }`;

    let headers = new HttpHeaders()
      .set('Authorization', this.token);

    return this.http.delete( url, { headers } );
  }
}
