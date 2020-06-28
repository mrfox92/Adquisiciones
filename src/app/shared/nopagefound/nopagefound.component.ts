import { Component, OnInit } from '@angular/core';

//  declaracion funcion inicializar plugins externos
declare function init_plugins();

@Component({
  selector: 'app-nopagefound',
  templateUrl: './nopagefound.component.html',
  styles: [
  ]
})
export class NopagefoundComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

    init_plugins();

  }

}
