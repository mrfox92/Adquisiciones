import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: [
  ]
})
export class IncrementadorComponent implements OnInit {


  //  recibe como argumento un elemento html
  @ViewChild('txtProgress') txtProgress: ElementRef;

  // tslint:disable-next-line: no-input-rename
  @Input('nombre') leyenda: string = 'Leyenda';
  @Input() progreso: number = 50;

  //  de aquí se emite un evento que será el cambio de la barra de progreso
  //  esta es la sintaxis para emitir un numero como un evento
  // tslint:disable-next-line: no-output-rename
  @Output('actualizaValor') cambioValor: EventEmitter<number> = new EventEmitter();

  constructor() {
    // console.log('Leyenda', this.leyenda);
    // console.log('Progreso', this.progreso);
  }

  ngOnInit(): void {
    console.log('Leyenda', this.leyenda);
    console.log('Progreso', this.progreso);
  }

  onChange( newValue: number ) {


    // let elemHTML: any = document.getElementsByName('progreso')[0];


    // console.log( this.txtProgress );

    if ( newValue >= 100 ) {
      this.progreso = 100;
    } else if ( newValue <= 0 ) {
      this.progreso = 0;

    } else {

      this.progreso = newValue;
    }
    //  casteamos progreso como un number
    // elemHTML.value = Number( this.progreso );
    this.txtProgress.nativeElement.value = this.progreso;
    this.cambioValor.emit( this.progreso );

  }

  cambiarValor( valor: number ) {
    // console.log( this.progreso );

    if ( this.progreso >= 100 && valor > 0 ) {
      this.progreso = 100;
      return;
    }

    if ( this.progreso <= 0 && valor < 0 ) {
      this.progreso = 0;
      return;
    }

    this.progreso = this.progreso + valor;
    //  emitimos el evento
    this.cambioValor.emit( this.progreso );

    //  ponemos el foco en una caja en específico
    this.txtProgress.nativeElement.focus();

  }

}
