import { Component , OnInit } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { CommonModule } from '@angular/common';
import { environment } from '../../../../environments/environment';
import { FormsModule } from '@angular/forms';
import { Editproduct } from '../../editproduct/editproduct';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'compproducts',
  imports: [CommonModule,FormsModule,Editproduct,RouterModule],
  templateUrl: './compproducts.html',
  styleUrl: './compproducts.css',
})
export class Compproducts implements OnInit{
  constructor(private productService : ProductService,private router: Router,private authService:AuthService){}
  serverUrl=environment.serverURL;
  products :any=[];
  category:string=""
  searchterm:string=""
  editing:boolean=false;
  prodselected:any;
  curr:any;


  ngOnInit(): void {
    this.curr=this.authService.checkAndRedirect("admin")
    this.productService.getProducts().subscribe(response => {
      if (response.status === 200) {
        this.products=response.data
      } else {
        console.error('Error:', response.error);
      }
    });
    
    
  }


  filter(){
    let temp=[...this.products]
      const term = this.searchterm.toLowerCase();
      temp = temp.filter(prod =>
        prod.name.toLowerCase().includes(term) &&
        prod.category.toLowerCase().includes(this.category)
      );
    return(temp)
  }

  edit(p:any){
    this.editing=true
    this.prodselected=p
  }
  remove(i:any){
    this.productService.deleteProduct(this.curr._id,i._id)
    this.productService.getProducts().subscribe(response => {
      if (response.status === 200) {
        this.products=response.data
      } else {
        console.error('Error:', response.error);
      }
    });
  }
  add(){
    this.router.navigateByUrl('/addproduct');
    
  }

  handle(data:boolean){
    this.editing=false;
  }

}
