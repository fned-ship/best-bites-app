import { Component,OnInit} from '@angular/core';
import { ReactiveFormsModule ,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StockService } from '../../services/stock.service';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-add-stock',
  imports: [CommonModule, ReactiveFormsModule ],
  templateUrl: './add-stock.html',
  styleUrl: './add-stock.css',
})
export class AddStock implements OnInit {

  stockForm!: FormGroup;
  curr:any;
   constructor(private stockService: StockService, private fb: FormBuilder, private authService:AuthService) {}

  ngOnInit(): void {
    this.curr=this.authService.checkAndRedirect("admin")
    this.stockForm = this.fb.group({
      name: ['', Validators.required],
      quantity: ['', Validators.required],
      unit: ["", Validators.required],
     costPerUnit: ['', Validators.required],
    minThreshold: ['', Validators.required],
    category:["", Validators.required]
    });

  }

  async onSubmit() {
    if (!this.stockForm.valid) {alert("forum incompelete");}
    else{
    this.stockService.addStock(this.curr._id, this.stockForm.value ).subscribe(response => {
      if (response.status === 201) {
        console.log('Stock added:', response.data);
      } else {
        console.error('Error:', response.error);
      }
    });
    }
  }
}