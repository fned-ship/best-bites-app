import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { io, Socket } from 'socket.io-client';
import { Subject } from 'rxjs';
import { environment } from '../../environments/environment';
import { Order } from '../models/order.model';
import { ApiResponse } from '../models/apiRes.model';

@Injectable({
  providedIn: 'root'
})
export class DelivererService {
  private apiUrl = environment.serverURL;
  private socket: Socket;
  
  // Observables for real-time updates
  public orderTaken$ = new Subject<any>();
  public orderReleased$ = new Subject<any>();
  public orderDelivered$ = new Subject<any>();

  constructor(private http: HttpClient) {
    // Initialize Socket.IO connection
    this.socket = io( environment.serverURL);
    
    // Listen to socket events
    this.setupSocketListeners();
  }

  // Setup socket event listeners
  private setupSocketListeners() {
    this.socket.on('connect', () => {
      console.log('Socket connected:', this.socket.id);
    });

    this.socket.on('order:taken', (data) => {
      console.log('Order taken:', data);
      this.orderTaken$.next(data);
    });

    this.socket.on('order:released', (data) => {
      console.log('Order released:', data);
      this.orderReleased$.next(data);
    });

    this.socket.on('order:delivered', (data) => {
      console.log('Order delivered:', data);
      this.orderDelivered$.next(data);
    });

    this.socket.on('disconnect', () => {
      console.log('Socket disconnected');
    });
  }

  // Join deliverer room
  joinDelivererRoom(delivererId: string) {
    this.socket.emit('deliverer:join', delivererId);
  }

  // Leave deliverer room
  leaveDelivererRoom(delivererId: string) {
    this.socket.emit('deliverer:leave', delivererId);
  }

  // Get available orders for delivery
  getAvailableOrders(delivererId: string): Observable<ApiResponse<Order[]>> {
    return this.http.get<any>(`${this.apiUrl}/deliverer/available-orders?delivererId=${delivererId}`).pipe(
      map(response => ({
        status: 200,
        data: response.orders,
        message: response.message
      })),
      catchError(error => of({
        status: error.status || 500,
        error: error.error?.error || 'Failed to fetch available orders'
      }))
    );
  }

  // Take an order
  takeOrder(orderId: string, delivererId: string): Observable<ApiResponse<Order>> {
    return this.http.post<any>(`${this.apiUrl}/deliverer/take-order/${orderId}`, {
      delivererId
    }).pipe(
      map(response => ({
        status: 200,
        data: response.order,
        message: response.message
      })),
      catchError(error => of({
        status: error.status || 500,
        error: error.error?.error || 'Failed to take order'
      }))
    );
  }

  // Release an order
  releaseOrder(orderId: string, delivererId: string): Observable<ApiResponse<Order>> {
    return this.http.post<any>(`${this.apiUrl}/deliverer/release-order/${orderId}`, {
      delivererId
    }).pipe(
      map(response => ({
        status: 200,
        data: response.order,
        message: response.message
      })),
      catchError(error => of({
        status: error.status || 500,
        error: error.error?.error || 'Failed to release order'
      }))
    );
  }

  // Mark order as delivered
  markAsDelivered(orderId: string, delivererId: string): Observable<ApiResponse<Order>> {
    return this.http.post<any>(`${this.apiUrl}/deliverer/mark-delivered/${orderId}`, {
      delivererId
    }).pipe(
      map(response => ({
        status: 200,
        data: response.order,
        message: response.message
      })),
      catchError(error => of({
        status: error.status || 500,
        error: error.error?.error || 'Failed to mark order as delivered'
      }))
    );
  }

  // Get deliverer's active orders
  getMyOrders(delivererId: string): Observable<ApiResponse<Order[]>> {
    return this.http.get<any>(`${this.apiUrl}/deliverer/my-orders/${delivererId}`).pipe(
      map(response => ({
        status: 200,
        data: response.orders,
        message: response.message
      })),
      catchError(error => of({
        status: error.status || 500,
        error: error.error?.error || 'Failed to fetch your orders'
      }))
    );
  }

  // Disconnect socket
  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }
}