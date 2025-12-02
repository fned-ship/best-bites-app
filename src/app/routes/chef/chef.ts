import { Component , OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OrderService } from '../../services/order.service';
import { Order } from '../../models/order.model';
import { environment } from '../../../environments/environment';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-chef',
  imports: [CommonModule, FormsModule],
  templateUrl: './chef.html',
  styleUrl: './chef.css',
})
export class Chef implements OnInit {
  confirmedOrders:any=[];
  selectedOrder:number=-1;  
  serverUrl=environment.serverURL;
  view=false;

  constructor(private orderService:OrderService,private authService:AuthService){}

  ngOnInit(): void {
    // this.authService.checkAndRedirect("chef");
    this.getOrders();
  }

  getOrders(){
    this.orderService.getOrdersByStatus("confirmed").subscribe(response => {
      if (response.status === 200) {
        this.confirmedOrders=response.data??[] ;
        console.log('Products:',  this.confirmedOrders);
      } else {
        console.error('Error:', response.error);
      }
    });
  }

  markReady(){
    this.orderService.updateOrderStatus(this.confirmedOrders[this.selectedOrder]._id,"ready").subscribe(response => {
      if (response.status === 200) {
        console.log('Products:',  response.data);
        this.selectedOrder=-1 ;
        this.getOrders();
      } else {
        console.error('Error:', response.error);
      }
    });
  }

  viewItems(index:number){
    this.selectedOrder=index ;
  }
  return(){
    this.selectedOrder=-1;
  }
}
