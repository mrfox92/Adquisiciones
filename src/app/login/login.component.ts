import { Component, OnInit, OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UserService } from '../services/service.index';
import { User } from '../models/user.model';

//  declaramos el nombre de la función
declare function init_plugins();

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']  //  añadimos los estilos css
})
export class LoginComponent implements OnInit {

  recuerdame: boolean = false;
  email: string;

  constructor(
    public router: Router,
    public userService: UserService
  ) { }


  ngOnInit(): void {

    //   inicializamos la carga de los plugins. pero como no es una funcion conocida de angular no la detecta
    init_plugins();
    //  leemos desde el storage
    this.email = localStorage.getItem('email') || '';
    //  marcamos el check si existe un email
    if ( this.email.length > 1 ) {
      this.recuerdame = true;
    }

    //  comprobar si el usuario esta autenticado o no
    this.isLoggedIn();
  }

  isLoggedIn() {

    if ( localStorage.getItem('user') && localStorage.getItem('token') ) {
      this.router.navigate(['/dashboard']);
    } else {
      this.router.navigate(['/login']);
    }
  }

  ingresar( forma: NgForm ) {


    if ( forma.invalid ) {
      return;
    }

    let user = new User(null, null, forma.value.email, forma.value.password, true);

    //  llamamos a nuestro servicio
    this.userService.login( user, forma.value.recuerdame ).subscribe(
      response => {

        if ( response.status === 'success' ) {
          console.log( response );
          this.router.navigate(['/dashboard']);
        } else {
          console.error( response );
        }
      },
      error => console.log( error )
    );

  }

}
