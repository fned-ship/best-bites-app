import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
import { ApiResponse } from '../models/apiRes.model';
import { Product } from '../models/product.model';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = environment.serverURL; // Change this to your API URL

  constructor(private http: HttpClient) {}

  /**
   * Get all products with populated stock details
   * @returns Observable with standardized response containing array of products
   */
  getProducts(): Observable<ApiResponse<Product[]>> {
    return this.http.get<any>(`${this.apiUrl}/products`).pipe(
      map(response => ({
        status: 200,
        data: response.products,
        message: 'Products fetched successfully'
      })),
      catchError(error => of({
        status: error.status || 500,
        error: error.error?.error || 'Failed to fetch products'
      }))
    );
  }

  /**
   * Get a single product by ID
   * @param productId - The product ID
   * @returns Observable with standardized response containing product
   */
  getProductById(productId: string): Observable<ApiResponse<Product>> {
    return this.http.get<any>(`${this.apiUrl}/products/${productId}`).pipe(
      map(response => ({
        status: 200,
        data: response.product,
        message: 'Product fetched successfully'
      })),
      catchError(error => of({
        status: error.status || 500,
        error: error.error?.error || 'Failed to fetch product'
      }))
    );
  }

  /**
   * Add a new product (Admin only)
   * @param adminId - The admin user ID
   * @param productData - Product details
   * @returns Observable with standardized response
   */
  addProduct(adminId: string, productData: Partial<Product>): Observable<ApiResponse<Product>> {
    return this.http.post<any>(`${this.apiUrl}/products`, {
      adminId,
      ...productData
    }).pipe(
      map(response => ({
        status: 201,
        data: response.product,
        message: response.message || 'Product added successfully'
      })),
      catchError(error => of({
        status: error.status || 500,
        error: error.error?.error || 'Failed to add product'
      }))
    );
  }

  /**
   * Update an existing product (Admin only)
   * @param productId - The product ID
   * @param adminId - The admin user ID
   * @param updateData - Updated product details
   * @returns Observable with standardized response
   */
  updateProduct(productId: string, adminId: string, updateData: Partial<Product>): Observable<ApiResponse<Product>> {
    return this.http.put<any>(`${this.apiUrl}/products/${productId}`, {
      adminId,
      ...updateData
    }).pipe(
      map(response => ({
        status: 200,
        data: response.product,
        message: response.message || 'Product updated successfully'
      })),
      catchError(error => of({
        status: error.status || 500,
        error: error.error?.error || 'Failed to update product'
      }))
    );
  }

  /**
   * Delete a product (Admin only)
   * @param productId - The product ID
   * @param adminId - The admin user ID
   * @returns Observable with standardized response
   */
  deleteProduct(productId: string, adminId: string): Observable<ApiResponse<any>> {
    return this.http.delete<any>(`${this.apiUrl}/products/${productId}`, {
      body: { adminId }
    }).pipe(
      map(response => ({
        status: 200,
        data: response.product,
        message: response.message || 'Product deleted successfully'
      })),
      catchError(error => of({
        status: error.status || 500,
        error: error.error?.error || 'Failed to delete product'
      }))
    );
  }

  /**
   * Add a rating to a product (Client only)
   * @param productId - The product ID
   * @param customerId - The customer user ID
   * @param rating - Rating value (1-5)
   * @returns Observable with standardized response
   */
  addRating(productId: string, customerId: string, rating: number): Observable<ApiResponse<any>> {
    return this.http.post<any>(`${this.apiUrl}/products/${productId}/rating`, {
      customerId,
      rating
    }).pipe(
      map(response => ({
        status: 200,
        data: response.product,
        message: response.message || 'Rating added successfully'
      })),
      catchError(error => of({
        status: error.status || 500,
        error: error.error?.error || 'Failed to add rating'
      }))
    );
  }

  /**
   * Get top 10 ordered products for a specific customer
   * @param customerId - The customer user ID
   * @returns Observable with standardized response
   */
  getTopOrderedProducts(customerId: string): Observable<ApiResponse<any[]>> {
    return this.http.post<any>(`${this.apiUrl}/products/top-ordered`, {
      customerId
    }).pipe(
      map(response => ({
        status: 200,
        data: response.topProducts,
        message: 'Top products fetched successfully'
      })),
      catchError(error => of({
        status: error.status || 500,
        error: error.error?.error || 'Failed to fetch top products'
      }))
    );
  }
}