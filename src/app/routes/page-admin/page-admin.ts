import { Component } from '@angular/core';
import { Compproducts } from './compproducts/compproducts';
import { Compstock } from './compstock/compstock';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-page-admin',
  imports: [CommonModule,Compproducts,Compstock],
  templateUrl: './page-admin.html',
  styleUrl: './page-admin.css',
})
export class PageAdmin {

  lastbtn:number=0
}
