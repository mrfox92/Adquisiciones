import { Component, OnInit } from '@angular/core';
import { OfficesService } from '../../services/service.index';
import { Department } from '../../models/Department.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Office } from '../../models/Office.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-office',
  templateUrl: './create-office.component.html',
  styles: [
  ]
})
export class CreateOfficeComponent implements OnInit {

  departments: Department[] = [];
  formulario: FormGroup;

  constructor( public officesService: OfficesService ) { }

  //  obtener lista de todos los departamentos
  ngOnInit(): void {
    this.getDeptos();

    this.formulario = new FormGroup({
      department_id: new FormControl( null, Validators.required ),
      name: new FormControl( null, Validators.required )
    });
  }

  getDeptos() {
    this.officesService.getDeptos().subscribe( (resp: any) => {

      if ( resp.status === 'success' ) {
        this.departments = resp.departments;
      }
    },
    error => console.log( error ));
  }

  // changeDepto( event: any ) {
  //   console.log( event );
  // }

  registerOffice() {

    //  validamos el formulario
    if ( !this.formulario.valid ) {
      return;
    }
    //  creamos un nuevo objeto a partir de nuestro modelo Office
    const office = new Office(
      this.formulario.value.name,
      this.formulario.value.department_id
    );

    this.officesService.createOffice( office ).subscribe( (resp: any) => {

      if ( resp.status === 'success' ) {

        this.formulario.reset();

        Swal.fire({
          title: 'Oficina registrado',
          text: 'Oficina registrado con éxito',
          icon: 'success',
          confirmButtonText: 'OK'
        });

      }
    },
    error => console.log( error ));
  }

}
