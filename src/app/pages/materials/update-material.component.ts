import { Component, OnInit } from '@angular/core';
import { AcquisitionsService, MaterialsService } from '../../services/service.index';
import { Acquisition } from '../../models/Acquisition.model';
import { ActivatedRoute } from '@angular/router';
import { Material } from '../../models/material.model';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-material',
  templateUrl: './update-material.component.html',
  styles: [
  ]
})
export class UpdateMaterialComponent implements OnInit {

  private acquisition: Acquisition;
  materialId: number;
  material: Material;

  constructor(
    public route: ActivatedRoute,
    public acquisitionService: AcquisitionsService,
    public materialsService: MaterialsService
  ) { }

  ngOnInit(): void {
    this.getAcquisitionUser();
    this.materialId = Number( this.route.snapshot.paramMap.get('id') );
    this.getMaterial();
  }


  getMaterial() {

    this.materialsService.getMaterialDetail( this.materialId ).subscribe( (resp: any) => {
      if ( resp.status === 'success' ) {
        this.material = resp.material;
      }
    },
    error => console.log( error ));
  }


  getAcquisitionUser() {
    this.acquisitionService.getAcquisitionUser().subscribe( (resp: any) => {
      if ( resp.status === 'success' ) {
        this.acquisition = resp.acquisition;
      }
    },
    error => console.log( error ));
  }

  updateMaterial( form: NgForm ) {

    if ( !form.valid ) {
      console.log('Formulario no es válido');
      return;
    }
    console.log( form.value );
    this.material.acquisition_id = this.acquisition.id;
    this.materialsService.updateMaterial( this.material ).subscribe( (resp: any) => {
      console.log( resp );
      if ( resp.status === 'success' ) {

        Swal.fire({
          title: 'Material Actualizado',
          text: 'La información del material ha sido actualizada con éxito',
          icon: 'success',
          confirmButtonText: 'OK'
        });

      }
    },
    error => console.log( error ));
  }

}
