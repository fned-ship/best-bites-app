import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
import { ApiResponse } from '../models/apiRes.model';
import { Order} from '../models/order.model';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = environment.serverURL;

  constructor(private http: HttpClient) {}

  /**
   * Place a new order
   * @param customerId - The customer user ID
   * @param items - Array of order items
   * @param deliveryAddress - Delivery address
   * @param customerNotes - Optional customer notes
   * @returns Observable with standardized response
   */
  placeOrder(
    customerId: string,
    items: Array<{ productId: string; quantity: number; specialInstructions?: string }>,
    deliveryAddress: string,
    customerNotes?: string
  ): Observable<ApiResponse<Order>> {
    return this.http.post<any>(`${this.apiUrl}/orders`, {
      customerId,
      items,
      deliveryAddress,
      customerNotes
    }).pipe(
      map(response => ({
        status: 201,
        data: response.order,
        message: response.message || 'Order placed successfully'
      })),
      catchError(error => of({
        status: error.status || 500,
        error: error.error?.error || 'Failed to place order'
      }))
    );
  }

  /**
   * Get all orders for a customer
   * @param customerId - The customer user ID
   * @returns Observable with standardized response containing array of orders
   */
  getCustomerOrders(customerId: string): Observable<ApiResponse<Order[]>> {
    return this.http.get<any>(`${this.apiUrl}/orders/customer/${customerId}`).pipe(
      map(response => ({
        status: 200,
        data: response.orders,
        message: 'Orders fetched successfully'
      })),
      catchError(error => of({
        status: error.status || 500,
        error: error.error?.error || 'Failed to fetch orders'
      }))
    );
  }

  /**
   * Get a single order by ID
   * @param orderId - The order ID
   * @returns Observable with standardized response containing order
   */
  getOrderById(orderId: string): Observable<ApiResponse<Order>> {
    return this.http.get<any>(`${this.apiUrl}/orders/${orderId}`).pipe(
      map(response => ({
        status: 200,
        data: response.order,
        message: 'Order fetched successfully'
      })),
      catchError(error => of({
        status: error.status || 500,
        error: error.error?.error || 'Failed to fetch order'
      }))
    );
  }

  /**
   * Update order status (Admin only)
   * @param orderId - The order ID
   * @param adminId - The admin user ID
   * @param status - New status
   * @returns Observable with standardized response
   */
  updateOrderStatus(
    orderId: string,
    adminId: string,
    status: string
  ): Observable<ApiResponse<any>> {
    return this.http.patch<any>(`${this.apiUrl}/orders/${orderId}/status`, {
      adminId,
      status
    }).pipe(
      map(response => ({
        status: 200,
        data: response.order,
        message: response.message || 'Order status updated successfully'
      })),
      catchError(error => of({
        status: error.status || 500,
        error: error.error?.error || 'Failed to update order status'
      }))
    );
  }

  /**
   * Get all orders (Admin only)
   * @param adminId - The admin user ID
   * @returns Observable with standardized response containing array of orders
   */
  getAllOrders(adminId: string): Observable<ApiResponse<Order[]>> {
    return this.http.get<any>(`${this.apiUrl}/orders?adminId=${adminId}`).pipe(
      map(response => ({
        status: 200,
        data: response.orders,
        message: 'Orders fetched successfully'
      })),
      catchError(error => of({
        status: error.status || 500,
        error: error.error?.error || 'Failed to fetch orders'
      }))
    );
  }

  /**
   * Get orders by status (Admin only)
   * @param adminId - The admin user ID
   * @param status - Order status to filter by
   * @returns Observable with standardized response containing filtered orders
   */
  getOrdersByStatus(adminId: string, status: string): Observable<ApiResponse<Order[]>> {
    return this.http.get<any>(`${this.apiUrl}/orders?adminId=${adminId}&status=${status}`).pipe(
      map(response => ({
        status: 200,
        data: response.orders,
        message: 'Orders fetched successfully'
      })),
      catchError(error => of({
        status: error.status || 500,
        error: error.error?.error || 'Failed to fetch orders'
      }))
    );
  }
}