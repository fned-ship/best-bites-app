import { Component } from '@angular/core';
import { Compmenu } from './compmenu/compmenu';
import { Comppanier } from './comppanier/comppanier';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-page-client',
  imports: [Compmenu,CommonModule,Comppanier],
  templateUrl: './page-client.html',
  styleUrl: './page-client.css',
})
export class PageClient {
  lastbtn:number=0;
}