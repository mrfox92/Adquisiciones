import { Component, OnInit } from '@angular/core';
import { AcquisitionsService } from '../../services/acquisitions/acquisitions.service';
import { Material } from '../../models/material.model';
import Swal from 'sweetalert2';
import { MaterialsService } from '../../services/materials/materials.service';

@Component({
  selector: 'app-outofstock',
  templateUrl: './outofstock.component.html',
  styles: [
  ]
})
export class OutofstockComponent implements OnInit {

  materials: Material[] = [];
  total: number = 0;
  loading: boolean = false;
  currentPage: number = 0;
  lastPage: number = 0;
  firstPageUrl: string = null;
  lastPageUrl: string = null;
  nextPageUrl: string = null;
  prevPageUrl: string = null;

  constructor(
    private acquisitionsService: AcquisitionsService,
    private materialsService: MaterialsService
  ) { }

  ngOnInit(): void {

    this.getOutOfStock();
  }


  getOutOfStock() {

    this.loading = true;

    this.acquisitionsService.getOutOfStock().subscribe( (resp: any) => {

      if ( resp.status === 'success' ) {

        this.materials = resp.materials;
        this.loading = false;
      }
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
            this.getOutOfStock();
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
