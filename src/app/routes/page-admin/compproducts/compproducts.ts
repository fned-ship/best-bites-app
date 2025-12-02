import { Component , OnInit } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { CommonModule } from '@angular/common';
import { environment } from '../../../../environments/environment';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'compproducts',
  imports: [CommonModule,FormsModule],
  templateUrl: './compproducts.html',
  styleUrl: './compproducts.css',
})
export class Compproducts implements OnInit{
  constructor(private productService : ProductService){}
  serverUrl=environment.serverURL;
  products :any=[];
  category:string=""
  searchterm:string=""


  ngOnInit(): void {
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
    console.log(p)
  }
  remove(i:any){
    console.log(i)
  }

}
