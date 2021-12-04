import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../../services/service.index';
import { Order } from '../../models/Order.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styles: [
  ]
})
export class OrdersComponent implements OnInit {
  orders: Order[] = [];
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

  constructor( public ordersService: OrdersService ) { }

  ngOnInit(): void {
    this.getOrders();
  }


  getOrders() {
    this.loading = true;
    this.ordersService.getOrders().subscribe( (resp: any) => {

      // console.log( resp.orders.data );

      if ( resp.status === 'success' ) {
        this.orders = resp.orders.data;
        this.total = resp.orders.total;
        this.currentPage = resp.orders.current_page;
        this.lastPage = resp.orders.last_page;
        this.firstPageUrl = resp.orders.first_page_url;
        this.lastPageUrl = resp.orders.last_page_url;
        this.nextPageUrl = resp.orders.next_page_url;
        this.prevPageUrl = resp.orders.prev_page_url;
        this.loading = false;
      }
    },
    error => console.log( error ));
  }

  changeStatus( order: Order ) {
    // console.log('Cambio estado orden: ', order.status);

    // console.log( order );
    this.ordersService.changeStatusOrder( order ).subscribe( resp => {

      this.getOrders();

      Swal.fire({
        title: 'Orden actualizada',
        text: 'La orden ha sido actualizada con éxtio',
        icon: 'success',
        confirmButtonText: 'OK'
      });
    });

  }

  prevPage() {

    if ( !this.prevPageUrl ) {
      console.log('No hay página anterior');
      return;
    }

    let search = ( this.busqueda !== '' ) ? true : false;
    this.loading = true;
    this.ordersService.getPrevPage( this.prevPageUrl, this.busqueda, search ).subscribe( (resp: any) => {

      if ( resp.status === 'success' ) {
        // console.log( resp );
        this.orders = resp.orders.data;
        this.total = resp.orders.total;
        this.currentPage = resp.orders.current_page;
        this.lastPage = resp.orders.last_page;
        this.firstPageUrl = resp.orders.first_page_url;
        this.lastPageUrl = resp.orders.last_page_url;
        this.nextPageUrl = resp.orders.next_page_url;
        this.prevPageUrl = resp.orders.prev_page_url;
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

    //  evaluamos si viene una busqueda válida
    let search = ( this.busqueda !== '' ) ? true : false;
    this.loading = true;
    this.ordersService.getNextPage( this.nextPageUrl, this.busqueda, search ).subscribe( (resp: any) => {

      if ( resp.status === 'success' ) {
        // console.log( resp );
        console.log( resp.orders.data );
        this.orders = resp.orders.data;
        this.total = resp.orders.total;
        this.currentPage = resp.orders.current_page;
        this.lastPage = resp.orders.last_page;
        this.firstPageUrl = resp.orders.first_page_url;
        this.lastPageUrl = resp.orders.last_page_url;
        this.nextPageUrl = resp.orders.next_page_url;
        this.prevPageUrl = resp.orders.prev_page_url;
        this.loading = false;
      }
    },
    error => console.log( error ));
  }

  buscarOrden( busqueda: string ) {
    // console.log( busqueda );
    this.busqueda = busqueda;
    if ( this.busqueda.length <= 0 ) {
      console.log('Busqueda vacia');
      this.busqueda = '';
      this.getOrders();
      return;
    }

    //  creamos la petición
    this.loading = true;
    this.ordersService.searchOrder( this.busqueda ).subscribe( (resp: any) => {
      // console.log( resp );
      if ( resp.status === 'success' ) {
        this.orders = resp.orders.data;
        this.total = resp.orders.total;
        this.currentPage = resp.orders.current_page;
        this.lastPage = resp.orders.last_page;
        this.firstPageUrl = resp.orders.first_page_url;
        this.lastPageUrl = resp.orders.last_page_url;
        this.nextPageUrl = resp.orders.next_page_url;
        this.prevPageUrl = resp.orders.prev_page_url;
        this.loading = false;
      }
    },
    error => {
      console.log( error );
      this.orders = [];
      this.loading = false;
    });
  }

}
