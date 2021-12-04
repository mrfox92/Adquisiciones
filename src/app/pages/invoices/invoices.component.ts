import { Component, OnInit } from '@angular/core';
import { InvoicesService } from '../../services/service.index';
import { Invoice } from '../../models/Invoice.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styles: [
  ]
})
export class InvoicesComponent implements OnInit {

  invoices: Invoice[] = [];
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

  constructor( public invoicesService: InvoicesService ) { }

  ngOnInit(): void {
    this.getInvoices();
  }


  getInvoices() {

    this.loading = true;
    this.invoicesService.getInvoices().subscribe( (resp: any) => {

      console.log( resp.invoices.data );

      if ( resp.status === 'success' ) {
        this.invoices = resp.invoices.data;
        this.total = resp.invoices.total;
        this.currentPage = resp.invoices.current_page;
        this.lastPage = resp.invoices.last_page;
        this.firstPageUrl = resp.invoices.first_page_url;
        this.lastPageUrl = resp.invoices.last_page_url;
        this.nextPageUrl = resp.invoices.next_page_url;
        this.prevPageUrl = resp.invoices.prev_page_url;
        this.loading = false;

      }
    },
    error => {
      if ( error.error.code === 404 ) {

        console.log( 'Dentro de error' );
        this.invoices = error.error.invoices.data;
        this.total = error.error.invoices.total;
        this.currentPage = error.error.invoices.current_page;
        this.lastPage = error.error.invoices.last_page;
        this.firstPageUrl = error.error.invoices.first_page_url;
        this.lastPageUrl = error.error.invoices.last_page_url;
        this.nextPageUrl = error.error.invoices.next_page_url;
        this.prevPageUrl = error.error.invoices.prev_page_url;
        this.loading = false;

      }
    });
  }


  prevPage() {
    if ( !this.prevPageUrl ) {
      console.log('No hay página anterior');
      return;
    }

    // console.log('Pagina Anterior');
    let search = ( this.busqueda !== '' ) ? true : false;
    this.loading = true;
    this.invoicesService.getPrevPage( this.prevPageUrl, this.busqueda, search ).subscribe( (resp: any) => {

      if ( resp.status === 'success' ) {
        // console.log( resp );
        this.invoices = resp.invoices.data;
        this.total = resp.invoices.total;
        this.currentPage = resp.invoices.current_page;
        this.lastPage = resp.invoices.last_page;
        this.firstPageUrl = resp.invoices.first_page_url;
        this.lastPageUrl = resp.invoices.last_page_url;
        this.nextPageUrl = resp.invoices.next_page_url;
        this.prevPageUrl = resp.invoices.prev_page_url;
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

    // console.log('Página siguiente');
    //  evaluamos si viene una busqueda válida
    let search = ( this.busqueda !== '' ) ? true : false;
    this.loading = true;
    this.invoicesService.getNextPage( this.nextPageUrl, this.busqueda, search ).subscribe( (resp: any) => {

      if ( resp.status === 'success' ) {
        // console.log( resp );
        this.invoices = resp.invoices.data;
        this.total = resp.invoices.total;
        this.currentPage = resp.invoices.current_page;
        this.lastPage = resp.invoices.last_page;
        this.firstPageUrl = resp.invoices.first_page_url;
        this.lastPageUrl = resp.invoices.last_page_url;
        this.nextPageUrl = resp.invoices.next_page_url;
        this.prevPageUrl = resp.invoices.prev_page_url;
        this.loading = false;
      }
    },
    error => console.log( error ));
  }

  buscarFactura( busqueda: string ) {
    // console.log( busqueda );
    this.busqueda = busqueda;
    if ( this.busqueda.length <= 0 ) {
      console.log('Busqueda vacia');
      this.busqueda = '';
      this.getInvoices();
      return;
    }

    //  creamos la petición
    this.loading = true;
    this.invoicesService.searchInvoice( this.busqueda ).subscribe( (resp: any) => {
      // console.log( resp );
      if ( resp.status === 'success' ) {
        this.invoices = resp.invoices.data;
        this.total = resp.invoices.total;
        this.currentPage = resp.invoices.current_page;
        this.lastPage = resp.invoices.last_page;
        this.firstPageUrl = resp.invoices.first_page_url;
        this.lastPageUrl = resp.invoices.last_page_url;
        this.nextPageUrl = resp.invoices.next_page_url;
        this.prevPageUrl = resp.invoices.prev_page_url;
        this.loading = false;
      }
    },
    error => console.log( error ));
  }


  deleteInvoice( invoice: Invoice ) {


    Swal.fire({
      title: '¿Estás seguro?',
      text: `Eliminarás la factura N° ${ invoice.invoice_number } de forma permanente`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Eliminar'
    }).then((result) => {

      if (result.value) {

        this.invoicesService.deleteInvoice( invoice.id ).subscribe( (resp: any) => {

          if ( resp.status === 'success' && resp.status === 200 ) {

            this.getInvoices();

            Swal.fire({
              title: 'Factura eliminada',
              text: 'La factura ha sido eliminada con éxito',
              icon: 'success',
              confirmButtonText: 'OK'
            });

          }

        });
      }
    });

  }

}
