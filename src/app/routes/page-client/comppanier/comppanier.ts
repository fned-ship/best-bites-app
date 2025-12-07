import { Component, OnInit } from '@angular/core';
import { Compmenu } from '../compmenu/compmenu';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule ,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OrderService } from '../../../services/order.service';
import { environment } from '../../../../environments/environment';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'comppanier',
  imports: [CommonModule,FormsModule,ReactiveFormsModule ],
  templateUrl: './comppanier.html',
  styleUrl: './comppanier.css',
})
export class Comppanier implements OnInit {
  total:number=0
  formofpayment:string="cash"
  msg:string=""
  infoForm!: FormGroup;
  panier:any=[]
  specialInstructions=[]
  generalcomment=""
  serverUrl=environment.serverURL;
  curr:any;





  constructor( private fb: FormBuilder,private orderService:OrderService,private authService:AuthService) {}
  ngOnInit(): void {
    this.curr=this.authService.checkAndRedirect("client");
    this.infoForm = this.fb.group({
      address: [this.curr.address, Validators.required],
      card:[],
      comment:['']

    });
    this.total=0;
    for(let key in Compmenu.panier){
      this.panier.push({name:Compmenu.panier[key][0].name,price:Compmenu.panier[key][0].price,q:Compmenu.panier[key][1]})
      this.total+=Compmenu.panier[key][0].price*Compmenu.panier[key][1]
    }
    


  }


  onSubmit(){
    if(this.panier.length==0){
      this.msg="No items Ordered"
      return;
    }
    if(!this.infoForm.valid){
      this.msg="Invalid Information"
      return
    }
      let data=this.infoForm.value
      if( this.formofpayment=="card"){
        if( data.card<1000){
          this.msg="Invalid Card number"
          return;
        }
        
      }

      let order:any=[]
      for (let key in Compmenu.panier){
        order.push({productId:key,quantity:Compmenu.panier[key][1]})
      }
      for(let i=0;i<order.length;i++ ){
        if(this.specialInstructions[i]){
          order[i].specialInstructions=this.specialInstructions[i]
        }

      }
      console.log(order)
      this.orderService.placeOrder(
      this.curr._id,order,data.address,this.generalcomment).subscribe(response => {
      if (response.status === 201) {
        console.log('Order placed:', response.data);
      } else {
        console.error('Error:', response.error);
      }
    });


      Compmenu.panier=[]
      this.panier=[]
      this.total=0
      this.msg="Order Confirmed"
    }
  }
  


