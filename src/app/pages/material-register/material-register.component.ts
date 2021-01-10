import { Component, OnInit } from '@angular/core';
import { FormArray, FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { Material } from '../../models/material.model';
import { MaterialsService } from '../../services/materials/materials.service';
import { CompleterService, CompleterData } from 'ng2-completer';
import { NgWizardConfig, THEME, NgWizardService, StepChangedArgs } from 'ng-wizard';
import { InvoicesService } from '../../services/invoices/invoices.service';
import { Provider } from '../../models/Provider.model';
import { Invoice } from '../../models/Invoice.model';
import { Acquisition } from '../../models/Acquisition.model';
import { AcquisitionsService } from '../../services/service.index';
import Swal from 'sweetalert2';

//  declaramos variable para uso de jquery
declare var $: any;

@Component({
  selector: 'app-material-register',
  templateUrl: './material-register.component.html',
  styles: [
  ]
})
export class MaterialRegisterComponent implements OnInit {
  public puedeSeguir: boolean = false;
  public acquisition: Acquisition;
  public providers: Provider[] = [];
  public newInvoice: Invoice = new Invoice(null, null, null );
  public invoices: Invoice[] = [];
  public invoice: Invoice;
  public provider: Provider;
  public formulario: FormArray;
  public invoiceId: number = 0;
  protected materials: Material[] = [];
  protected searchStr: string;
  protected captain: string;
  public dataService: CompleterData;
  protected searchData: Material[] = [];

  //  configuracion ng wizard

  config: NgWizardConfig = {
    selected: 0,
    lang: { next: 'Siguiente', previous: 'Anterior' },
    theme: THEME.dots,
    toolbarSettings: {
      showNextButton: true,
      toolbarExtraButtons: [
        { text: 'Finalizar', class: 'btn btn-info', event: () => { alert('Finished!!!'); } }
      ]
    }
  };

  constructor(
    public materialsService: MaterialsService,
    public invoicesService: InvoicesService,
    private ngWizardService: NgWizardService,
    private completerService: CompleterService,
    private acquisitionService: AcquisitionsService
  ) {}

  ngOnInit(): void {

    this.invoiceId = 123;

    //  inicializamos nuestro formulario
    this.formulario = new FormArray([
      new FormGroup({
        material: new FormControl( null ),
        // invoice: new FormControl({ value: this.invoiceId, disabled: true }),
        // invoice: new FormControl(this.invoiceId),
        unity_cost: new FormControl(null),
        quantity: new FormControl( null ),
        total_cost: new FormControl( null ),
        iva: new FormControl( null )
      })
    ]);


    this.cargarMateriales();
    this.cargarProveedores();
    this.getAcquisitionUser();
  }

  seleccionarProveedor( form ) {
    console.log('Proveedor seleccionado: ', form);
    this.provider = form.provider;
    console.log('Proveedor seleccionado: ', this.provider.id);

    this.invoicesService.getInvoicesProvider( this.provider.id ).subscribe( (resp: any) => {
      if ( resp.status === 'success' ){
        this.invoices = resp.invoices;
        console.log('Facturas proveedor: ', this.invoices);
        this.ngWizardService.next();
      }
    });
  }

  cargarFacturas() {
    this.invoicesService.getInvoicesProvider( this.provider.id ).subscribe( (resp: any) => {
      if ( resp.status === 'success' ){
        this.invoices = resp.invoices;
        console.log('Facturas proveedor: ', this.invoices);
      }
    });
  }

  seleccionarFactura( form ) {
    console.log( 'Formulario: ', form );
    this.invoice = form.invoice;
    console.log('Factura', this.invoice);
    this.ngWizardService.next();
  }

  registrarIngresoMaterial() {
    console.log( this.formulario.value );
  }

  registrarFactura( form: NgForm ) {
    //  validamos los datos del formulario
    if ( !form.valid ) {
      return;
    }

    console.log( form.value );
    //  creamos una nueva factura
    let invoice = new Invoice( form.value.invoice_number, this.provider.id, this.acquisition.id );
    // console.log( 'Nueva factura', invoice );
    this.invoicesService.createInvoice( invoice ).subscribe( (resp: any) => {

      if ( resp.status === 'success' ) {
        //  cerramos el modal
        $('#exampleModal').modal('hide');
        //  recargamos facturas para el proveedor
        this.cargarFacturas();
        //  mensaje
        Swal.fire({
          title: 'Factura registrada',
          text: 'Factura registrada con éxito',
          icon: 'success',
          confirmButtonText: 'OK'
        });
      }

    },
    error => console.log( error ));
    //  obtenemos la data y realizamos la peticion a nuestro servicio
    //  nos suscribimos a la respuesta de la petición del servicio
    //  realizamos nueva petición servicio para cargar las facturas del proveedor seleccionado
  }


  getAcquisitionUser() {

    this.acquisitionService.getAcquisitionUser().subscribe( (resp: any) => {
      if ( resp.status === 'success' ) {
        this.acquisition = resp.acquisition;
      }
    },
    error => console.log( error ));
  }

  addMaterial() {
    console.log('Agregado nuevo elemento');
    const group = new FormGroup({
      material: new FormControl( null ),
      // invoice: new FormControl(this.invoiceId),
      unity_cost: new FormControl(null),
      quantity: new FormControl( null ),
      total_cost: new FormControl( null ),
      iva: new FormControl( null ),
    });

    this.formulario.push(group);
  }

  removeGroup(index: number) {
    this.formulario.removeAt( index );
    console.log('Eliminado elemento', index);
  }

  cargarProveedores() {
    this.invoicesService.getProviders().subscribe( (resp: any) => {
      if ( resp.status === 'success' ) {
        this.providers = resp.providers;
      }
    },
    error => console.log( error ));
  }

  cargarMateriales() {
    this.materialsService.getAllMaterials().subscribe( (resp: any) => {
      console.log(resp);
      if ( resp.status === 'success' ) {
        this.searchData = resp.materials;
        console.log('Cargados materiales: ', this.searchData);
        this.dataService = this.completerService.local(this.searchData, 'bar_code', 'bar_code');
      }
    });
  }

  calcularCosto(index: number) {
    console.log('Cambio: ', index );
    console.log( 'Valor unitario: ', this.formulario.controls[index].value.unity_cost );
    let unity_cost = this.formulario.controls[index].value.unity_cost;
    let quantity = this.formulario.controls[index].value.quantity;
    let total_cost = Number( unity_cost * quantity );
    this.formulario.controls[index].value.total_cost = total_cost;

    //  validar que unity_cost y quantity vengan con valores numéricos y sean mayor a 0
    this.formulario.controls[index].patchValue({ total_cost });

    //  calcular iva
    let iva = (total_cost * 0.19);
    this.formulario.controls[index].patchValue({ iva });
  }


  //  metodos ng wizard
  showPreviousStep(event?: Event) {
    this.ngWizardService.previous();
  }

  showNextStep(event?: Event) {
    console.log('Siguiente evento: ', event);
    this.ngWizardService.next();
  }

  resetWizard(event?: Event) {
    this.ngWizardService.reset();
  }

  setTheme(theme: THEME) {
    this.ngWizardService.theme(theme);
  }

  stepChanged(args: StepChangedArgs) {
    console.log(args.step);
  }

}
