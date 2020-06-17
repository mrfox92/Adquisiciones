import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuardGuard implements CanActivate {

  constructor( private router: Router, private userService: UserService ) { }

  canActivate(  next: ActivatedRouteSnapshot, state: RouterStateSnapshot ): boolean {

    const getIdentity = this.userService.getIdentity();

    if ( getIdentity !== null ) {
      // console.log('Pasó el Guard');
      return true;
    } else {
      // console.log('Sacado por el guard');
      //  redireccion
      this.router.navigate(['/login']);
      return false;
    }

  }

}

