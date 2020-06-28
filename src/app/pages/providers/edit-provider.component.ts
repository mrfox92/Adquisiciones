import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProvidersService } from '../../services/service.index';
import { FormGroup, NgForm } from '@angular/forms';
import { Provider } from '../../models/Provider.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-provider',
  templateUrl: './edit-provider.component.html',
  styles: [
  ]
})
export class EditProviderComponent implements OnInit {

  idProvider: number;
  formulario: FormGroup;
  provider: Provider;
  constructor( public route: ActivatedRoute, public providersService: ProvidersService ) {
  }

  ngOnInit(): void {

    //  obtenemos el id de la url
    this.idProvider =  Number( this.route.snapshot.paramMap.get('id') );
    console.log( 'Id proveedor: ', this.idProvider );
    //  llamamos al servicio para traer la data del proveedor
    this.getProvider();
  }

  getProvider() {

    this.providersService.getProvider( this.idProvider ).subscribe( (resp: any) => {
      console.log( resp );
      if ( resp.status === 'success' ) {
        this.provider = resp.provider;
        console.log( 'Proveedor: ', this.provider );
      }
    },
    error => console.log( error ));
  }

  actualizarProveedor( form: NgForm ) {

    if ( !form.valid ) {
      console.log( 'Formulario no es válido: ', form.valid );
      return;
    }

    this.providersService.updateProvider( this.provider ).subscribe( (resp: any) => {

      if ( resp.status === 'success' ) {

        this.provider = resp.provider_updated;
        Swal.fire({
          title: 'Proveedor actualizado',
          text: 'El proveedor ha sido actualizado con éxito',
          icon: 'success',
          confirmButtonText: 'OK'
        });
      }
    },
    error => console.log( error ));

  }

}
