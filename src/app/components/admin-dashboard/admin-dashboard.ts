import { Component, OnInit , Input } from '@angular/core';
import { AnalyticsService } from '../../services/analytics.service';
import { NgChartsModule } from 'ng2-charts';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.html',
  imports: [NgChartsModule,CommonModule, FormsModule,ReactiveFormsModule , HttpClientModule,RouterModule],
  styleUrls: ['./admin-dashboard.css']
})
export class AdminDashboard implements OnInit {

  @Input() adminId!: string;
  

  loadingDailyIncome = false;
  loadingProductIncome = false;
  loadingProductOrders = false;
  

  errorDailyIncome = '';
  errorProductIncome = '';
  errorProductOrders = '';
  

  currentYear = new Date().getFullYear();
  currentMonth = new Date().getMonth() + 1;
  

  dailyIncomeChartData: any;
  dailyIncomeChartOptions: any;
  

  productIncomeChartData: any;
  productIncomeChartOptions: any;
  totalIncome = 0;
  

  productOrderChartData: any;
  productOrderChartOptions: any;
  totalOrders = 0;

  constructor(private analyticsService: AnalyticsService) {
    this.initializeChartOptions();
  }

  ngOnInit() {
    this.loadAllAnalytics();
  }


  loadAllAnalytics() {
    this.loadDailyIncome();
    this.loadProductIncomePercentage();
    this.loadProductOrderPercentage();
  }


  initializeChartOptions() {

    this.dailyIncomeChartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true,
          position: 'top'
        },
        title: {
          display: true,
          text: 'Daily Income (Last 30 Days)',
          font: {
            size: 16
          }
        },
        tooltip: {
          callbacks: {
            label: (context: any) => {
              return `Income: $${context.parsed.y.toFixed(2)}`;
            }
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            callback: (value: any) => '$' + value
          }
        }
      }
    };


    this.productIncomeChartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true,
          position: 'right'
        },
        title: {
          display: true,
          text: 'Product Income Distribution',
          font: {
            size: 16
          }
        },
        tooltip: {
          callbacks: {
            label: (context: any) => {
              const label = context.label || '';
              const value = context.parsed || 0;
              return `${label}: ${value}%`;
            }
          }
        }
      }
    };


    this.productOrderChartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true,
          position: 'right'
        },
        title: {
          display: true,
          text: 'Product Order Distribution',
          font: {
            size: 16
          }
        },
        tooltip: {
          callbacks: {
            label: (context: any) => {
              const label = context.label || '';
              const value = context.parsed || 0;
              return `${label}: ${value}%`;
            }
          }
        }
      }
    };
  }


  loadDailyIncome() {
    this.loadingDailyIncome = true;
    this.errorDailyIncome = '';

    this.analyticsService.getDailyIncome(this.adminId).subscribe(response => {
      this.loadingDailyIncome = false;

      if (response.status === 200 && response.data) {
        const dailyIncome = response.data.dailyIncome;
        

        const labels = dailyIncome.map((day: any) => {
          const date = new Date(day.date);
          return `${date.getMonth() + 1}/${date.getDate()}`;
        });
        
        const incomeData = dailyIncome.map((day: any) => day.totalIncome);

        this.dailyIncomeChartData = {
          labels: labels,
          datasets: [
            {
              label: 'Daily Income',
              data: incomeData,
              fill: true,
              borderColor: '#4CAF50',
              backgroundColor: 'rgba(76, 175, 80, 0.2)',
              tension: 0.4
            }
          ]
        };
      } else {
        this.errorDailyIncome = response.error || 'Failed to load daily income';
      }
    });
  }


  loadProductIncomePercentage() {
    this.loadingProductIncome = true;
    this.errorProductIncome = '';

    this.analyticsService.getProductIncomePercentage(
      this.adminId,
      this.currentYear,
      this.currentMonth
    ).subscribe(response => {
      this.loadingProductIncome = false;

      if (response.status === 200 && response.data) {
        this.totalIncome = response.data.totalIncome;
        const products = response.data.productBreakdown;
        

        const top5 = products.slice(0, 5);
        const others = products.slice(5);
        const othersPercentage = others.reduce((sum: number, p: any) => sum + p.percentage, 0);

        const labels = top5.map((p: any) => p.name);
        const percentages = top5.map((p: any) => p.percentage);

        if (othersPercentage > 0) {
          labels.push('Others');
          percentages.push(othersPercentage);
        }


        const colors = this.generateColors(labels.length);

        this.productIncomeChartData = {
          labels: labels,
          datasets: [
            {
              data: percentages,
              backgroundColor: colors,
              hoverBackgroundColor: colors.map(c => this.lightenColor(c))
            }
          ]
        };
      } else {
        this.errorProductIncome = response.error || 'Failed to load product income';
      }
    });
  }


  loadProductOrderPercentage() {
    this.loadingProductOrders = true;
    this.errorProductOrders = '';

    this.analyticsService.getProductOrderPercentage(
      this.adminId,
      this.currentYear,
      this.currentMonth
    ).subscribe(response => {
      this.loadingProductOrders = false;

      if (response.status === 200 && response.data) {
        this.totalOrders = response.data.totalOrders;
        const products = response.data.productBreakdown;
        

        const top5 = products.slice(0, 5);
        const others = products.slice(5);
        const othersPercentage = others.reduce((sum: number, p: any) => sum + p.percentage, 0);

        const labels = top5.map((p: any) => p.name);
        const percentages = top5.map((p: any) => p.percentage);

        if (othersPercentage > 0) {
          labels.push('Others');
          percentages.push(othersPercentage);
        }


        const colors = this.generateColors(labels.length);

        this.productOrderChartData = {
          labels: labels,
          datasets: [
            {
              data: percentages,
              backgroundColor: colors,
              hoverBackgroundColor: colors.map(c => this.lightenColor(c))
            }
          ]
        };
      } else {
        this.errorProductOrders = response.error || 'Failed to load product orders';
      }
    });
  }


  onMonthChange(month: number) {
    this.currentMonth = month;
    this.loadProductIncomePercentage();
    this.loadProductOrderPercentage();
  }

  onYearChange(year: number) {
    this.currentYear = year;
    this.loadProductIncomePercentage();
    this.loadProductOrderPercentage();
  }


  generateColors(count: number): string[] {
    const baseColors = [
      '#FF6384',
      '#36A2EB',
      '#FFCE56',
      '#4BC0C0',
      '#9966FF',
      '#FF9F40',
      '#FF6384',
      '#C9CBCF'
    ];
    return baseColors.slice(0, count);
  }


  lightenColor(color: string): string {
    const percent = 20;
    const num = parseInt(color.replace('#', ''), 16);
    const amt = Math.round(2.55 * percent);
    const R = (num >> 16) + amt;
    const G = (num >> 8 & 0x00FF) + amt;
    const B = (num & 0x0000FF) + amt;
    return '#' + (
      0x1000000 +
      (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
      (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 +
      (B < 255 ? (B < 1 ? 0 : B) : 255)
    ).toString(16).slice(1);
  }


  getMonths(): Array<{value: number, name: string}> {
    return [
      { value: 1, name: 'January' },
      { value: 2, name: 'February' },
      { value: 3, name: 'March' },
      { value: 4, name: 'April' },
      { value: 5, name: 'May' },
      { value: 6, name: 'June' },
      { value: 7, name: 'July' },
      { value: 8, name: 'August' },
      { value: 9, name: 'September' },
      { value: 10, name: 'October' },
      { value: 11, name: 'November' },
      { value: 12, name: 'December' }
    ];
  }


  getYears(): number[] {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let i = currentYear; i >= currentYear - 5; i--) {
      years.push(i);
    }
    return years;
  }
}