import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'comphistorique',
  imports: [CommonModule],
  templateUrl: './comphistorique.html',
  styleUrl: './comphistorique.css',
})
export class Comphistorique implements OnInit {

  serverUrl=environment.serverURL;


  constructor(private cookieService:CookieService){}

  ngOnInit(): void {
    this.curr=JSON.parse(this.cookieService.get("user"))
      
  }


  curr:any;

  color(i:number,prod:any){
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
  }
}
