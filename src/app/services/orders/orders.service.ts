import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { URL_SERVICES } from 'src/app/config/config';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  token: string = '';
  constructor( public http: HttpClient ) { }

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
}
