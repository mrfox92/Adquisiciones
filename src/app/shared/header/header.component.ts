import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/service.index';
import { User } from '../../models/user.model';
import { DispatchersService } from '../../services/dispatchers/dispatchers.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent implements OnInit {

  user: User;
  pedido: any [] = [];
  orden: any = {};
  // imageUrl: string;

  constructor(
    public userService: UserService,
    public dispatchersService: DispatchersService,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.user = this.userService.user;
    this.pedido = this.dispatchersService.pedido;
    this.orden = this.dispatchersService.orden;
    // console.log( this.pedido );
    // console.log( this.orden );
  }

  updateCartItems() {
    this.pedido = this.dispatchersService.pedido;
    this.orden = this.dispatchersService.orden;
  }

  buscarMaterial( termino: string ) {

    termino = termino.trim();

    if ( termino.length === 0 ) {
      return;
    }
    // console.log( termino );
    this.router.navigate(['/busqueda', termino]);
    //  redireccionamos a las busquedas
  }

}
