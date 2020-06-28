import { Component, OnInit } from '@angular/core';
import { OfficesService } from '../../services/service.index';
import { Department } from '../../models/Department.model';
import { ActivatedRoute } from '@angular/router';
import { Office } from '../../models/Office.model';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-office',
  templateUrl: './edit-office.component.html',
  styles: [
  ]
})
export class EditOfficeComponent implements OnInit {
  idOffice: number;
  office: Office;
  departments: Department[] = [];
  constructor( public officesService: OfficesService, public route: ActivatedRoute ) { }

  ngOnInit(): void {
    this.idOffice = Number( this.route.snapshot.paramMap.get('id') );
    this.getDeptos();
    this.getOffice();
    // console.log('Id: ', this.idOffice);
  }


  getDeptos() {
    this.officesService.getDeptos().subscribe( (resp: any) => {
      // console.log( resp );
      this.departments = resp.departments;
    },
    error => console.log( error ));
  }

  getOffice() {
    this.officesService.getOffice( this.idOffice ).subscribe( (resp: any) => {

      if ( resp.status === 'success' ) {
        this.office = resp.office;
      }

    },
    error => console.log( error ));
  }


  updateOffice( form: NgForm ) {

    if ( !form.valid ) {
      console.log('Formulario no es válido: ', form.valid);
      return;
    }
    //  formulario valido
    this.officesService.updateOffice( this.office ).subscribe( (resp: any) => {

      if ( resp.status === 'success' ) {

        Swal.fire({
          title: 'Oficina actualizada',
          text: 'La oficina ha sido actualizada con éxito',
          icon: 'success',
          confirmButtonText: 'OK'
        });
      }
    },
    error => console.log( error ));
  }

}
