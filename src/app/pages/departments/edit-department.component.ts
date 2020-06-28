import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DepartmentsService } from '../../services/departments/departments.service';
import { Department } from 'src/app/models/Department.model';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-department',
  templateUrl: './edit-department.component.html',
  styles: [
  ]
})
export class EditDepartmentComponent implements OnInit {

  idDepto: number;
  department: Department;

  constructor( public route: ActivatedRoute, public deptosService: DepartmentsService ) { }

  ngOnInit(): void {
    this.idDepto = Number( this.route.snapshot.paramMap.get('id') );
    this.getDepto();
  }

  getDepto() {
    this.deptosService.getDepto( this.idDepto ).subscribe( (resp: any) => {

      if ( resp.status === 'success' ) {
        this.department = resp.department;
        // console.log( this.department );
      }
    },
    error => console.log( error ));
  }

  updateDepto( form: NgForm ) {

    if ( !form.valid ) {
      return;
    }

    //  hacemos la peticion
    this.deptosService.updateDepto( this.department ).subscribe( (resp: any) => {
      if ( resp.status === 'success' ) {
        this.department = resp.department;
        Swal.fire({
          title: 'Departamento actualizado',
          text: 'El departamento ha sido actualizado con éxito',
          icon: 'success',
          confirmButtonText: 'OK'
        });
      }
    },
    error => console.log( error ));
  }

}
