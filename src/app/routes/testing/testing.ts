import { Component, OnInit } from '@angular/core';
import { ProductService  } from '../../services/product.service';
import { OrderService } from '../../services/order.service';
import { StockService } from '../../services/stock.service';
import { AnalyticsService } from '../../services/analytics.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-testing',
  imports: [CommonModule,RouterModule,ReactiveFormsModule],
  templateUrl: './testing.html',
  styleUrl: './testing.css',
})
export class Testing implements OnInit {
  constructor(
    private productService: ProductService,
    private orderService: OrderService,
    private stockService: StockService,
    private analyticsService: AnalyticsService
  ) {}

  ngOnInit() {
    // Example 1: Get all products
    this.productService.getProducts().subscribe(response => {
      if (response.status === 200) {
        console.log('Products:', response.data);
      } else {
        console.error('Error:', response.error);
      }
    });

    // Example 2: Place an order
    // this.orderService.placeOrder(
    //   '69233c93b1886a1c99e798cc',
    //   [
    //     { productId: '69233ff0b1886a1c99e798e8', quantity: 1, specialInstructions: 'No onions' }
    //   ],
    //   '123 Main St, City',
    //   'Ring doorbell'
    // ).subscribe(response => {
    //   if (response.status === 201) {
    //     console.log('Order placed:', response.data);
    //   } else {
    //     console.error('Error:', response.error);
    //   }
    // });

    // Example 3: Add a new stock item
    // this.stockService.addStock('69233c93b1886a1c99e798cc', {
    //   name: 'cheeze',
    //   quantity: 100,
    //   unit: 'kg',
    //   costPerUnit: 5.5,
    //   minThreshold: 20,
    //   category: 'vegetables'
    // }).subscribe(response => {
    //   if (response.status === 201) {
    //     console.log('Stock added:', response.data);
    //   } else {
    //     console.error('Error:', response.error);
    //   }
    // });

    // Example 4: Get daily income
    // this.analyticsService.getDailyIncome('69233c93b1886a1c99e798cc').subscribe(response => {
    //   if (response.status === 200) {
    //     console.log('Daily income:', response.data);
    //   } else {
    //     console.error('Error:', response.error);
    //   }
    // });

    // Example 5: Update product

    // this.productService.updateProduct(
    //   '69233ff0b1886a1c99e798e8',
    //   '69233c93b1886a1c99e798cc',
    //   { price: 15.99, isAvailable: true }
    // ).subscribe(response => {
    //   if (response.status === 200) {
    //     console.log('Product updated:', response.data);
    //   } else {
    //     console.error('Error:', response.error);
    //   }
    // });

    //     this.productService.addProduct(
    //   '69233c93b1886a1c99e798cc', // Replace with your admin ID
    //   {
    //     name: 'Margherita Pizza',
    //     description: 'Classic Italian pizza with tomatoes, mozzarella, and basil',
    //     category: 'main_course',
    //     price: 12.99,
    //     image: '/images/margherita-pizza.jpg',
    //     isAvailable: true,
    //     ingredients: [
    //       {
    //         stock: '69233d1ab1886a1c99e798d0', // Replace with your tomato stock ID
    //         quantity: 0.2  // 200 grams of tomatoes per pizza
    //       },
    //       {
    //         stock: '69233d36b1886a1c99e798d8', // Replace with your cheese stock ID
    //         quantity: 0.15 // 150 grams of cheese per pizza
    //       }
    //     ]
    //   }
    // ).subscribe(response => {
    //   console.log('='.repeat(60));
    //   console.log('RESPONSE RECEIVED:');
    //   console.log('='.repeat(60));
    //   console.log('Status:', response.status);
    //   console.log('Message:', response.message);
    // });
  }
}