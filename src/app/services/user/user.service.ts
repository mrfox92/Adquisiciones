import { Injectable } from '@angular/core';
import { User } from '../../models/user.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { URL_SERVICES } from '../../config/config';
import { Observable } from 'rxjs';
import { map, debounceTime } from 'rxjs/operators';
import { Router } from '@angular/router';
import { UploadFileService } from '../upload-file/upload-file.service';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user: User;
  token: string;
  checkIsLoggedIn: boolean = false;

  constructor(
    public router: Router,
    public http: HttpClient,
    public uploadFileService: UploadFileService
  ) {
    this.cargarStorage();
  }

  // isLoggedIn() {
  //   //  http://acquisitions.cl/api/user/checktoken
  //   const url = `${ URL_SERVICES }/user/checktoken`;
  //   const headers = new HttpHeaders()
  //     .set('Content-Type', 'application/x-www-form-urlencoded')
  //     .set('Authorization', this.token);
  //   this.http.post( url, { params: null }, { headers } );
  // }

  register( user: User ): Observable<any> {

    const url = `${ URL_SERVICES }/register`;
    const $json = JSON.stringify( user );
    const params = `json=${ $json }`;

    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

    return this.http.post( url, params, { headers } );
  }

  cargarStorage() {

    if ( localStorage.getItem('token') ) {

      this.token = localStorage.getItem('token');
      this.user = JSON.parse( localStorage.getItem('user') );

    } else {
      this.token = '';
      this.user = null;
      localStorage.setItem('token', this.token);
      localStorage.setItem('user', JSON.stringify( this.user ));
    }
  }

  guardarStorage( id: string, token: string, user: User ) {
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify( user ) );
  }


  getIdentity() {
    return JSON.parse( localStorage.getItem('user') );
  }

  logout() {
    this.user = null;
    this.token = null;

    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('id');


    this.router.navigate(['/login']);
  }


  login( user: User, recordar: boolean = false ) {

    if ( recordar ) {
      //  grabamos en el localstorage recordar
      localStorage.setItem('email', user.email);
    } else {
      //  sino existe igual lo intentará eliminar
      localStorage.removeItem('email');
    }

    const url = `${ URL_SERVICES }/login`;

    const json = JSON.stringify( user );
    const params = `json=${ json }`;
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

    return this.http.post( url, params, { headers } )
                    .pipe(
                      map( (resp: any) => {

                          if ( resp.status === 'success' ) {
                            //  grabamos en el storage
                            this.guardarStorage( resp.id, resp.token, resp.user );
                            //  leemos del storage
                            this.cargarStorage();
                          }

                          return resp;

                        })
                    );

  }

  updateUser( user: User ) {

    //  http://acquisitions.cl/api/user/edit/14
    const url = `${ URL_SERVICES }/user/edit/${ user.id }`;
    //  creamos nuestro json
    const $json = JSON.stringify( user );
    //  agregamos las cabeceras
    const headers = new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .set('Authorization', this.token);
    //  pasamos nuestros parametros
    const params = `json=${ $json }`;

    return this.http.put( url, params, { headers } )
                    .pipe(
                      map( (resp: any) => {
                        // this.user = resp.user;
                        if ( resp.status === 'success' ) {

                          //  comprobamos
                          this.guardarStorage( resp.user.id, this.token , resp.user );
                        }
                        // console.log( resp );
                        return resp;
                      })
                    );

  }

  updateRoleUser( user: User ) {
    //  http://acquisitions.cl/api/user/role/17
    const url = `${ URL_SERVICES }/user/role/${ user.id }`;
    //  creamos nuestro json
    const $json = JSON.stringify( user );
    //  agregamos las cabeceras
    const headers = new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .set('Authorization', this.token);
    //  pasamos nuestros parametros
    const params = `json=${ $json }`;

    return this.http.put( url, params, { headers } )
                    .pipe(
                      map( (resp: any) => {
                        // this.user = resp.user;
                        if ( resp.status === 'success' ) {

                          //  comprobamos si el usuario que está autenticado actualiza su role llamamos al storage
                          if ( user.id === this.user.id ) {

                            //  comprobamos
                            this.guardarStorage( resp.user.id, this.token , resp.user );
                          }
                        }
                        // console.log( resp );
                        return resp;
                      })
                    );
  }

  updateImage( file: File, id: number ) {

    this.uploadFileService.uploadFile( file, 'user', id, this.token )
        .then( (resp: any) => {
          // console.log( resp );
          if ( resp.status === 'success' ) {

            this.user.avatar = resp.user.avatar;
            //  enviamos la notificación al usuario
            Swal.fire({
              title: 'Imagen Actualizada!',
              text: this.user.name,
              icon: 'success',
              confirmButtonText: 'OK'
            });

            //  guardamos en el storage
            this.guardarStorage( resp.user.id, this.token, resp.user );
          }
        })
        .catch( resp => {
          console.log( resp );
        });

  }

  cargarUsuarios( page: number = 0 ) {
    //  http://acquisitions.cl/api/user?page=1
    let url = `${ URL_SERVICES }/user?page=${ page }`;

    return this.http.get( url );
  }

  //  metodos para peticiones de paginacion de resultados

  nextPageUsers( nextPageUrl: string, termino: string = '', search: boolean = false ) {

    let url = '';
    if ( search ) {
      url = `${ nextPageUrl }&search=${ termino }`;
    } else {
      url = `${ nextPageUrl }`;
    }
    //  realizamos la petición y retornamos el resultado
    return this.http.get( url );
  }

  prevPageUsers( prevPageUrl: string, termino: string = '', search: boolean = false ) {

    let url = '';
    if ( search ) {
      url = `${ prevPageUrl }&search=${ termino }`;
    } else {
      url = `${ prevPageUrl }`;
    }
    //  realizamos la petición y retornamos el resultado
    return this.http.get( url );
  }

  buscarUsuarios( termino: string ) {
    //  http://acquisitions.cl/api/user/search?search=

    const url = `${ URL_SERVICES }/user/search?search=${ termino }`;

    return this.http.get( url );
  }

  deleteUser( id: number ) {
    //  enviamos el token
    //  http://acquisitions.cl/api/user/delete/10
    let url = `${ URL_SERVICES }/user/delete/${ id }`;
    let headers = new HttpHeaders().set('Authorization', this.token);

    return this.http.delete( url, { headers } );
  }
}
