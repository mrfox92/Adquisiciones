import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: [
  ]
})
export class PromesasComponent implements OnInit {

  constructor() {

    //  creamos una funcion para escuchar el resolve de la promesa
    // promesa.then(
    //   () => console.log('Terminó'),
    //   () => console.log('Error')
    // );

    //  llamamos a la función que retorna la promesa
    this.contarTresSeg().then(
      ( mensaje ) => console.log('Terminó', mensaje)
    )
    .catch( error => console.error('Error en la promoesa', error) );
  }

  ngOnInit(): void { }

  //  especificamos el tipo de dato de retorno de una funcion
  contarTresSeg(): Promise<boolean> {
    //  crear tarea cuando un intervalo de tiempo cumple 3 seg
    return new Promise( (resolve, reject) => {

      let contador = 0;

      const intervalo = setInterval( () => {
        contador ++;
        console.log( contador );
        if ( contador === 3 ) {
          // reject('Un error personalizado');
          resolve(true);
          clearInterval( intervalo );
        }
      }, 1000);

    });

  }

}
