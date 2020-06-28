import { Component, OnInit } from '@angular/core';
import { MaterialsService } from '../../services/service.index';
import { Material } from '../../models/material.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-materials',
  templateUrl: './materials.component.html',
  styles: [
  ]
})
export class MaterialsComponent implements OnInit {

  materials: Material[] = [];
  busqueda: string = '';
  total: number = 0;
  loading: boolean = false;
  search: boolean = false;
  currentPage: number = 0;
  lastPage: number = 0;
  firstPageUrl: string = null;
  lastPageUrl: string = null;
  nextPageUrl: string = null;
  prevPageUrl: string = null;

  constructor( public materialsService: MaterialsService ) { }

  ngOnInit(): void {
    this.getMaterials();
  }


  getMaterials() {
    this.loading = true;
    this.materialsService.getMaterials().subscribe( (resp: any) => {
      // console.log( resp.materials.data );
      if ( resp.status === 'success' ) {

        this.materials = resp.materials.data;
        this.total = resp.materials.total;
        this.currentPage = resp.materials.current_page;
        this.lastPage = resp.materials.last_page;
        this.firstPageUrl = resp.materials.first_page_url;
        this.lastPageUrl = resp.materials.last_page_url;
        this.nextPageUrl = resp.materials.next_page_url;
        this.prevPageUrl = resp.materials.prev_page_url;
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
    this.materialsService.getPrevPage( this.prevPageUrl, this.busqueda, search ).subscribe( (resp: any) => {

      if ( resp.status === 'success' ) {
        // console.log( resp );
        this.materials = resp.materials.data;
        this.total = resp.materials.total;
        this.currentPage = resp.materials.current_page;
        this.lastPage = resp.materials.last_page;
        this.firstPageUrl = resp.materials.first_page_url;
        this.lastPageUrl = resp.materials.last_page_url;
        this.nextPageUrl = resp.materials.next_page_url;
        this.prevPageUrl = resp.materials.prev_page_url;
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
    this.materialsService.getNextPage( this.nextPageUrl, this.busqueda, search ).subscribe( (resp: any) => {

      if ( resp.status === 'success' ) {
        // console.log( resp );
        this.materials = resp.materials.data;
        this.total = resp.materials.total;
        this.currentPage = resp.materials.current_page;
        this.lastPage = resp.materials.last_page;
        this.firstPageUrl = resp.materials.first_page_url;
        this.lastPageUrl = resp.materials.last_page_url;
        this.nextPageUrl = resp.materials.next_page_url;
        this.prevPageUrl = resp.materials.prev_page_url;
        this.loading = false;
      }
    },
    error => console.log( error ));
  }

  buscarMaterial( busqueda: string ) {
    console.log( busqueda );
    this.busqueda = busqueda;
    if ( this.busqueda.length <= 0 ) {
      console.log('Busqueda vacia');
      this.busqueda = '';
      this.getMaterials();
      return;
    }

    //  creamos la petición
    this.loading = true;
    this.materialsService.searchMaterial( this.busqueda ).subscribe( (resp: any) => {
      // console.log( resp );
      if ( resp.status === 'success' ) {
        this.materials = resp.materials.data;
        this.total = resp.materials.total;
        this.currentPage = resp.materials.current_page;
        this.lastPage = resp.materials.last_page;
        this.firstPageUrl = resp.materials.first_page_url;
        this.lastPageUrl = resp.materials.last_page_url;
        this.nextPageUrl = resp.materials.next_page_url;
        this.prevPageUrl = resp.materials.prev_page_url;
        this.loading = false;
      }

    },
    error => {
      console.log('Ha ocurrido un error');
      this.materials = [];
      this.loading = false;
    });
  }


  deleteMaterial( material: Material ) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: `Esta acción eliminará ${ material.name } de forma permanente`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Eliminar'
    }).then((result) => {

      if (result.value) {
        this.materialsService.deleteMaterial( material ).subscribe( (resp: any) => {

          if ( resp.status === 'success' ) {
            this.getMaterials();
            Swal.fire({
              title: 'Material Eliminado',
              text: 'El material ha sido borrado con éxito',
              icon: 'success'
            });
          }

        },
        error => console.log( error ));
      }

    });
  }

}
