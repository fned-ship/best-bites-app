import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../../../environments/environment';
import { OrderService } from '../../../services/order.service';
import { ChatBox } from '../../../components/chat-box/chat-box';
import { ProductService } from '../../../services/product.service';
@Component({
  selector: 'comphistorique',
  imports: [CommonModule,ChatBox],
  templateUrl: './comphistorique.html',
  styleUrl: './comphistorique.css',
})
export class Comphistorique implements OnInit {

  serverUrl=environment.serverURL;
  curr:any;
  pending:any;
  past:any=[];
  rating:any[]=[];


  constructor(private cookieService:CookieService, private orderService:OrderService,private productService:ProductService){}

  ngOnInit(): void {
    this.curr=JSON.parse(this.cookieService.get("user"))
    this.orderService.getCustomerNonRecievedOrders(this.curr._id).subscribe(response => {
      if (response.status === 200) {
        this.pending=response.data;}})
    this.orderService.getCustomerRecievedOrders(this.curr._id).subscribe(response => {
      if (response.status === 200) {
        this.past=response.data;}})
      
  }


  stringify(ing:any){
    let s=""
    for(let i of ing ){
      s+=i.product.name+"x"+i.quantity+", "
    }
    return s.slice(0,-2)
  }


  

  color(i:number,prod:any){
    console.log(prod)
    let element;
    for(let j=1;j<=i;j++){
      element =document.getElementById(prod+"star"+j) as HTMLElement
      element.style.color="gold"
    }
    for(let j=i+1;j<=5;j++){
      element =document.getElementById(prod+"star"+j) as HTMLElement
      element.style.color="gray"
    }
    console.log(prod, " got ",i,"stars")
    this.rating[prod]=i
  }

  confirm(i:number){
    for(let key in this.rating)
    {
      this.productService.addRating(key,this.curr._id,this.rating[key]).subscribe(response => {
      if (response.status === 201) {
        console.log('product rated:', response.data);
      } else {
        console.error('Error:', response.error);
      }
    });
    }
    this.rating=[]
    this.orderService.updateOrderStatus(this.pending[i]._id,"recieved").subscribe(response => {
      if (response.status === 201) {
        console.log('order changed:', response.data);
      } else {
        console.error('Error:', response.error);
      }
    });
    
  
    this.pending.splice(i,1)
    this.orderService.getCustomerRecievedOrders(this.curr._id).subscribe(response => {
      if (response.status === 200) {
        this.past=response.data;}})
  
}}
