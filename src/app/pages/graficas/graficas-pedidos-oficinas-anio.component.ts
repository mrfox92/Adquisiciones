import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-graficas-pedidos-oficinas-anio',
  templateUrl: './graficas-pedidos-oficinas-anio.component.html',
  styleUrls: ['./graficas-pedidos-oficinas-anio.component.css']
})
export class GraficasPedidosOficinasAnioComponent implements OnInit {

   multi: any[];
   offices: any[] = [];
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
   xAxisLabel = 'Oficinas';
   showYAxisLabel = true;
   yAxisLabel = 'Pedidos';

   constructor(
     private adminService: AdminService,
     private activatedRoute: ActivatedRoute
   ) { }

   ngOnInit(): void {
     this.getFilterParams();
   }

   getFilterParams() {

     this.activatedRoute.params.subscribe( params => {

       this.anio = params.anio;
      //  console.log( this.anio );

       this.loading = true;
       //  llamar al servicio
       this.adminService.getOfficesByYear( this.anio ).subscribe( (resp: any) => {
        //  console.log( resp );
         this.offices = resp.offices;
         this.yAxisLabel = `${ this.yAxisLabel } ${ this.anio }`;

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
