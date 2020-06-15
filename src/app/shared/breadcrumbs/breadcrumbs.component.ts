import { Component, OnInit } from '@angular/core';
import { Router, ActivationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Title, Meta, MetaDefinition } from '@angular/platform-browser';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: [
  ]
})
export class BreadcrumbsComponent implements OnInit {

  titulo: string;

  //  inyectamos servicio para modificar el nombre de la página en la que estemos,
  //  así ponerle el mismo titulo de la página a la pestaña del navegador
  //  inyectamos un servicio de angular para cambiar las metatags de nuestra aplicacion
  constructor( private router: Router, private title: Title, private meta: Meta ) {

    this.getDataRoute().subscribe( data => {
      // console.log( data );
      //  inicializamos nuestra propiedad titulo
      this.titulo = data.titulo;
      this.title.setTitle( this.titulo );

      //  cambiamos los metatags
      const metaTag: MetaDefinition = {
        name: 'description',
        content: this.titulo
      };

      //  actualizamos los tags en el html
      this.meta.updateTag( metaTag );

    });
  }

  ngOnInit(): void {
  }

  getDataRoute() {

    return this.router.events.pipe(
      //  si el evento es una instancia de ActivationEnd entonces dejará pasar ese flujo
      filter( event => event instanceof ActivationEnd ),
      filter( (event: ActivationEnd) => event.snapshot.firstChild === null ),
      map( (event: ActivationEnd) => event.snapshot.data)
    );

  }

}
