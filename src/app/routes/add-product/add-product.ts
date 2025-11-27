import { Component,OnInit} from '@angular/core';
import { ReactiveFormsModule ,FormBuilder, FormGroup, Validators, FormsModule } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { StockService } from '../../services/stock.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-product',
  imports: [CommonModule, ReactiveFormsModule,FormsModule],
  templateUrl: './add-product.html',
  styleUrl: './add-product.css',
})
export class AddProduct implements OnInit {
  imageName = '';
  imageFile: File | null = null;
  ImageNameColor = 'green';






  productForm!: FormGroup;
   constructor(private stockService: StockService, private productServive:ProductService, private fb: FormBuilder) {}
   n:number=1;
   ingredients:any[]=[];
   stock:any=[];


  ngOnInit(): void {
    this.productForm = this.fb.group({
      name: ["",Validators.required],
  description: ["",Validators.required],
  category: ["",Validators.required],
  price: ["",Validators.required] ,
  isAvaliable:[true],
    });
    this.stockService.getStocks().subscribe(response => {
      if (response.status === 200) {
        console.log('Products:', response.data);
        this.stock=response.data
      } else {
        console.error('Error:', response.error);
      }
    });

  }
  checkingredients():boolean{
    let l:string[]=[]
    for (let i of this.ingredients){
      if (l.includes(i.stock)) {
        alert("there's duplication in ingredients list")
        return false;
      }
      else{
        l.push(i.stock)
      }
      if (i.quantity==0){
        alert("ingredient quantity cannot be null")
        return false;
      }
      
    }
    return true
  }


  handleFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.imageFile = file;
      this.imageName = file.name;
      this.ImageNameColor = 'green';
    }}

  async onSubmit() {
      if (!this.productForm.valid) {alert("forum incompelete");
        return;}
      if (!this.imageFile) {
      this.imageName = 'Please upload an image';
      this.ImageNameColor = 'red';
      return;
    }
      const sel=document.getElementsByClassName("typeofIngredient") as HTMLSelectElement;
      const typ=document.getElementsByClassName("quantityofIngredient") as HTMLSelectElement;
      for (let i of sel){
        this.ingredients.push({stock:i.value,quantity:0})
      }
      let i=0
      for (let j of typ){
        this.ingredients[i].quantity=+j.value;
        i++
      }
      if(!this.checkingredients()){
        this.ingredients=[]
        return;
      }
      const data:any=this.productForm.value;
      data['ingredients']=this.ingredients;
      console.log(data)
      this.productServive.addProduct('69233c93b1886a1c99e798cc',data,this.imageFile).subscribe(response => {
      if (response.status === 201) {
        console.log('Product added:', response.data);
      } else {
        console.error('Error:', response.error);
      }
    });
    // this.stockService.addStock('69233c93b1886a1c99e798cc', this.stockForm.value ).subscribe(response => {
    //   if (response.status === 201) {
    //     console.log('Stock added:', response.data);
    //   } else {
    //     console.error('Error:', response.error);
    //   }
    // });
    }
  }
//}
