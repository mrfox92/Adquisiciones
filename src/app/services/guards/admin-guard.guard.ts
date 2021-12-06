import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { UserService } from '../user/user.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminGuardGuard implements CanActivate {

  constructor( private router: Router, private userService: UserService ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean  {


      return new Promise( resp => {

        this.userService.isAdmin().subscribe( data => {

          if ( data === true ) {

            resp( true );

          } else {
            this.router.navigate(['dashboard']);
            resp( false );
          }

        }, error => {
          this.router.navigate(['dashboard']);
          resp( false );
        });

      });

  }

}
