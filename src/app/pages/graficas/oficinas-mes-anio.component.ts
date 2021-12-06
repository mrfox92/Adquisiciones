import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-oficinas-mes-anio',
  templateUrl: './oficinas-mes-anio.component.html',
  styles: [
  ]
})
export class OficinasMesAnioComponent implements OnInit {


  // single: any[] = [];
  multi: any[];
  offices: any[] = [];
  data: any[] = [];
  labelTitle: string = 'Leyenda';
  mes: string;
  anio: number;
  loading: boolean = false;

  view: any[] = [700, 400];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Oficinas';
  showYAxisLabel = true;
  yAxisLabel = 'Pedidos';


  meses: any = [
    'enero',
    'febrero',
    'marzo',
    'abril',
    'mayo',
    'junio',
    'julio',
    'agosto',
    'septiembre',
    'octubre',
    'noviembre',
    'diciembre',
  ];

  constructor(
    private adminService: AdminService,
    private activatedRoute: ActivatedRoute
  ) {
    // Object.assign(this, { single });
  }

  ngOnInit(): void {
    this.getFilterParams();
    // this.getOffices();
  }


  getFilterParams() {

    this.activatedRoute.params.subscribe( params => {

      this.mes = params.mes;
      this.anio = params.anio;
      // console.log( this.mes, this.anio);
      const filter = {
        anio: this.anio,
        mes: this.mes
      };

      const fecha = new Date();
      console.log( 'Mes' + this.meses[1] );

      this.loading = true;
      //  llamar al servicio
      this.adminService.getOffices( filter ).subscribe( (resp: any) => {
        console.log( resp );
        this.offices = resp.offices;
        this.yAxisLabel = `${ this.yAxisLabel } ${ resp.mes } ${ filter.anio }`;
        this.offices.forEach(element => {

          this.data.push({
            name: element.office.name,
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
