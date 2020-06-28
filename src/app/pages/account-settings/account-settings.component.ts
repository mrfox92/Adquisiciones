import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../../services/service.index';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: [
  ]
})
export class AccountSettingsComponent implements OnInit {

  //  inyectamos nuestro servicio de ajustes para grabar en el local storage
  constructor( public settingsService: SettingsService ) { }

  ngOnInit(): void {
    this.colocarCheck();
  }

  cambiarColor( tema: string, link: any ) {
    // console.log( link );
    this.aplicarCheck( link );
    //  llamar funcion del servicio para aplicar el tema
    this.settingsService.aplicarTema( tema );
  }

  aplicarCheck( link: any ) {
    //  barremos todos los elementos que tengan selector
    //  y comparar para saber cual tema es el que ha sido seleccionado
    const selectores: any = document.getElementsByClassName('selector');

    //  removemos la clase working de cualquiera de los elementos
    for (const ref of selectores) {
      ref.classList.remove('working');
    }

    //  agregamos el check al anchor tag seleccionado
    link.classList.add('working');
    //  enviamos una notificación
    Swal.fire({
      title: 'Tema cambiado',
      text: 'has cambiado el tema',
      icon: 'success',
      confirmButtonText: 'OK'
    });
  }

  colocarCheck() {

    const selectores: any = document.getElementsByClassName('selector');
    //  revisamos que elemento debe tener la clase working
    let tema = this.settingsService.ajustes.tema;
    for (const ref of selectores) {

      //  comparamos si el data-theme es igual al tema,
      //  entonces ese elemento será en el cual pondremos la clase working para mostrar el check
      if ( ref.getAttribute('data-theme') === tema ) {
        //  entonces ponemos la clase working al elemento correspondiente
        ref.classList.add('working');
        break;
      }
    }

  }

}
