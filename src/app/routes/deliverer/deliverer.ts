import { Component , OnInit , OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OrderService } from '../../services/order.service';
import { environment } from '../../../environments/environment';
import { DelivererService } from '../../services/deliverer.service';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { ChatBox } from '../../components/chat-box/chat-box';

@Component({
  selector: 'app-deliverer',
  imports: [CommonModule, FormsModule,ChatBox],
  templateUrl: './deliverer.html',
  styleUrl: './deliverer.css',
})
export class Deliverer implements OnInit {
  // Deliverer ID - should come from auth service
  delivererId = ''; 
  chatId:string="";
  
  // Orders lists
  availableOrders: any[] = [];
  myOrders: any[] = [];
  
  // Loading states
  loadingAvailable = false;
  loadingMyOrders = false;
  
  // Socket subscriptions
  private socketSubscriptions: Subscription[] = [];

  constructor(private delivererService: DelivererService , private authService : AuthService) {}

  ngOnInit() {
    this.delivererId=this.authService.checkAndRedirect("delivery")?._id;
    // Join deliverer room
    this.delivererService.joinDelivererRoom(this.delivererId);
    
    // Load orders
    this.loadAvailableOrders();
    this.loadMyOrders();
    
    // Subscribe to socket events
    this.setupSocketSubscriptions();
  }

  ngOnDestroy() {
    // Leave deliverer room
    this.delivererService.leaveDelivererRoom(this.delivererId);
    
    // Unsubscribe from socket events
    this.socketSubscriptions.forEach(sub => sub.unsubscribe());
  }

  // Setup socket event subscriptions
  setupSocketSubscriptions() {
    // Listen for order taken
    const takenSub = this.delivererService.orderTaken$.subscribe(data => {
      console.log('Order taken by someone:', data);
      
      // Remove from available orders if not taken by me
      if (data.delivererId !== this.delivererId) {
        this.availableOrders = this.availableOrders.filter(
          order => order._id !== data.orderId
        );
      }
    });

    // Listen for order released
    const releasedSub = this.delivererService.orderReleased$.subscribe(data => {
      console.log('Order released:', data);
      
      // Refresh available orders to show the released order
      this.loadAvailableOrders();
      
      // Remove from my orders if I released it
      if (data.delivererId === this.delivererId) {
        this.myOrders = this.myOrders.filter(
          order => order._id !== data.orderId
        );
      }
    });

    // Listen for order delivered
    const deliveredSub = this.delivererService.orderDelivered$.subscribe(data => {
      console.log('Order delivered:', data);
      
      // Remove from my orders
      if (data.delivererId === this.delivererId) {
        this.myOrders = this.myOrders.filter(
          order => order._id !== data.orderId
        );
      }
    });

    this.socketSubscriptions.push(takenSub, releasedSub, deliveredSub);
  }

  // Load available orders
  loadAvailableOrders() {
    this.loadingAvailable = true;
    this.delivererService.getAvailableOrders(this.delivererId).subscribe(response => {
      this.loadingAvailable = false;
      if (response.status === 200 && response.data) {
        this.availableOrders = response.data;
        console.log("available : ",response.data)
      }
    });
  }

  // Load my orders
  loadMyOrders() {
    this.loadingMyOrders = true;
    this.delivererService.getMyOrders(this.delivererId).subscribe(response => {
      this.loadingMyOrders = false;
      if (response.status === 200 && response.data) {
        this.myOrders = response.data;
        console.log("my orders : ",response.data)
      }
    });
  }

  // Take an order
  takeOrder(orderId: string) {
    this.delivererService.takeOrder(orderId, this.delivererId).subscribe(response => {
      if (response.status === 200) {
        // Remove from available orders
        this.availableOrders = this.availableOrders.filter(o => o._id !== orderId);
        
        // Add to my orders
        if (response.data) {
          this.myOrders.unshift(response.data);
        }
        
        console.log('Order taken successfully!');
      } else {
        console.log('Error: ' + response.error);
      }
    });
  }

  // Release an order
  releaseOrder(orderId: string) {
      this.delivererService.releaseOrder(orderId, this.delivererId).subscribe(response => {
        if (response.status === 200) {
          // Remove from my orders
          this.myOrders = this.myOrders.filter(o => o._id !== orderId);
          
          // Add back to available orders
          if (response.data) {
            this.availableOrders.unshift(response.data);
          }
          
          console.log('Order released successfully!');
        } else {
          console.log(response.error)
        }
      });
  }

  // Mark as delivered
  markAsDelivered(orderId: string) {
      this.delivererService.markAsDelivered(orderId, this.delivererId).subscribe(response => {
        if (response.status === 200) {
          // Remove from my orders
          this.myOrders = this.myOrders.filter(o => o._id !== orderId);
          
          console.log('Order marked as delivered!');
        } else {
          console.log('Error: ' + response.error);
        }
      });
  }

  openChat(chatId:string){
    this.chatId=chatId;
  }
  return(){
    this.chatId="";
  }

}
