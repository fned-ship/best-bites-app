import { Component,OnInit} from '@angular/core';
import { ReactiveFormsModule ,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StockService } from '../../services/stock.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-stock',
  imports: [CommonModule, ReactiveFormsModule ],
  templateUrl: './add-stock.html',
  styleUrl: './add-stock.css',
})
export class AddStock implements OnInit {

  stockForm!: FormGroup;
   constructor(private stockService: StockService, private fb: FormBuilder) {}

  ngOnInit(): void {
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
    this.stockService.addStock('69233c93b1886a1c99e798cc', this.stockForm.value ).subscribe(response => {
      if (response.status === 201) {
        console.log('Stock added:', response.data);
      } else {
        console.error('Error:', response.error);
      }
    });
    }
  }
}