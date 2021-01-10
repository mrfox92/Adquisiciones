import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { URL_SERVICES } from 'src/app/config/config';
import { Acquisition } from '../../models/Acquisition.model';
import { UserService } from '../user/user.service';
import { Material } from '../../models/material.model';

@Injectable({
  providedIn: 'root'
})
export class MaterialsService {
  public acquisition: Acquisition;
  private token: string = '';
  constructor( public http: HttpClient, public userService: UserService ) {
    this.token = this.userService.token;
    this.getAcquisition();
  }

  getMaterials() {
    //  http://acquisitions.cl/api/materials
    let url = `${ URL_SERVICES }/materials`;

    return this.http.get( url );
  }

  getAllMaterials() {
    //  http://acquisitions.cl/api/materials/material/list
    let url = `${ URL_SERVICES }/materials/material/list`;

    return this.http.get( url );
  }

  getMaterialDetail( materialId: number ) {
    //  http://acquisitions.cl/api/materials/2
    let url = `${ URL_SERVICES }/materials/${ materialId }`;
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

  createMaterial( material: Material ) {
    //  http://acquisitions.cl/api/materials
    let url = `${ URL_SERVICES }/materials`;
    let json = JSON.stringify( material );
    let params = `json=${ json }`;
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', this.token);
    return this.http.post( url, params, { headers } );
  }


  updateMaterial( material: Material ) {
    //  http://acquisitions.cl/api/materials/103
    let url = `${ URL_SERVICES }/materials/${ material.id }`;
    let json = JSON.stringify( material );
    let params = `json=${ json }`;
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', this.token);
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

  searchMaterial( search: string ) {
    //  http://acquisitions.cl/api/materials/search/material?search=6362252
    let url = `${ URL_SERVICES }/materials/search/material?search=${ search }`;

    return this.http.get( url );
  }

  deleteMaterial( material: Material ) {
    //  http://acquisitions.cl/api/materials/102
    let url = `${ URL_SERVICES }/materials/${ material.id }`;
    let headers = new HttpHeaders()
      .set('Authorization', this.token);

    return this.http.delete( url, { headers } );
  }
}
