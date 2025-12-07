import { Component, OnInit } from '@angular/core';
import { Compproducts } from './compproducts/compproducts';
import { Compstock } from './compstock/compstock';
import { CommonModule } from '@angular/common';
import { AdminDashboard } from '../../components/admin-dashboard/admin-dashboard';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-page-admin',
  imports: [CommonModule,Compproducts,Compstock,AdminDashboard],
  templateUrl: './page-admin.html',
  styleUrl: './page-admin.css',
})
export class PageAdmin implements OnInit {
  curr:any;
  lastbtn:number=0
  constructor(private authService:AuthService){}
  ngOnInit(): void {
      this.curr=this.authService.checkAndRedirect("admin")
  }
}
