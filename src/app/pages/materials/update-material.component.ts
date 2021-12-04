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
  imageUpload: File;
  tempImage: string;

  constructor(
    public route: ActivatedRoute,
    public acquisitionService: AcquisitionsService,
    public materialsService: MaterialsService
  ) { }

  ngOnInit(): void {
    this.getAcquisitionUser();
    this.materialId = Number( this.route.snapshot.paramMap.get('id') );
    console.log('Material ID: ' + this.materialId);
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
    error => {
      console.log( error );
      Swal.fire({
        title: 'Error',
        text: 'El usuario autenticado no tiene los privilegios suficiente',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    });
  }

  updateMaterial( form: NgForm ) {

    if ( !form.valid ) {
      console.log('Formulario no es válido');
      return;
    }
    console.log( form.value );
    //  corregir excepcion si no encuentra this.acquisition.id

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
    error => {
      Swal.fire({
        title: 'Error',
        text: 'No se ha podido actualizar',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    });
  }


  seleccionarImage( image: File ) {

    if ( !image ) {
      this.imageUpload = null;
      return;
    }

    //  validamos que el archivo a subir sea una imagem
    if ( image.type.indexOf('image') < 0 ) {
      Swal.fire({
        title: 'Ups!',
        text: 'El archivo seleccionado no es una imagen',
        icon: 'error',
        confirmButtonText: 'OK'
      });
      this.imageUpload = null;
      return;
    }

    //  cargar preview imagen con vanilla javascript
    const reader = new FileReader();
    const urlImageTemp = reader.readAsDataURL( image );
    //  el resultado muestra la imagen en base 64
    reader.onloadend = () => {
      this.tempImage = String(reader.result);
    };

    //  inicializamos la el archivo a subir
    this.imageUpload = image;
  }

  cambiarImagen() {

    //  llamamos a nuestro servicio para subir la imagen
    // this.userService.updateImage( this.imageUpload, this.user.id );
    this.acquisitionService.updateImage( this.imageUpload, this.material.id );
    //  luego de subida la imagen vaciamos el archivo del formulario
  }

}
