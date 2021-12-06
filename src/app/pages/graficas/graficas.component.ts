import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-graficas',
  templateUrl: './graficas.component.html',
  styleUrls: ['./graficas.component.css']
})
export class GraficasComponent implements OnInit {

  formularioYear: FormGroup;
  formularioYearMonth: FormGroup;
  formularioCompareByYear: FormGroup;
  formularioInvoice: FormGroup;
  year: number;

  meses: any = [
    { name: 'enero', value: '01' },
    { name: 'febrero', value: '02' },
    { name: 'marzo', value: '03' },
    { name: 'abril', value: '04' },
    { name: 'mayo', value: '05' },
    { name: 'junio', value: '06' },
    { name: 'julio', value: '07' },
    { name: 'agosto', value: '08' },
    { name: 'septiembre', value: '09' },
    { name: 'octubre', value: '10' },
    { name: 'noviembre', value: '11' },
    { name: 'diciembre', value: '12' },
  ];

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.createFormYear();
    this.createFormYearMonth();
    this.createFormCompareByYears();
    this.createFormInvoiceByYears();

  }


  createFormYear() {

    this.formularioYear = this.fb.group({
      anio: ['', [ Validators.required, Validators.minLength(4), Validators.min(2000) ]],
    });

  }

  sendFormYear() {

    // console.log( this.formulario.value );
    if ( this.formularioYear.invalid ) {
      console.log('Formulario inválido!');
      return;
    }

    console.log('Formulario válido!');

    // console.log( filtroGrafica );
    this.router.navigate(['/graficas/pedidos/oficinas', this.formularioYear.value.anio]);
  }

  //  formulario mes y año

  createFormYearMonth() {

    this.formularioYearMonth = this.fb.group({
      anio: ['', [ Validators.required, Validators.minLength(3), Validators.min(2020) ]],
      mes: ['', [ Validators.required ]],
    });

  }

  //  formulario comparar por año

  createFormCompareByYears() {

    this.formularioCompareByYear = this.fb.group({
      from: ['', [ Validators.required, Validators.minLength(3), Validators.min(2000) ]],
      to: ['', [ Validators.required, Validators.minLength(3), Validators.min(2000) ]],
    });

  }

  //  formulario comparar por año

  createFormInvoiceByYears() {

    this.formularioInvoice = this.fb.group({
      anio: ['', [ Validators.required, Validators.minLength(3), Validators.min(2000) ]]
    });

  }

  sendFormYearMonth() {

    // console.log( this.formulario.value );
    if ( this.formularioYearMonth.invalid ) {
      console.log('Formulario inválido!');
      return;
    }

    console.log('Formulario válido!');

    const filtroGrafica = {
      anio: Number( this.formularioYearMonth.value.anio ),
      mes: this.formularioYearMonth.value.mes
    };

    // console.log( filtroGrafica );
    this.router.navigate(['/graficas/oficinas', filtroGrafica.mes, filtroGrafica.anio]);
  }


  sendCompareByYear() {

      // console.log( this.formulario.value );
      if ( this.formularioCompareByYear.invalid ) {
      console.log('Formulario inválido!');
      return;
    }

      console.log('Formulario válido!');

      const years = {
      from: Number( this.formularioCompareByYear.value.from ),
      to: this.formularioCompareByYear.value.to
    };

      console.log( years );

    // console.log( filtroGrafica );
      this.router.navigate(['graficas/compare', years.from, years.to]);

  }


  sendFormInvoicesYear() {

    // console.log( this.formulario.value );
    if ( this.formularioInvoice.invalid ) {
    console.log('Formulario inválido!');
    return;
  }

    console.log('Formulario válido!');
    const anio = Number( this.formularioInvoice.value.anio );

    console.log( anio );

  // console.log( filtroGrafica );
    this.router.navigate(['/graficas/facturas', anio]);

}

}
