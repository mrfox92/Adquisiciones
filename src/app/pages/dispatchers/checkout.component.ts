import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DispatchersService } from '../../services/dispatchers/dispatchers.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  deptos: any[] = [];
  offices: any[] = [];
  formulario: FormGroup;
  orden: any = {};

  constructor(
    private dispatchersService: DispatchersService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    public fb: FormBuilder
  ) { }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe( params => this.orden = params.id );

    this.dispatchersService.getDeptos().subscribe( resp => this.deptos = resp );
    this.crearFormulario();
  }

  get invalidResponsible(): boolean {
    return this.formulario.get('responsable').invalid  && this.formulario.get('responsable').touched;
  }

  get invalidDeptos(): boolean {
    return this.formulario.get('deptos').invalid  && this.formulario.get('deptos').touched;
  }

  get invalidOffices(): boolean {
    return this.formulario.get('offices').invalid  && this.formulario.get('offices').touched;
  }

  crearFormulario() {

    this.formulario = this.fb.group({
      responsable: ['', [ Validators.required, Validators.minLength(3) ]],
      deptos: ['', [ Validators.required ]],
      offices: ['', [ Validators.required ]]
    });

  }

  changeDepto( event ) {
    const deptoId =  event.target.value;
    this.dispatchersService.getOffices( deptoId ).subscribe( resp => this.offices = resp );
  }


  guardar() {

    if ( this.formulario.invalid ) {
      console.log('Formulario inválido!');
      return;
    }

    console.log('Formulario válido!');

    //  orden
    const processingOrder = {
      id: Number( this.orden ),
      depto_id: Number( this.formulario.value.deptos ),
      office_id: Number( this.formulario.value.offices ),
      responsable: this.formulario.value.responsable
    };

    this.dispatchersService.processingCartItems( processingOrder ).subscribe( resp => {

      Swal.fire({
        title: 'Orden Creada!',
        text: `Orden N° ${ processingOrder.id } ha sido creada con éxito`,
        icon: 'success',
        timer: 1000
      });

      //  redireccionar al inventario
      this.router.navigate(['/inventario']);

    });
  }

}
