import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { ProvidersService } from '../../services/service.index';
import { Provider } from '../../models/Provider.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-provider',
  templateUrl: './create-provider.component.html',
  styles: [
  ]
})
export class CreateProviderComponent implements OnInit {

  formulario: FormGroup;

  constructor( public providersService: ProvidersService ) { }

  ngOnInit(): void {

    //  expresion regular rut
    const expressionRegularRut = '^[0-9-k]{9,10}$';
    //  expresion regular email
    // const regexEmail = '^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$';
    // const regexPhone = '^[0-9]{8,12}$';
    //  reglas de validacion
    this.formulario = new FormGroup({
      rut: new FormControl( null, [ Validators.required, Validators.pattern( expressionRegularRut ) ] ),
      name: new FormControl( null, Validators.required ),
      address: new FormControl( null, Validators.required ),
      email: new FormControl( null, [ Validators.required, Validators.email ] ),
      url_web: new FormControl( null ),
      phone: new FormControl( null, [
        Validators.minLength(8),
        Validators.maxLength(12)
      ] ),
    });
  }

  registrarProveedor() {


    if ( !this.formulario.valid ) {
      console.log('El formulario no es válido');
      return;
    }

    console.log('El formulario es válido');
    // console.log( 'Valido: ', this.formulario.valid );
    // console.log( 'Valido: ', this.formulario.value );

    //  inicializamos un objeto de nuestro modelo provider
    const provider = new Provider(
      this.formulario.value.rut,
      this.formulario.value.name,
      this.formulario.value.email,
      this.formulario.value.address
    );
    //  llamamos a nuestro servicio
    // console.log( 'Proveedor: ', provider );
    this.providersService.createProvider( provider ).subscribe( (resp: any) => {
      console.log( resp );

      if ( resp.status === 'success' ) {
        Swal.fire({
          title: 'Proveedor registrado',
          text: 'El proveedor ha sido registrado con éxito',
          icon: 'success',
          confirmButtonText: 'OK'
        });
      }

    },
    error => console.log( error ) );
  }

}
