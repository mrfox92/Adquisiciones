import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

//  declaramos el nombre de la función
declare function init_plugins();

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']  //  añadimos los estilos css
})
export class LoginComponent implements OnInit {

  constructor( public router: Router ) { }

  ngOnInit(): void {

    //   inicializamos la carga de los plugins. pero como no es una funcion conocida de angular no la detecta
    init_plugins();
  }

  ingresar() {

    // this.router.navigateByUrl('/dashboard');
    this.router.navigate(['/dashboard']);
  }

}
