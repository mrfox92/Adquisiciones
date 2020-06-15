import { Component, OnInit, OnDestroy } from '@angular/core';
import { retry, map, filter } from 'rxjs/operators';
import { Observable, Subscriber, Subscription } from 'rxjs';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [
  ]
})
export class RxjsComponent implements OnInit, OnDestroy {

  subscription: Subscription;

  constructor() {

    //  todos los observables a partir de la versión 6 del rxjs tienen un pipe.
    //  un pipe nos permite transformar la data recibida.
    //  dentro de un pipe se pueden utilizar muchos operadores
    //  el operador retry es uno de ellos, el cual intentará volver a intentar retomar el proceso del observable.
    //  opcionalmente recibe un parámetro que corresponde al número de intentos
    //  escuchamos el observable suscribiendonos a el
    //  podemos notificar cuando ya terminó el observable
    //  los observables tienen 3 callbacks; next(string de datos), error, complete

    // this.regresaObservable().pipe(
    //   retry(2)
    // )
    this.subscription = this.regresaObservable()
    .subscribe(
      numero => console.log( 'Subs', numero ),
      error => console.error('Error en el obs', error),
      () => console.log('El observador terminó')
    );

  }

  ngOnInit(): void {
  }

  ngOnDestroy() {

    //  dispararemos esta funcion cada vez que vayamos a dejar una página en particularde nuestro proyecto
    console.log('La página se va a cerrar');
    //  cancelamos la suscripión a nuestro observable
    this.subscription.unsubscribe();
  }


  regresaObservable(): Observable<any> {
    //  creamos un nuevo observable
    return new Observable( (observer: Subscriber<any>) => {

      let contador = 0;

      let intervalo = setInterval( () => {

        contador ++;


        const salida = {
          valor: contador
        };

        //  con la funcion next el observable estará notificando cada vez que la información llegue
        observer.next( salida );

        // if ( contador === 3 ) {
        //   clearInterval( intervalo );
        //   //  terminamos el observable
        //   observer.complete();
        // }

        // if ( contador === 2 ) {
        //   //  notificamos el error, corta la ejecución y termina el observable
        //   // clearInterval( intervalo );
        //   observer.error('Error en contador');
        // }

      }, 1000);

    }).pipe(

      //  en javascript una funcion que no retorne nada siempre retornará un undefined
      map( resp => resp.valor ),
      //  la funcion filter a fuerza tiene que retornar un valor booleano
      filter( ( valor, index ) => {
        // console.log('Filter', valor, index);
        //  dejaremos pasar solo los numeros impares
        if ( (valor % 2) === 1 ) {
          //  impar
          return true;
        } else {
          //  par
          return false;
        }
      })
    );
  }

}
