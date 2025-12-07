import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StockService } from '../../../services/stock.service';
import { AuthService } from '../../../services/auth.service';
import { Router, RouterModule } from '@angular/router';
@Component({
  selector: 'compstock',
  imports: [CommonModule,RouterModule],
  templateUrl: './compstock.html',
  styleUrl: './compstock.css',
})
export class Compstock implements OnInit {

  stock:any;
  curr:any;

  constructor(private stockService:StockService,private authService:AuthService,private router: Router,){}

  ngOnInit(): void {
    this.curr=this.curr=this.authService.checkAndRedirect("admin");
      this.stockService.getStocks().subscribe(response => {
      if (response.status === 200) {
        console.log('Products:', response.data);
        this.stock=response.data
      } else {
        console.error('Error:', response.error);
      }
    });
    
  }
  


  add(p:any){
    let element1=document.getElementById("adding"+p._id) as HTMLElement
    let element2=document.getElementById("add"+p._id) as HTMLElement
    element1.style.display="flex"
    element2.style.display="none"

  }

   adding(p:any){
    let element1=document.getElementById("adding"+p._id) as HTMLElement
    let element2=document.getElementById("add"+p._id) as HTMLElement
    let element3=document.getElementById("q"+p._id) as HTMLInputElement

    let q=+element3.value
    if(q>0){
      p.quantity +=q
      this.stockService.updateStock(p._id,this.curr._id,{quantity:p.quantity}).subscribe(response => {
      if (response.status === 200) {
        console.log('stock updated', response.data);}})
      alert(q+" unit added \ncost:"+q*p.costPerUnit+"Dt ")
      
    }

    element2.style.display="flex"
    element1.style.display="none"

  }
  addingredient(){
    this.router.navigateByUrl('/addstock');
  }


}
