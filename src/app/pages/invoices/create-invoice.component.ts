import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Provider } from '../../models/Provider.model';
import { InvoicesService } from '../../services/service.index';
import { Acquisition } from '../../models/Acquisition.model';
import { Invoice } from '../../models/Invoice.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-invoice',
  templateUrl: './create-invoice.component.html',
  styles: [
  ]
})
export class CreateInvoiceComponent implements OnInit {

  private acquisition: Acquisition;
  formulario: FormGroup;
  providers: Provider[] = [];

  constructor( public invoicesService: InvoicesService ) { }

  ngOnInit(): void {

    this.getProviders();
    this.getAcquisition();
    this.formulario = new FormGroup({
      provider_id: new FormControl( null, Validators.required ),
      invoice_number: new FormControl( null, Validators.required ),
      emission_date: new FormControl( null, Validators.required ),
      expiration_date: new FormControl( null, Validators.required ),
    });
  }


  getAcquisition() {
    this.invoicesService.getAcquisition().subscribe( (resp: any) => {
      if ( resp.status  === 'success' ) {
        this.acquisition = resp.acquisition;
      }
    },
    error => console.log( error ));
  }

  getProviders() {
    this.invoicesService.getProviders().subscribe( (resp: any) => {

      if ( resp.status === 'success' ) {
        this.providers = resp.providers;
      }
    },
    error => console.log( error ));
  }

  registerInvoice() {

    if ( !this.formulario.valid ) {
      console.log('El formulario no es válido: ', this.formulario.valid);
      return;
    }

    console.log('El formulario es válido: ', this.formulario.valid);
    //  realizamos la peticion
    const invoice = new Invoice(
      this.formulario.value.invoice_number,
      this.formulario.value.provider_id,
      this.acquisition.id,
      null,
      null,
      this.formulario.value.emission_date,
      this.formulario.value.expiration_date,
    );

    console.log( invoice );

    // console.log( 'Factura: ', invoice );
    //  nota: evaluar en el servicio si el número de factura ya existe en BD para ese proveedor
    this.invoicesService.createInvoice( invoice ).subscribe( (resp: any) => {

      if ( resp.status === 'success' ) {
        //  reset formulario
        this.formulario.reset();
        //  enviamos notificacion
        Swal.fire({
          title: 'Factura registrado',
          text: 'Factura registrado con éxito',
          icon: 'success',
          confirmButtonText: 'OK'
        });
      }
    },
    error => console.log( error ));
  }

}
