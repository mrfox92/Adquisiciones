import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserService } from '../user/user.service';
import { URL_SERVICES } from 'src/app/config/config';
import { Acquisition } from '../../models/Acquisition.model';
import { Invoice } from '../../models/Invoice.model';

@Injectable({
  providedIn: 'root'
})
export class InvoicesService {
  public acquisition: Acquisition;
  token: string = '';
  constructor( public http: HttpClient, private userService: UserService ) {
    this.token = this.userService.token;
    this.getAcquisition();
  }


  getInvoices() {
    //  http://acquisitions.cl/api/invoices
    let url = `${ URL_SERVICES }/invoices`;

    return this.http.get( url );
  }

  getInvoice( invoiceId: number ) {
    //  http://acquisitions.cl/api/invoices/1
    let url = `${ URL_SERVICES }/invoices/${ invoiceId }`;

    return this.http.get( url );
  }

  getAcquisition() {
    //  http://acquisitions.cl/api/acquisition/19
    const userId = this.userService.user.id;
    let url = `${ URL_SERVICES }/acquisition/${ userId }`;
    let headers = new HttpHeaders()
      .set('Authorization', this.token);
    return this.http.get( url, { headers } );
  }

  getProviders() {
    //  http://acquisitions.cl/api/invoices/providers/list
    let url = `${ URL_SERVICES }/invoices/providers/list`;
    return this.http.get( url );
  }

  createInvoice( invoice: Invoice ) {
    //  http://acquisitions.cl/api/invoices
    let url = `${ URL_SERVICES }/invoices`;
    let json = JSON.stringify( invoice );
    let params = `json=${ json }`;
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', this.token);
    return this.http.post( url, params, { headers } );
  }

  //  actualizar

  updateInvoice( invoice: Invoice ) {
    //  http://acquisitions.cl/api/invoices/11
    let url = `${ URL_SERVICES }/invoices/${ invoice.id }`;
    let json = JSON.stringify( invoice );
    let params = `json=${ json }`;
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', this.token);
    return this.http.put( url, params, { headers } );
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

  searchInvoice( search: string ) {
    //  http://acquisitions.cl/api/invoices/search/invoice?search=123
    let url = `${ URL_SERVICES }/invoices/search/invoice?search=${ search }`;

    return this.http.get( url );
  }

  //  eliminar
  deleteInvoice( invoiceId: number ) {
    //  http://acquisitions.cl/api/invoices/12
    let url = `${ URL_SERVICES }/invoices/${ invoiceId }`;
    let headers = new HttpHeaders()
      .set('Authorization', this.token);

    return this.http.delete( url, { headers } );
  }
}
