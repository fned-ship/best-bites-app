import { Component,EventEmitter,Input,OnInit,Output} from '@angular/core';
import { ReactiveFormsModule ,FormBuilder, FormGroup, Validators, FormsModule } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { StockService } from '../../services/stock.service';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'editproduct',
  imports: [CommonModule, ReactiveFormsModule,FormsModule],
  templateUrl: './editproduct.html',
  styleUrl: './editproduct.css',
})
export class Editproduct implements OnInit{

  @Input() prod:any;
  @Output() dataEmitted=new EventEmitter();
  imageName = '';
  imageFile: File | any;
  ImageNameColor = 'green';






  productForm!: FormGroup;
   constructor(private stockService: StockService, private productServive:ProductService, private fb: FormBuilder,private authService:AuthService
   ) {}
   n:any;
   curr:any
   ingredients:any[]=[];
   quantity:any[]=[]
   stock:any=[];



  ngOnInit(): void {

    this.curr=this.authService.checkAndRedirect("admin");

    this.n=this.prod.ingredients.length
    console.log("hello")
    console.log(this.n)
    this.productForm = this.fb.group({
      name: [this.prod.name,Validators.required],
  description: [this.prod.description,Validators.required],
  category: [this.prod.category,Validators.required],
  price: [this.prod.price,Validators.required] 
    });
    this.stockService.getStocks().subscribe(response => {
      if (response.status === 200) {
        this.stock=response.data
      } else {
        console.error('Error:', response.error);
      }
    });
    for (let i of this.prod.ingredients){
      this.ingredients.push(i.stock._id)
      this.quantity.push(i.quantity)
    }
  }
  /*checkingredients():boolean{
    let l:string[]=[]
    for (let i of this.ingredients){
      if (l.includes(i.stock)) {
        alert("there's duplication in ingredients list")
        return false;
      }
      else{
        l.push(i.stock)
      }
      if (i.quantity<=0){
        alert("ingredient quantity cannot be null or negatif")
        return false;
      }
      
    }
    return true
  }*/


  handleFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.imageFile = file;
      this.imageName = file.name;
      this.ImageNameColor = 'green';
    }}

  async onSubmit() {
      if (!this.productForm.valid || this.n<1) {alert("forum incompelete");
        return;}
      /*if (!this.imageFile) {
      this.imageName = 'Please upload an image';
      this.ImageNameColor = 'red';
      return;
    }*/
      /*const sel=document.getElementsByClassName("typeofIngredient") as HTMLSelectElement;
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
      }*/
     let ings:any=[]
     for(let i=0;i<this.n;i++){
      ings.push({stock:this.ingredients[i],quantity:this.quantity[i]})
     }

     let l:string[]=[]
    for (let i of ings){
      if(!i.stock){
        alert("Incompelete forum")
        return;
      }
      if (l.includes(i.stock) ) {
        alert("there's duplication in ingredients list")
        return ;
      }
      else{
        l.push(i.stock)
      }
      if (!i.quantity || i.quantity<=0){
        alert("ingredient quantity cannot be null or negatif")
        return ;
      }
      
    }

      const data:any=this.productForm.value;
      console.log(this.prod)
      data.ingredients=ings;
      this.productServive.updateProduct(this.prod._id,this.curr._id,data,this.imageFile).subscribe(response => {
      if (response.status === 201) {
        console.log('Product updated:', response.data);
      } else {
        console.error('Error: ', response.error);
      }
    });
    alert("product updated succefully")
      /*this.productServive.addProduct('69233c93b1886a1c99e798cc',data,this.imageFile).subscribe(response => {
      if (response.status === 201) {
        console.log('Product added:', response.data);
      } else {
        console.error('Error: ', response.error);
      }
    });*/
    }

    back(){
      this.dataEmitted.emit(false)
    }
}
