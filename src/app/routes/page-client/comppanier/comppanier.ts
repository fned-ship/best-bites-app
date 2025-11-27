import { Component, OnInit } from '@angular/core';
import { Compmenu } from '../compmenu/compmenu';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'comppanier',
  imports: [CommonModule],
  templateUrl: './comppanier.html',
  styleUrl: './comppanier.css',
})
export class Comppanier {
  total:number=0
  get(){
    let l=[];
    this.total=0;
    for(let key in Compmenu.panier){
      l.push({name:Compmenu.panier[key][0].name,price:Compmenu.panier[key][0].price,q:Compmenu.panier[key][1]})
      this.total+=Compmenu.panier[key][0].price*Compmenu.panier[key][1]
    }
    return l
    
  }

}
