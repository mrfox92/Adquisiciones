import { Injectable } from '@angular/core';
import { URL_SERVICES } from 'src/app/config/config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, delay, map, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class DispatchersService {

  private materialPage = 1;
  private pageMaterials = '';
  private last_page: number;
  private current_page: number;
  public cargando = false;
  public orden: any = {};
  public pedido: any[];

  constructor(
    private http: HttpClient,
    private userService: UserService
  ) {
    this.leerPedidoStorage();
    this.leerOrdenStorage();
    // console.log('Orden ID: ' + this.orden.id);
  }

  get params() {

    return {
      page: this.materialPage.toString()
    };
  }

  leerPedidoStorage() {

    if ( localStorage.getItem('pedido') ) {

      this.pedido = JSON.parse( localStorage.getItem('pedido') );

    } else {
      this.pedido = [];
      localStorage.setItem('pedido', JSON.stringify( this.pedido ));
    }

  }

  leerOrdenStorage() {
    if ( localStorage.getItem('orden') ) {

      this.orden = JSON.parse( localStorage.getItem('orden') );

    } else {
      this.orden = {};
      localStorage.setItem('orden', JSON.stringify( this.orden ));
    }
  }


  getDispatcherUser() {
    //  http://acquisitions.cl/api/dispatcher/user
    const url = `${ URL_SERVICES }/dispatcher/user`;
    const headers = new HttpHeaders()
      .set('Authorization', this.userService.token);

    return this.http.get( url, { headers } );
  }



  getMaterials() {

    if ( this.cargando ) {
      //  cargando peliculas
      //  operador of emite un observable y lo transforma en un tipo valido de retorno
      return of([]);
    }

    this.cargando = true;

    // let url: string;
    let url = `${ URL_SERVICES }/dispatcher/material/list`;

    return this.http.get( url, { params: this.params } ).pipe(
      map( (resp: any) => {
        console.log( this.params );
        this.last_page = resp.materials.last_page;
        this.materialPage = resp.materials.current_page + 1;
        this.cargando = false;
        return resp;
      }),
      catchError( err => of([]) )  //  el operador encargado de capturar errores y retornar una respuesta
    );


  }

  resetMaterials(): void {
    this.current_page = 1;
    this.materialPage = 1;
  }

  getMaterial( id: string ) {

    const url = `${ URL_SERVICES }/dispatcher/material/detail/${ id }`;

    return this.http.get( url );
  }

  getOrder( id: number) {

    const url = `${ URL_SERVICES }/dispatcher/material/order/${ id }`;

    return this.http.get( url )
      .pipe(
        map( (resp: any) => resp.orden)
      );
  }


  getMyOrders() {
    // http://acquisitions.cl/api/dispatcher/material/orders/{id}

    const headers = new HttpHeaders()
        .set('Authorization', this.userService.token);

    const url = `${ URL_SERVICES }/dispatcher/material/orders`;

    return this.http.get( url, { headers } )
      .pipe(
        map( (resp: any) => resp )
      );
  }


  getNextPage( nextPageUrl: string, termino: string = '', search: boolean = false ) {

    let url = '';
    const headers = new HttpHeaders()
        .set('Authorization', this.userService.token);

    if ( search ) {
      url = `${ nextPageUrl }&search=${ termino }`;
    } else {
      url = `${ nextPageUrl }`;
    }

    return this.http.get( url, { headers } );
  }

  getPrevPage( prevPageUrl: string, termino: string = '', search: boolean = false ) {

    let url = '';
    const headers = new HttpHeaders()
        .set('Authorization', this.userService.token);

    if ( search ) {
      url = `${ prevPageUrl }&search=${ termino }`;
    } else{
      url = `${ prevPageUrl }`;
    }

    return this.http.get( url, { headers } );
  }

  searchOrder( search: string ) {
    //  /dispatcher/orders?search
    const headers = new HttpHeaders()
        .set('Authorization', this.userService.token);
    let url = `${ URL_SERVICES }/dispatcher/orders?search=${ search }`;

    return this.http.get( url, { headers } );
  }

  getSearchResults( termino: string ) {
    // http://acquisitions.cl/api/dispatcher/material/search/{search}
    const url = `${ URL_SERVICES }/dispatcher/material/search/${ termino }`;

    return this.http.get( url )
      .pipe(
        map( (resp: any) => resp)
      );
  }

  addCartItem( cartItem: any ) {

    const url = `${ URL_SERVICES }/dispatcher/order`;
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', this.userService.token);

    if ( this.orden.id ) {

      cartItem.orden = this.orden;

    }

    //  enviamos la data
    const json = JSON.stringify( cartItem );

    //  enviamos los parametros
    const params = `json=${ json }`;
    //  retornar peticion


    return this.http.post( url, params, { headers } )
    .pipe(
      map( (resp: any) => {

        // console.log(resp.orderDetail);

        if ( resp.orden.id != null ) {
          this.orden = resp.orden;
        } else {
          this.orden = [];
        }

        this.pedido.push(...[resp.orderDetail]);

        localStorage.setItem('pedido', JSON.stringify(this.pedido));
        localStorage.setItem('orden', JSON.stringify(this.orden));

        this.leerPedidoStorage();
        this.leerOrdenStorage();
        return resp;
      })
    );


    // localStorage.setItem('pedido', JSON.stringify(this.pedido));
  }

  getDeptos() {
    // http://acquisitions.cl/api/dispatcher/material/deptos
    const url = `${ URL_SERVICES }/dispatcher/material/deptos`;
    return this.http.get( url ).pipe(
      map( (resp: any) => resp.departments )
    );
  }

  getOffices( idDepto: number ) {
    //  /dispatcher/material/offices/{id}

    const url = `${ URL_SERVICES }/dispatcher/material/offices/${ idDepto }`;

    return this.http.get( url ).pipe(
      map( (resp: any) => resp.offices )
    );
  }

  processingCartItems( processingOrder: any ) {
    //  http://acquisitions.cl/api/dispatcher/material/order/{id}
    const url = `${ URL_SERVICES }/dispatcher/material/order/${ processingOrder.id }`;
    //  creamos nuestro json
    const $json = JSON.stringify( processingOrder );
    //  agregamos las cabeceras
    const headers = new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .set('Authorization', this.userService.token);
    //  pasamos nuestros parametros
    const params = `json=${ $json }`;

    return this.http.put( url, params, { headers } )
      .pipe(
        map( (resp: any) => {

          if ( resp.status === 'success' && resp.code === 200 ) {

            localStorage.removeItem('pedido');
            localStorage.removeItem('orden');
            this.pedido = [];
            this.orden = {};

            this.leerPedidoStorage();
            this.leerOrdenStorage();
          }
        })
      );
  }


  deleteIitem( id: number ) {

    // http://acquisitions.cl/api/dispatcher/material/delete/204

    const url = `${ URL_SERVICES }/dispatcher/material/delete/${ id }`;
    const headers = new HttpHeaders().set('Authorization', this.userService.token);

    return this.http.delete( url, { headers } )
      .pipe(
        map( (resp: any) => {

          this.pedido = this.pedido.filter( item => resp.orderDetail.id !==  item.id );

          localStorage.setItem('pedido', JSON.stringify(this.pedido));

          return resp;
        })
      );
  }
}
