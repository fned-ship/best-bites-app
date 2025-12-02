import { Component , OnInit } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { StockService } from '../../../services/stock.service';
import { CommonModule } from '@angular/common';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'compmenu',
  imports: [CommonModule],
  templateUrl: './compmenu.html',
  styleUrl: './compmenu.css',
})
export class Compmenu implements OnInit{
  constructor(private productService : ProductService,private stockService:StockService){}
  serverUrl=environment.serverURL;
  products :any=[];
  stock:any=[];
  static panier:any=[];


  ngOnInit(): void {
    this.productService.getProducts().subscribe(response => {
      if (response.status === 200) {
        this.products=response.data
      } else {
        console.error('Error:', response.error);
      }
    });
    this.stockService.getStocks().subscribe(response => {
      if (response.status === 200) {
        for(let s of response.data||[]){
          this.stock[s._id]=s.quantity
        }}
       else {
        console.error('Error:', response.error);
      }
    });
    
  }

  remove(id:string,ing:any){
    if(id in Compmenu.panier){
      if(Compmenu.panier[id][1]==1){
        delete Compmenu.panier[id]
      }else{
        Compmenu.panier[id][1] -=1
        for(let p of ing){
          this.stock[p.stock._id] +=p.quantity;
        }
      }
    }
  }
  add(p:any){
    if(this.chechingredients(p.ingredients)){
    if(p._id in Compmenu.panier){
      Compmenu.panier[p._id][1] +=1
    }else{
      Compmenu.panier[p._id]=[p,1]
    }}else{
      alert ("can't order more of this product \nInssuficient Stock")
    }
  }
  getnumber(id:string):number{
    if(id in Compmenu.panier){
      return Compmenu.panier[id][1]
    }else{
      return 0
    }
  }
  chechingredients(ing:any):boolean{
    for(let p of ing){
      if(p.quantity>this.stock[p.stock._id]){
        return false;
      }
    }
    for(let p of ing){
      this.stock[p.stock._id] -=p.quantity;
    }
    return true
  }

  sort(cat:string){
    let temp=[]
    for(let prod of this.products){
      if(prod.category==cat){
        temp.push(prod)
      }
    }
    return temp
  }
}
