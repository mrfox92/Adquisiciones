import { Component, OnInit } from '@angular/core';

//  declaramos el nombre de la función
//  de esta forma podemos llamar cualquier script que se encuentre
//  fuera de angular en un archivo de javascript
//  esto funciona mucho con plugins y scripts que estan hechos directamente con jquery
declare function init_plugins();

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: [
  ]
})
export class PagesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    //  inicializamos los plugins
    init_plugins();
  }

}
