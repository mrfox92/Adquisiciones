import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { Order } from '../../models/Order.model';

@Component({
  selector: 'app-orders-admin',
  templateUrl: './orders-admin.component.html',
  styleUrls: ['./orders-admin.component.css']
})
export class OrdersAdminComponent implements OnInit {

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

  constructor(
    private adminService: AdminService
  ) { }

  ngOnInit(): void {

    this.getOrders();
  }

  getOrders() {
    this.loading = true;
    this.adminService.getOrders().subscribe( (resp: any) => {
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
    });
  }

  prevPage() {

    if ( !this.prevPageUrl ) {
      console.log('No hay página anterior');
      return;
    }

    let search = ( this.busqueda !== '' ) ? true : false;
    this.loading = true;
    this.adminService.getPrevPage( this.prevPageUrl, this.busqueda, search ).subscribe( (resp: any) => {

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
    this.adminService.getNextPage( this.nextPageUrl, this.busqueda, search ).subscribe( (resp: any) => {

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
      // console.log('Busqueda vacia');
      this.busqueda = '';
      this.getOrders();
      return;
    }

    //  creamos la petición
    this.loading = true;
    this.adminService.searchOrder( this.busqueda ).subscribe( (resp: any) => {
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
