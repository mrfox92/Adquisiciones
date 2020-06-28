import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Department } from 'src/app/models/Department.model';
import { DepartmentsService } from '../../services/service.index';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-department',
  templateUrl: './create-department.component.html',
  styles: [
  ]
})
export class CreateDepartmentComponent implements OnInit {

  formulario: FormGroup;

  constructor( public deptosService: DepartmentsService ) { }

  ngOnInit(): void {

    this.formulario = new FormGroup({
      name: new FormControl( null, Validators.required )
    });
  }

  registrarDepto() {

    if ( !this.formulario.valid ) {
      console.log('Formulario no es válido');
      return;
    }

    //  creamos un nuevo objeto del modelo departamento
    const department = new Department(
      this.formulario.value.name
    );

    this.deptosService.createDepto( department ).subscribe( (resp: any) => {

      if( resp.status === 'success' ) {
        this.formulario.reset();
        Swal.fire({
          title: 'Departamento registrado',
          text: 'El departamento ha sido registrado con éxito',
          icon: 'success',
          confirmButtonText: 'OK'
        });
      }
    },
    error => console.log( error ));
  }

}
