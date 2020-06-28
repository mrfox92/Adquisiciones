import { Component, OnInit } from '@angular/core';
import { Office } from '../../models/Office.model';
import { OfficesService } from '../../services/service.index';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-offices',
  templateUrl: './offices.component.html',
  styles: [
  ]
})
export class OfficesComponent implements OnInit {

  offices: Office[] = [];
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

  constructor( public officesService: OfficesService ) { }

  ngOnInit(): void {

    this.getOffices();
  }

  getOffices() {

    this.loading = true;
    this.officesService.getOffices().subscribe( (resp: any) => {

      if ( resp.status === 'success' ) {
        this.offices = resp.offices.data;
        //  inicializamos nuestras variables de la paginación
        this.total = resp.offices.total;
        this.currentPage = resp.offices.current_page;
        this.lastPage = resp.offices.last_page;
        this.firstPageUrl = resp.offices.first_page_url;
        this.lastPageUrl = resp.offices.last_page_url;
        this.nextPageUrl = resp.offices.next_page_url;
        this.prevPageUrl = resp.offices.prev_page_url;
        this.loading = false;
      }
    },
    error => console.log( error ) );
  }


  prevPage() {
    if ( !this.prevPageUrl ) {
      console.log('No hay página anterior');
      return;
    }

    console.log('Pagina Anterior');
    let search = ( this.busqueda !== '' ) ? true : false;
    this.loading = true;
    this.officesService.getPrevPage( this.prevPageUrl, this.busqueda, search ).subscribe( (resp: any) => {

      if ( resp.status === 'success' ) {
        // console.log( resp );
        this.offices = resp.offices.data;
        this.total = resp.offices.total;
        this.currentPage = resp.offices.current_page;
        this.lastPage = resp.offices.last_page;
        this.firstPageUrl = resp.offices.first_page_url;
        this.lastPageUrl = resp.offices.last_page_url;
        this.nextPageUrl = resp.offices.next_page_url;
        this.prevPageUrl = resp.offices.prev_page_url;
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
    this.officesService.getNextPage( this.nextPageUrl, this.busqueda, search ).subscribe( (resp: any) => {

      if ( resp.status === 'success' ) {
        // console.log( resp );
        this.offices = resp.offices.data;
        this.total = resp.offices.total;
        this.currentPage = resp.offices.current_page;
        this.lastPage = resp.offices.last_page;
        this.firstPageUrl = resp.offices.first_page_url;
        this.lastPageUrl = resp.offices.last_page_url;
        this.nextPageUrl = resp.offices.next_page_url;
        this.prevPageUrl = resp.offices.prev_page_url;
        this.loading = false;
      }
    },
    error => console.log( error ));
  }

  buscarProveedor( busqueda: string ) {
    // console.log( busqueda );
    this.busqueda = busqueda;
    if ( this.busqueda.length <= 0 ) {
      console.log('Busqueda vacia');
      this.busqueda = '';
      this.getOffices();
      return;
    }

    //  creamos la petición
    this.loading = true;
    this.officesService.searchOffice( this.busqueda ).subscribe( (resp: any) => {
      // console.log( resp );
      this.offices = resp.offices.data;
      this.total = resp.offices.total;
      this.currentPage = resp.offices.current_page;
      this.lastPage = resp.offices.last_page;
      this.firstPageUrl = resp.offices.first_page_url;
      this.lastPageUrl = resp.offices.last_page_url;
      this.nextPageUrl = resp.offices.next_page_url;
      this.prevPageUrl = resp.offices.prev_page_url;
      this.loading = false;
    },
    error => console.log( error ));
  }

  deleteOffice( office: Office ) {
    // console.log( office );

    Swal.fire({
      title: '¿Estás seguro?',
      text: `Eliminarás la oficina ${ office.name } de forma permanente`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Eliminar'
    }).then((result) => {
      if (result.value) {
        this.officesService.deleteOffice( office.id ).subscribe( (resp: any) => {

          if ( resp.status === 'success' ) {
            this.getOffices();
            Swal.fire({
              title: 'Oficina eliminada',
              text: 'La oficina ha sido eliminada con éxito',
              icon: 'success'
            });
          }

        },
        error => console.log( error ));
      }
    });
  }


}
