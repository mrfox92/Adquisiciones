import { Component, OnInit } from '@angular/core';
import { FormArray, FormGroup, FormControl, Validators, NgForm, AbstractControl } from '@angular/forms';
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
import { Router } from '@angular/router';

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
      showNextButton: false,
      showPreviousButton: false,
      // toolbarExtraButtons: [
      //   { text: 'Finalizar', class: 'btn btn-info', event: () => { alert('Finished!!!'); } }
      // ]
    }
  };

  constructor(
    public materialsService: MaterialsService,
    public invoicesService: InvoicesService,
    private ngWizardService: NgWizardService,
    private completerService: CompleterService,
    private acquisitionService: AcquisitionsService,
    private router: Router
  ) {}

  ngOnInit(): void {

    this.invoiceId = 123;

    //  inicializamos nuestro formulario
    this.formulario = new FormArray([
      new FormGroup({
        material: new FormControl( null, [ Validators.required, Validators.minLength(3) ] ),
        // invoice: new FormControl({ value: this.invoiceId, disabled: true }),
        // invoice: new FormControl(this.invoiceId),
        nombre: new FormControl( null, [ Validators.required, Validators.minLength(3) ] ),
        unity_cost: new FormControl(null, [ Validators.required, Validators.min(1) ]),
        quantity: new FormControl( null, [ Validators.required, Validators.min(1) ] ),
        total_cost: new FormControl( null, [ Validators.required, Validators.min(1) ] ),
        iva: new FormControl( null, [ Validators.required, Validators.min(1) ] ),
        unity_type: new FormControl( null, [ Validators.required ] ),
      })
    ]);


    this.cargarMateriales();
    this.cargarProveedores();
    this.getAcquisitionUser();
  }


  prueba( value ) {
    console.log( value );
  }

  // get invalidName() {
  //   return this.formulario.get('nombre').invalid && this.formulario.get('nombre').touched;
  // }

  addName( value, index ) {
    // console.log( value );
    let nombre = '';
    let unity_type = '';

    const element = this.searchData.filter( material => material.bar_code === String( value )  );

    if ( element.length > 0 ) {
      // console.log(element);
      nombre = String( element[0].name );
      unity_type = element[0].unity_type;
      this.formulario.controls[index].patchValue({ nombre });
      this.formulario.controls[index].patchValue({ unity_type });
      // this.formulario.controls[index];
      // this.formulario.controls[index].get('unity_type').disable();
      // console.log( element[0].name );
    } else {
      nombre = '';
      unity_type = '';
      this.formulario.controls[index].patchValue({ nombre });
      this.formulario.controls[index].patchValue({ unity_type });
      // this.formulario.controls[index].get('nombre').enable();
      // this.formulario.controls[index].get('unity_type').enable();

    }
  }

  seleccionarProveedor( form ) {
    // console.log('Proveedor seleccionado: ', form);
    this.provider = form.provider;
    // console.log('Proveedor seleccionado: ', this.provider.id);

    this.invoicesService.getInvoicesProvider( this.provider.id ).subscribe( (resp: any) => {
      if ( resp.status === 'success' ){
        this.invoices = resp.invoices;
        this.invoices = this.invoices.filter( invoice =>  invoice.materials_invoices_count === 0);
        console.log('Facturas proveedor: ', this.invoices);
        this.ngWizardService.next();
      }
    });
  }

  cargarFacturas() {
    this.invoicesService.getInvoicesProvider( this.provider.id ).subscribe( (resp: any) => {
      if ( resp.status === 'success' ){
        this.invoices = resp.invoices;
        this.invoices = this.invoices.filter( invoice =>  invoice.materials_invoices_count === 0);
        // console.log('Facturas proveedor: ', this.invoices);
      }
    });
  }

  seleccionarFactura( form ) {

    this.invoice = form.invoice;
    this.ngWizardService.next();
  }

  registrarIngresoMaterial() {

    if ( this.formulario.invalid ) {
      console.log('Formulario no es valido!!');
      return;
    }
    console.log( this.formulario.value );
    console.log('Formulario valido!!');
    let materiales: any = {};
    materiales.materials = this.formulario.value;
    materiales.invoice = this.invoice;

    // console.log( materiales );
    this.acquisitionService.createMaterialsInvoice( materiales ).subscribe( (resp: any) => {

      if ( resp.status === 'success' && resp.code === 200 ) {
        Swal.fire({
          title: 'Detalle factura añadido!',
          text: `Los materiales han sido añadidos con éxito a la factura`,
          icon: 'success',
          timer: 1500
        });

        this.resetWizard();

        this.router.navigate(['/facturas']);

      }
    });

  }

  registrarFactura( form: NgForm ) {
    //  validamos los datos del formulario
    if ( !form.valid ) {
      return;
    }

    console.log( form.value );
    //  creamos una nueva factura
    let invoice = new Invoice(
      form.value.invoice_number,
      this.provider.id,
      this.acquisition.id,
      null, null,
      form.value.emission_date,
      form.value.expiration_date
    );
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
      material: new FormControl( null, [ Validators.required, Validators.minLength(3) ] ),
      nombre: new FormControl( null, [ Validators.required, Validators.minLength(3) ] ),
      // invoice: new FormControl(this.invoiceId),
      unity_cost: new FormControl(null, [ Validators.required, Validators.min(1) ]),
      quantity: new FormControl( null, [ Validators.required, Validators.min(1) ] ),
      total_cost: new FormControl( null, [ Validators.required, Validators.min(1) ] ),
      iva: new FormControl( null, [ Validators.required, Validators.min(1) ] ),
      unity_type: new FormControl( null, [ Validators.required ] ),

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
      // console.log(resp);
      if ( resp.status === 'success' ) {
        this.searchData = resp.materials;
        // console.log('Cargados materiales: ', this.searchData);
        this.dataService = this.completerService.local(this.searchData, 'bar_code', 'bar_code');
      }
    });
  }

  calcularCosto(index: number) {

    let unity_cost: number = Number( this.formulario.controls[index].value.unity_cost );
    let quantity: number = Number( this.formulario.controls[index].value.quantity );

    let total_cost = 0;
    let iva = 0;

    if ( (unity_cost && Math.sign( unity_cost ) === 1 ) && (quantity && Math.sign( quantity ) === 1) ) {

      total_cost = Number( unity_cost * quantity );
      iva = (total_cost * 0.19);

      this.formulario.controls[index].patchValue({ total_cost });
      this.formulario.controls[index].patchValue({ iva });
      // this.formulario.controls[index].get('total_cost').disable();
      // this.formulario.controls[index].get('iva').disable();

    } else {

      total_cost = null;
      iva = null;

      this.formulario.controls[index].patchValue({ total_cost });
      this.formulario.controls[index].patchValue({ iva });

      return;
    }


  }


  //  metodos ng wizard
  showPreviousStep(event?: Event) {
    this.ngWizardService.previous();
  }

  showNextStep(event?: Event) {
    // console.log('Siguiente evento: ', event);
    this.ngWizardService.next();
  }

  resetWizard(event?: Event) {
    this.cargarMateriales();
    this.cargarProveedores();
    this.getAcquisitionUser();
    this.formulario.reset();
    this.ngWizardService.reset();
  }

  setTheme(theme: THEME) {
    this.ngWizardService.theme(theme);
  }

  stepChanged(args: StepChangedArgs) {
    // console.log(args.step);
  }

}
