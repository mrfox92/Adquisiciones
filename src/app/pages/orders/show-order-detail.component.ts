import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../../services/orders/orders.service';
import { ActivatedRoute } from '@angular/router';
import { MaterialOrder } from '../../models/MaterialOrder.model';
import { Order } from '../../models/Order.model';

@Component({
  selector: 'app-show-order-detail',
  templateUrl: './show-order-detail.component.html',
  styles: [
  ]
})
export class ShowOrderDetailComponent implements OnInit {

  orderId: number = 0;
  order: Order;
  materialOrder: MaterialOrder[] = [];

  constructor( public ordersService: OrdersService, public route: ActivatedRoute ) { }

  ngOnInit(): void {

    this.orderId = Number( this.route.snapshot.paramMap.get('id') );
    this.getOrder();
    this.getDetailOrder();
  }


  getDetailOrder() {
    this.ordersService.getDetailOrder( this.orderId ).subscribe( (resp: any) => {
      if ( resp.status === 'success' ) {
        this.materialOrder = resp.detailOrder;
        console.log('Detalle orden: ', this.materialOrder);
      }
    },
    error => console.log( error ));
  }

  getOrder() {
    this.ordersService.getOrder( this.orderId ).subscribe( (resp: any) => {
      if ( resp.status === 'success' ) {
        this.order = resp.order;
        console.log('Orden: ', this.order);
      }
    },
    error => console.log( error ));
  }

}
