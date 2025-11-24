import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
import { ApiResponse } from '../models/apiRes.model';
import { DailyIncome , ProductIncomeBreakdown ,ProductOrderBreakdown } from '../models/analytics.model';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {
  private apiUrl = environment.serverURL;

  constructor(private http: HttpClient) {}

  /**
   * Get daily income report (Admin only)
   * @param adminId - The admin user ID
   * @param startDate - Start date (optional, defaults to 30 days ago)
   * @param endDate - End date (optional, defaults to today)
   * @returns Observable with standardized response containing daily income data
   */
  getDailyIncome(
    adminId: string,
    startDate?: string,
    endDate?: string
  ): Observable<ApiResponse<{ period: any; dailyIncome: DailyIncome[] }>> {
    let url = `${this.apiUrl}/analytics/daily-income?adminId=${adminId}`;
    if (startDate) url += `&startDate=${startDate}`;
    if (endDate) url += `&endDate=${endDate}`;

    return this.http.get<any>(url).pipe(
      map(response => ({
        status: 200,
        data: {
          period: response.period,
          dailyIncome: response.dailyIncome
        },
        message: 'Daily income fetched successfully'
      })),
      catchError(error => of({
        status: error.status || 500,
        error: error.error?.error || 'Failed to fetch daily income'
      }))
    );
  }

  /**
   * Get product income percentage for a month (Admin only)
   * @param adminId - The admin user ID
   * @param year - Year (optional, defaults to current year)
   * @param month - Month (optional, defaults to current month)
   * @returns Observable with standardized response containing product income breakdown
   */
  getProductIncomePercentage(
    adminId: string,
    year?: number,
    month?: number
  ): Observable<ApiResponse<{ period: any; totalIncome: number; productBreakdown: ProductIncomeBreakdown[] }>> {
    let url = `${this.apiUrl}/analytics/product-income-percentage?adminId=${adminId}`;
    if (year) url += `&year=${year}`;
    if (month) url += `&month=${month}`;

    return this.http.get<any>(url).pipe(
      map(response => ({
        status: 200,
        data: {
          period: response.period,
          totalIncome: response.totalIncome,
          productBreakdown: response.productBreakdown
        },
        message: 'Product income percentage fetched successfully'
      })),
      catchError(error => of({
        status: error.status || 500,
        error: error.error?.error || 'Failed to fetch product income percentage'
      }))
    );
  }

  /**
   * Get product order percentage for a month (Admin only)
   * @param adminId - The admin user ID
   * @param year - Year (optional, defaults to current year)
   * @param month - Month (optional, defaults to current month)
   * @returns Observable with standardized response containing product order breakdown
   */
  getProductOrderPercentage(
    adminId: string,
    year?: number,
    month?: number
  ): Observable<ApiResponse<{ period: any; totalOrders: number; totalProductInstances: number; productBreakdown: ProductOrderBreakdown[] }>> {
    let url = `${this.apiUrl}/analytics/product-order-percentage?adminId=${adminId}`;
    if (year) url += `&year=${year}`;
    if (month) url += `&month=${month}`;

    return this.http.get<any>(url).pipe(
      map(response => ({
        status: 200,
        data: {
          period: response.period,
          totalOrders: response.totalOrders,
          totalProductInstances: response.totalProductInstances,
          productBreakdown: response.productBreakdown
        },
        message: 'Product order percentage fetched successfully'
      })),
      catchError(error => of({
        status: error.status || 500,
        error: error.error?.error || 'Failed to fetch product order percentage'
      }))
    );
  }
  
}