import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { URL_SERVICES } from 'src/app/config/config';
import { Provider } from 'src/app/models/Provider.model';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class ProvidersService {

  private token: string = '';

  constructor( public http: HttpClient, private userService: UserService ) {
    this.token = this.userService.token;
  }

  //  obtener todos los proveedores

  getProviders() {
    //  http://acquisitions.cl/api/provider

    let url = `${ URL_SERVICES }/provider`;

    return this.http.get( url );
  }


  getProvider( id: number ) {
    //  http://acquisitions.cl/api/provider/16
    let url = `${ URL_SERVICES }/provider/${ id }`;

    return this.http.get( url );
  }

  createProvider( provider: Provider ) {

    // console.log( this.token );
    //  http://acquisitions.cl/api/provider
    let url = `${ URL_SERVICES }/provider`;
    //  añadimos el json
    let json = JSON.stringify( provider );
    //  añadimos los parametros al form
    let params = `json=${ json }`;
    //  añadimos la cabecera
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', this.token);

    //  creamos la peticion
    return this.http.post( url, params, { headers } );
  }

  updateProvider( provider: Provider ) {
    //  http://acquisitions.cl/api/provider/11
    let url = `${ URL_SERVICES }/provider/${ provider.id }`;
    let json = JSON.stringify( provider );
    let params = `json=${ json }`;
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', this.token);
    //  creamos la petición
    return this.http.put( url, params, { headers } );
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

  getPrevPage( prevPageUrl: string, termino: string = '', search: boolean = false ) {

    let url = '';
    if ( search ) {
      url = `${ prevPageUrl }&search=${ termino }`;
    } else{
      url = `${ prevPageUrl }`;
    }

    return this.http.get( url );
  }

  searchProvider( search: string ) {
    //  http://acquisitions.cl/api/provider/search/provider?search=965569
    let url = `${ URL_SERVICES }/provider/search/provider?search=${ search }`;

    return this.http.get( url );
  }

  deleteProvider( idProvider: number ) {
    //  http://acquisitions.cl/api/provider/16
    let url = `${ URL_SERVICES }/provider/${ idProvider }`;
    let headers = new HttpHeaders()
      .set('Authorization', this.token);

    return this.http.delete( url, { headers } );

  }
}
