import { Component, OnInit } from '@angular/core';
import { DepartmentsService } from '../../services/service.index';
import { Department } from 'src/app/models/Department.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-departments',
  templateUrl: './departments.component.html',
  styles: [
  ]
})
export class DepartmentsComponent implements OnInit {

  departments: Department[] = [];
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

  constructor( public deptosService: DepartmentsService ) { }

  ngOnInit(): void {
    this.getDeptos();
  }

  getDeptos() {

    this.loading = true;
    this.deptosService.getDeptos().subscribe( (resp: any) => {

      if ( resp.status === 'success' ) {

        console.log( resp.departments.data );

        this.departments = resp.departments.data;
        //  inicializamos nuestras variables de la paginación
        this.total = resp.departments.total;
        this.currentPage = resp.departments.current_page;
        this.lastPage = resp.departments.last_page;
        this.firstPageUrl = resp.departments.first_page_url;
        this.lastPageUrl = resp.departments.last_page_url;
        this.nextPageUrl = resp.departments.next_page_url;
        this.prevPageUrl = resp.departments.prev_page_url;
        this.loading = false;
      }

    },
    error => console.log( error ));
  }

  prevPage() {
    if ( !this.prevPageUrl ) {
      console.log('No hay página anterior');
      return;
    }

    // console.log('Pagina Anterior');
    let search = ( this.busqueda !== '' ) ? true : false;
    this.loading = true;
    this.deptosService.getPrevPage( this.prevPageUrl, this.busqueda, search ).subscribe( (resp: any) => {

      if ( resp.status === 'success' ) {
        this.departments = resp.departments.data;
        //  inicializamos nuestras variables de la paginación
        this.total = resp.departments.total;
        this.currentPage = resp.departments.current_page;
        this.lastPage = resp.departments.last_page;
        this.firstPageUrl = resp.departments.first_page_url;
        this.lastPageUrl = resp.departments.last_page_url;
        this.nextPageUrl = resp.departments.next_page_url;
        this.prevPageUrl = resp.departments.prev_page_url;
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
    this.deptosService.getNextPage( this.nextPageUrl, this.busqueda, search ).subscribe( (resp: any) => {

      if ( resp.status === 'success' ) {
        // console.log( resp );
        this.departments = resp.departments.data;
        //  inicializamos nuestras variables de la paginación
        this.total = resp.departments.total;
        this.currentPage = resp.departments.current_page;
        this.lastPage = resp.departments.last_page;
        this.firstPageUrl = resp.departments.first_page_url;
        this.lastPageUrl = resp.departments.last_page_url;
        this.nextPageUrl = resp.departments.next_page_url;
        this.prevPageUrl = resp.departments.prev_page_url;
        this.loading = false;
      }
    },
    error => console.log( error ));
  }

  buscarDepto( busqueda: string ) {
    // console.log( busqueda );
    this.busqueda = busqueda;
    if ( this.busqueda.length <= 0 ) {
      console.log('Busqueda vacia');
      this.busqueda = '';
      this.getDeptos();
      return;
    }

    //  creamos la petición
    this.loading = true;
    this.deptosService.searchDepto( this.busqueda ).subscribe( (resp: any) => {
      // console.log( resp );
      if ( resp.status === 'success' ) {
        this.departments = resp.departments.data;
        //  inicializamos nuestras variables de la paginación
        this.total = resp.departments.total;
        this.currentPage = resp.departments.current_page;
        this.lastPage = resp.departments.last_page;
        this.firstPageUrl = resp.departments.first_page_url;
        this.lastPageUrl = resp.departments.last_page_url;
        this.nextPageUrl = resp.departments.next_page_url;
        this.prevPageUrl = resp.departments.prev_page_url;
        this.loading = false;
      }
    },
    error => {
      console.log( error );
      console.log('Ha ocurrido un error');
      this.departments = [];
      this.loading = false;
    });
  }


  deleteDepto( department: Department ) {
    // console.log( department );

    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Eliminarás este departamento de forma permanente',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Eliminar'
    }).then((result) => {

      if (result.value) {
        //  eliminar depto
        this.deptosService.deleteDepto( department.id ).subscribe( (resp: any) => {

          if ( resp.status === 'success' ) {

            this.getDeptos();

            Swal.fire({
              title: 'Departamento Eliminado',
              text: 'Has eliminado el departamento con éxito',
              icon: 'success'
            });

          }

        },
        error => console.log( error ));
      }

    });
  }


}
