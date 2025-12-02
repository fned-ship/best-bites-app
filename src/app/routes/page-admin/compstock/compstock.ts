import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'compstock',
  imports: [CommonModule],
  templateUrl: './compstock.html',
  styleUrl: './compstock.css',
})
export class Compstock {

  panier=[{_id: "hhh",
  name: "milk",
  quantity: 10,
  minThreshold:20},
{_id: "hhh1",
  name: "sugar",
  quantity: 5,
  minThreshold:10}]


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
    console.log(element3)
    if(q>0){
      p.quantity +=q
      console.log(q)
      console.log(p.quantity)
    }

    element2.style.display="flex"
    element1.style.display="none"

  }


}
