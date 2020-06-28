import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserService } from '../user/user.service';
import { URL_SERVICES } from 'src/app/config/config';

@Injectable({
  providedIn: 'root'
})
export class AcquisitionsService {

  private token: string = '';

  constructor( public http: HttpClient, public userService: UserService ) {
    this.token = this.userService.token;
  }

  getAcquisitionUser() {
    //  http://acquisitions.cl/api/acquisition/19
    const userId = this.userService.user.id;
    let url = `${ URL_SERVICES }/acquisition/${ userId }`;
    let headers = new HttpHeaders()
      .set('Authorization', this.token);
    return this.http.get( url, { headers } );
  }
}
