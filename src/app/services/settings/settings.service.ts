import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  //  valores por defecto
  ajustes: Ajustes = {
    temaUrl: 'assets/css/colors/default-dark.css',
    tema: 'default-dark'
  };

  //  inyectamos el servicio para manipular el DOM como tal
  constructor( @Inject(DOCUMENT) private document: Document ) {
    this.cargarAjustes();
  }

  guardarAjustes() {
    //  grabamos los ajustes en el LocalStorage
    // console.log('guardado en el local storage');
    localStorage.setItem('ajustes', JSON.stringify( this.ajustes ) );
  }


  cargarAjustes() {
    //  validamos si existe en el storage los ajustes
    if ( localStorage.getItem('ajustes') ) {
      //  si existe inicializamos con lo que está en el storage
      this.ajustes = JSON.parse( localStorage.getItem('ajustes') );
      // console.log('Cargando del local storage');
      this.aplicarTema( this.ajustes.tema );
    } else {
      //  caso contrario inicializamos con los valores por defecto
      // console.log('Usando valores por defecto');
      this.aplicarTema( this.ajustes.tema );

    }
  }

  aplicarTema( tema: string ) {
    //  utilizamos back ticks para crear un template literal
    const url = `assets/css/colors/${ tema }.css`;
    this.document.getElementById('tema').setAttribute('href', url);

    this.ajustes.tema = tema;
    this.ajustes.temaUrl = url;

    //  guardamos en el local storage
    this.guardarAjustes();
  }
}

interface Ajustes {
  temaUrl: string;
  tema: string;
}
