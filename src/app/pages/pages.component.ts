import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../services/shared/sidebar.service';
import { DispatchersService } from '../services/dispatchers/dispatchers.service';

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

  // isDispatcher: boolean = true;

  constructor(
    private sidebarService: SidebarService,
    private dispatchersService: DispatchersService
  ) { }

  ngOnInit(): void {
    //  inicializamos los plugins
    init_plugins();
    //  cargamos el menu
    this.sidebarService.cargarMenu();
    console.log( this.sidebarService.menu );


  }


  //  TODO: comprobar role usuario y desplegar header component de forma dinamica
  //  header dispatchers
  //  header admin, adquisiciones y guest

}
