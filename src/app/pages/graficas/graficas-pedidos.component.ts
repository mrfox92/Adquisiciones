import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-graficas-pedidos',
  templateUrl: './graficas-pedidos.component.html',
  styles: [
  ]
})
export class GraficasPedidosComponent implements OnInit {


  view: any[] = [700, 400];

  data: any[] = [];

  multidata: any[] = [];
  from: any[] = [];
  objFrom: any;
  to: any[] = [];

  grafica: any[] = [];

  params: any;
  loading: boolean = false;

  // options
  showXAxis: boolean = true;
  showYAxis: boolean = true;
  gradient: boolean = false;
  showLegend: boolean = true;
  legendPosition: string = 'below';
  showXAxisLabel: boolean = true;
  yAxisLabel: string = 'Oficinas';
  showYAxisLabel: boolean = true;
  xAxisLabel = 'Pedidos';

  // colorScheme = {
  //   domain: ['#5AA454', '#C7B42C', '#AAAAAA']
  // };

  schemeType: string = 'ordinal';

  // multi = [
  //   {
  //     name: 'Asesoria jurídica',
  //     series: [
  //       {
  //         name: 2020,
  //         value: 49
  //       },
  //       {
  //         name: 2021,
  //         value: 65
  //       }
  //     ]
  //   },

  //   {
  //     name: 'Emergencia',
  //     series: [
  //       {
  //         name: 2020,
  //         value: 30
  //       },
  //       {
  //         name: 2021,
  //         value: 50
  //       }
  //     ]
  //   },
  // ];

  constructor(
    private activatedRoute: ActivatedRoute,
    private adminService: AdminService
  ) {}

  ngOnInit(): void {

    this.activatedRoute.params.subscribe( params => {


      // console.log( params );

      this.params = params;


      this.loading = true;

      this.adminService.compareByYear( this.params ).subscribe( (resp: any) => {

        this.multidata = resp.offices;

        for (let index = 0; index < this.multidata[0].length; index++) {

          const element = this.multidata[0][index];
          const element2 = this.multidata[1][index];

          this.objFrom = {
            name: element.office.name,
            series: [
              {
                name: this.params.from,
                value: element.total
              },
              {
                name: this.params.to,
                value: element2.total
              }
            ]
          };

          //  almacenar en un array
          this.grafica.push( this.objFrom );


        }

        this.loading = false;


      });


    });

  }

  // onSelect(data): void {
  //   console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  // }

  // onActivate(data): void {
  //   console.log('Activate', JSON.parse(JSON.stringify(data)));
  // }

  // onDeactivate(data): void {
  //   console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  // }


}
