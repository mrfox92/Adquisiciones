import { Component, OnInit } from '@angular/core';
import { DispatchersService } from '../../services/dispatchers/dispatchers.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {

  orders: any[] = [];
  loading: boolean = false;

  constructor(
    private dispatchersService: DispatchersService
  ) { }

  ngOnInit(): void {
    this.getOrders();
  }


  getOrders() {
    this.loading = true;
    this.dispatchersService.getMyOrders().subscribe( resp => {
      // console.log( resp );
      this.orders = resp.orders;
      console.log(  this.orders);
      this.loading = false;
    });
  }

}
