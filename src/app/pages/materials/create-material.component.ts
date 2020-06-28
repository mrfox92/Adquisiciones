import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Acquisition } from '../../models/Acquisition.model';
import { MaterialsService } from '../../services/materials/materials.service';
import { Material } from '../../models/material.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-material',
  templateUrl: './create-material.component.html',
  styles: [
  ]
})
export class CreateMaterialComponent implements OnInit {

  formulario: FormGroup;
  private acquisition: Acquisition;

  constructor( public materialsService: MaterialsService ) { }

  ngOnInit(): void {

    this.getAcquisition();

    this.formulario = new FormGroup({
      bar_code: new FormControl( null, Validators.required ),
      name: new FormControl( null, Validators.required ),
      unity_type: new FormControl( null, Validators.required )
    });

  }


  getAcquisition() {

    this.materialsService.getAcquisition().subscribe( (resp: any) => {
      if ( resp.status === 'success' ) {
        this.acquisition = resp.acquisition;
      }
    },
    error => console.log( error ));
  }


  registerMaterial() {

    if ( !this.formulario.valid ) {
      console.log('El formulario no es valido: ', this.formulario.valid);
      return;
    }

    console.log('El formulario es valido: ', this.formulario.valid);
    // console.log( 'Material: ', this.formulario.value );

    const material = new Material(
      this.formulario.value.bar_code,
      this.formulario.value.name,
      this.formulario.value.unity_type,
      this.acquisition.id
    );

    // console.log( 'Material', material );
    this.materialsService.createMaterial( material ).subscribe( (resp: any) => {

      if ( resp.status === 'success' ) {

        this.formulario.reset();
        Swal.fire({
          title: 'Material registrado',
          text: 'El material registrado con éxito',
          icon: 'success',
          confirmButtonText: 'OK'
        });
      }

    },
    error => console.log( error ));
  }

}
