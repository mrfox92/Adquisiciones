import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { URL_SERVICES } from 'src/app/config/config';
import { Order } from '../../models/Order.model';
import { UserService } from '../user/user.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  token: string = '';
  constructor(
    public http: HttpClient,
    private userService: UserService
    ) { }

  getOrders() {
    //  http://acquisitions.cl/api/order
    let url = `${ URL_SERVICES }/order`;
    return this.http.get( url );
  }

  getOrder( orderId: number ) {
    //  http://acquisitions.cl/api/order/25
    let url = `${ URL_SERVICES }/order/${ orderId }`;
    return this.http.get( url );
  }

  getDetailOrder( orderId: number ) {
    //  http://acquisitions.cl/api/acquisition/order/detail/1
    let url = `${ URL_SERVICES }/acquisition/order/detail/${ orderId }`;
    return this.http.get( url );
  }

  //  paginacion
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

  searchOrder( search: string ) {
    //  http://acquisitions.cl/api/order/search/order?search=120
    let url = `${ URL_SERVICES }/order/search/order?search=${ search }`;

    return this.http.get( url );
  }

  changeStatusOrder( order: Order ) {

    //  http://acquisitions.cl/api/acquisition/order/{id}
    const url = `${ URL_SERVICES }/acquisition/order/${ order.id }`;
    //  creamos nuestro json
    const $json = JSON.stringify( order );
    //  agregamos las cabeceras
    const headers = new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .set('Authorization', this.userService.token);
    //  pasamos nuestros parametros
    const params = `json=${ $json }`;

    return this.http.put( url, params, { headers } )
      .pipe(
        map( (resp: any) => {

          return resp;
        })
      );

  }
}
