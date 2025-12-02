import { Component, OnInit } from '@angular/core';
import { Compmenu } from '../compmenu/compmenu';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule ,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../../../environments/environment';

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





  constructor( private fb: FormBuilder,private cookieService:CookieService) {}
  ngOnInit(): void {
    this.curr=JSON.parse(this.cookieService.get("user"))
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
      Compmenu.panier=[]
        this.panier=[]
        this.total=0
        console.log(this.specialInstructions)
        this.msg="Order Confirmed"
    }
  }
  


