import { Component, OnInit } from '@angular/core';
import { ProvidersService } from '../../services/service.index';
import { Provider } from 'src/app/models/Provider.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-providers',
  templateUrl: './providers.component.html',
  styles: [
  ]
})
export class ProvidersComponent implements OnInit {

  providers: Provider[] = [];
  busqueda: string = '';
  search: boolean = false;
  loading: boolean = false;
  total: number = 0;
  currentPage: number = 0;
  lastPage: number = 0;
  firstPageUrl: string = null;
  lastPageUrl: string = null;
  nextPageUrl: string = null;
  prevPageUrl: string = null;

  constructor( public providersService: ProvidersService ) { }

  ngOnInit(): void {
    this.getProviders();
  }

  getProviders() {

    this.loading = true;
    this.providersService.getProviders().subscribe( (resp: any) => {
      console.log( resp );
      if ( resp.status === 'success' ) {
        this.providers = resp.providers.data;
        this.loading = false;
        //  inicializamos nuestras variables de la paginación
        this.total = resp.providers.total;
        this.currentPage = resp.providers.current_page;
        this.lastPage = resp.providers.last_page;
        this.firstPageUrl = resp.providers.first_page_url;
        this.lastPageUrl = resp.providers.last_page_url;
        this.nextPageUrl = resp.providers.next_page_url;
        this.prevPageUrl = resp.providers.prev_page_url;
      }
    },
    error => console.log( error ));

  }

  prevPage() {

    if ( !this.prevPageUrl ) {
      console.log('No hay página anterior');
      return;
    }

    console.log('Pagina Anterior');
    let search = ( this.busqueda !== '' ) ? true : false;
    this.loading = true;
    this.providersService.getPrevPage( this.prevPageUrl, this.busqueda, search ).subscribe( (resp: any) => {

      if ( resp.status === 'success' ) {
        // console.log( resp );
        this.providers = resp.providers.data;
        this.total = resp.providers.total;
        this.currentPage = resp.providers.current_page;
        this.lastPage = resp.providers.last_page;
        this.firstPageUrl = resp.providers.first_page_url;
        this.lastPageUrl = resp.providers.last_page_url;
        this.nextPageUrl = resp.providers.next_page_url;
        this.prevPageUrl = resp.providers.prev_page_url;
        this.loading = false;
      }

    },
    error => console.log( error ));

  }

  nextPage() {

    if ( !this.nextPageUrl ) {
      console.log('No hay página siguiente');
      return;
    }

    console.log('Página siguiente');
    //  evaluamos si viene una busqueda válida
    let search = ( this.busqueda !== '' ) ? true : false;
    this.loading = true;
    this.providersService.getNextPage( this.nextPageUrl, this.busqueda, search ).subscribe( (resp: any) => {

      if ( resp.status === 'success' ) {
        // console.log( resp );
        this.providers = resp.providers.data;
        this.total = resp.providers.total;
        this.currentPage = resp.providers.current_page;
        this.lastPage = resp.providers.last_page;
        this.firstPageUrl = resp.providers.first_page_url;
        this.lastPageUrl = resp.providers.last_page_url;
        this.nextPageUrl = resp.providers.next_page_url;
        this.prevPageUrl = resp.providers.prev_page_url;
        this.loading = false;
      }
    },
    error => console.log( error ));
  }

  buscarProveedor( busqueda: string ) {
    console.log( busqueda );
    this.busqueda = busqueda;
    if ( this.busqueda.length <= 0 ) {
      console.log('Busqueda vacia');
      this.busqueda = '';
      this.getProviders();
      return;
    }

    //  creamos la petición
    this.loading = true;
    this.providersService.searchProvider( this.busqueda ).subscribe( (resp: any) => {
      // console.log( resp );
      this.providers = resp.providers.data;
      this.total = resp.providers.total;
      this.currentPage = resp.providers.current_page;
      this.lastPage = resp.providers.last_page;
      this.firstPageUrl = resp.providers.first_page_url;
      this.lastPageUrl = resp.providers.last_page_url;
      this.nextPageUrl = resp.providers.next_page_url;
      this.prevPageUrl = resp.providers.prev_page_url;
      this.loading = false;
    },
    error => console.log( error ));
  }


  deleteProvider( provider: Provider ) {
    console.log('Eliminar: ', provider);

    Swal.fire({
      title: '¿Estas seguro?',
      text: 'Eliminarás este registro de forma permanente',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Eliminar'
    }).then((result) => {

      if (result.value) {

        //  llamamos a nuestro servicio
        this.providersService.deleteProvider( provider.id ).subscribe( (resp: any) => {
          if ( resp.status === 'success' ) {
            //  recargamos el array de proveedores
            this.getProviders();
            //  mostramos mensaje
            Swal.fire({
              title: 'Proveedor Eliminado',
              text: 'El proveedor ha sido eliminado con éxito',
              icon: 'success',
              confirmButtonText: 'OK'
            });
          }
        },
        error => console.log( error ));
      }
    });

}


}
