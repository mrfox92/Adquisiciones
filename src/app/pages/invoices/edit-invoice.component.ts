import { Component, OnInit } from '@angular/core';
import { Provider } from '../../models/Provider.model';
import { InvoicesService } from '../../services/service.index';
import { ActivatedRoute } from '@angular/router';
import { Invoice } from '../../models/Invoice.model';
import { NgForm } from '@angular/forms';
import { Acquisition } from '../../models/Acquisition.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-invoice',
  templateUrl: './edit-invoice.component.html',
  styles: [
  ]
})
export class EditInvoiceComponent implements OnInit {
  providers: Provider[] = [];
  acquisition: Acquisition;
  invoiceId: number = 0;
  minNum: number = 1;
  invoice: Invoice;
  constructor( public invoicesService: InvoicesService, public route: ActivatedRoute ) { }

  ngOnInit(): void {

    this.invoiceId = Number( this.route.snapshot.paramMap.get('id') );
    this.getProviders();
    this.getInvoice();
    this.getAcquisition();
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


  getInvoice() {
    this.invoicesService.getInvoice( this.invoiceId ).subscribe( (resp: any) => {
      if ( resp.status === 'success' ) {
        this.invoice = resp.invoice;
      }
    },
    error => console.log( error ));
  }

  updateInvoice( form: NgForm ) {

    if ( !form.valid ) {
      console.log('El formulario no es válido: ', form.valid);
      return;
    }
    console.log('El formulario es válido: ', form.valid);
    //  actualizamos el valor del id del usuario adquisiciones al que esta actualmente autenticado
    this.invoice.acquisition_id = this.acquisition.id;
    this.invoicesService.updateInvoice( this.invoice ).subscribe( (resp: any) => {
      if ( resp.status === 'success' ) {
        Swal.fire({
          title: 'Factura Actualizada',
          text: 'La factura ha sido actualizada con éxito',
          icon: 'success',
          confirmButtonText: 'OK'
        });
      }
    },
    error => console.log( error ));
  }

}
