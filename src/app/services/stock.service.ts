import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
import { ApiResponse } from '../models/apiRes.model';
import { Stock } from '../models/stock.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StockService {
  private apiUrl =environment.serverURL;

  constructor(private http: HttpClient) {}

  /**
   * Get all stocks
   * @returns array of stocks
   */
  getStocks(): Observable<ApiResponse<Stock[]>> {
    return this.http.get<any>(`${this.apiUrl}/stocks`).pipe(
      map(response => ({
        status: 200,
        data: response.stocks,
        message: 'Stocks fetched successfully'
      })),
      catchError(error => of({
        status: error.status || 500,
        error: error.error?.error || 'Failed to fetch stocks'
      }))
    );
  }

  /**
   * Get a single stock by ID
   * @param stockId - The stock ID
   * @returns Observable with standardized response containing stock
   */
  getStockById(stockId: string): Observable<ApiResponse<Stock>> {
    return this.http.get<any>(`${this.apiUrl}/stocks/${stockId}`).pipe(
      map(response => ({
        status: 200,
        data: response.stock,
        message: 'Stock fetched successfully'
      })),
      catchError(error => of({
        status: error.status || 500,
        error: error.error?.error || 'Failed to fetch stock'
      }))
    );
  }

  /**
   * Add a new stock (Admin only)
   * @param adminId - The admin user ID
   * @param stockData - Stock details
   * @returns Observable with standardized response
   */
  addStock(adminId: string, stockData: Partial<Stock>): Observable<ApiResponse<Stock>> {
    return this.http.post<any>(`${this.apiUrl}/stocks`, {
      adminId,
      ...stockData
    }).pipe(
      map(response => ({
        status: 201,
        data: response.stock,
        message: response.message || 'Stock added successfully'
      })),
      catchError(error => of({
        status: error.status || 500,
        error: error.error?.error || 'Failed to add stock'
      }))
    );
  }

  /**
   * Update an existing stock (Admin only)
   * @param stockId - The stock ID
   * @param adminId - The admin user ID
   * @param updateData - Updated stock details
   * @returns Observable with standardized response
   */
  updateStock(stockId: string, adminId: string, updateData: Partial<Stock>): Observable<ApiResponse<Stock>> {
    return this.http.put<any>(`${this.apiUrl}/stocks/${stockId}`, {
      adminId,
      ...updateData
    }).pipe(
      map(response => ({
        status: 200,
        data: response.stock,
        message: response.message || 'Stock updated successfully'
      })),
      catchError(error => of({
        status: error.status || 500,
        error: error.error?.error || 'Failed to update stock'
      }))
    );
  }

  /**
   * Delete a stock (Admin only)
   * @param stockId - The stock ID
   * @param adminId - The admin user ID
   * @returns Observable with standardized response
   */
  deleteStock(stockId: string, adminId: string): Observable<ApiResponse<any>> {
    return this.http.delete<any>(`${this.apiUrl}/stocks/${stockId}`, {
      body: { adminId }
    }).pipe(
      map(response => ({
        status: 200,
        data: response.stock,
        message: response.message || 'Stock deleted successfully'
      })),
      catchError(error => of({
        status: error.status || 500,
        error: error.error?.error || 'Failed to delete stock'
      }))
    );
  }

  /**
   * Get low stock items (stocks below minimum threshold)
   * @returns Observable with standardized response containing low stock items
   */
  getLowStockItems(): Observable<ApiResponse<Stock[]>> {
    return this.getStocks().pipe(
      map(response => {
        if (response.data) {
          const lowStockItems = response.data.filter(
            stock => stock.status === 'low_stock' || stock.status === 'out_of_stock'
          );
          return {
            status: 200,
            data: lowStockItems,
            message: 'Low stock items fetched successfully'
          };
        }
        return response;
      })
    );
  }
}