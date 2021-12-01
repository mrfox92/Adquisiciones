import { Component, OnInit } from '@angular/core';
import { DispatchersService } from '../../services/dispatchers/dispatchers.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  orderDetail: any[] = [];
  order: any = {};

  constructor(
    private dispatchersService: DispatchersService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {

    this.getOrder();

  }


  getOrder() {

    this.activatedRoute.params.subscribe( params => {

      this.dispatchersService.getOrder( params.id ).subscribe( resp => {
        this.order = resp;
        this.orderDetail = resp.materials_orders;
      });
    });
  }


  borrar( detail: any ) {
    console.log( detail.id );

    this.dispatchersService.deleteIitem( detail.id ).subscribe( resp => {

      this.getOrder();

      Swal.fire({
        title: 'Item eliminado de la orden',
        text: `${ detail.name } eliminado con éxito`,
        icon: 'success',
        timer: 1000
      });

      // console.log( resp );
    });
  }

}
