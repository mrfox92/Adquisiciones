import { Component, OnInit, OnChanges } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [
  ]
})
export class DashboardComponent implements OnInit {

  constructor( private router: Router ) { }

  ngOnInit(): void {
    //  crear servicio para comprobar los distintos middlewares del backend
    //  comprobar si el token es válido
    //  comprobamos si el user existe en localstorage
    if ( localStorage.getItem('user') ) {
      return;
    } else {
      console.log('El usuario no existe, cerrando sesión...');
      this.router.navigate(['/login']);
    }
  }

}
