import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../services/service.index';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {

  //  inyectamos nuestro servicio
  constructor( public sidebarService: SidebarService ) { }

  ngOnInit(): void {
  }

}
