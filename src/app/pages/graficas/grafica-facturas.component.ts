import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-grafica-facturas',
  templateUrl: './grafica-facturas.component.html',
  styleUrls: ['./grafica-facturas.component.css']
})
export class GraficaFacturasComponent implements OnInit {

  multi: any[];
  invoices: any[] = [];
  data: any[] = [];
  labelTitle: string = 'Leyenda';
  anio: number;
  loading: boolean = false;

  view: any[] = [700, 400];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'N° Factura';
  showYAxisLabel = true;
  yAxisLabel = 'Costo total por factura';

  constructor(
    private activatedRoute: ActivatedRoute,
    private adminService: AdminService
  ) { }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe( params => {
      // console.log( params );

      this.anio = params.anio;
      this.loading = true;

      this.adminService.geInvoicesByYear( this.anio ).subscribe( (resp: any) => {
        
        // console.log( resp );
        this.invoices = resp.invoices;
        this.yAxisLabel = `${ this.yAxisLabel } ${ this.anio }`;

        this.invoices.forEach(element => {

          this.data.push({
            name: element.invoice.invoice_number,
            value: element.total
          });

        });

        this.loading = false;

        console.log( this.data );

      });

    });

  }


  onSelect(event) {
    console.log(event);
  }


}
