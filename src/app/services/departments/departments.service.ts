import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { URL_SERVICES } from 'src/app/config/config';
import { Department } from 'src/app/models/Department.model';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class DepartmentsService {

  token: string = '';
  constructor( public http: HttpClient, private userService: UserService ) {
    this.token = userService.token;
  }

  getDeptos() {
    //  http://acquisitions.cl/api/department
    const url = `${ URL_SERVICES }/department`;
    return this.http.get( url );
  }

  getDepto( idDepto: number ) {
    //  http://acquisitions.cl/api/department/1
    const url = `${ URL_SERVICES }/department/${ idDepto }`;

    return this.http.get( url );
  }

  //  consumir servicio para obtener todas las oficinas pertenecientes a un departamento

  createDepto( department: Department ) {
    //  http://acquisitions.cl/api/department
    const url = `${ URL_SERVICES }/department`;
    const json = JSON.stringify( department );
    const params = `json=${ json }`;
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', this.token);

    return this.http.post( url, params, { headers } );
  }

  updateDepto( department: Department ) {
    //  http://acquisitions.cl/api/department/18
    const url = `${ URL_SERVICES }/department/${ department.id }`;
    const json = JSON.stringify( department );
    const params = `json=${ json }`;
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', this.token);
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

  searchDepto( search: string ) {
    //  http://acquisitions.cl/api/department/search/department?search=alca
    let url = `${ URL_SERVICES }/department/search/department?search=${ search }`;

    return this.http.get( url );
  }

  deleteDepto( departmentId: number ) {
    //  http://acquisitions.cl/api/department/11
    const url = `${ URL_SERVICES }/department/${ departmentId }`;
    const headers = new HttpHeaders()
      .set('Authorization', this.token);

    return this.http.delete( url, { headers } );
  }
}
