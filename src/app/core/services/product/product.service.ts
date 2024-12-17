import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../../models/product.models';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  apiUrl = 'api/products';
  readonly #httpClient = inject(HttpClient);
  readonly #store = inject(Store)

  getProducts(): Observable<Product[]> {
    return this.#httpClient.get<Product[]>(this.apiUrl);
  }

  createProduct(product: Product): Observable<Product> {
    return this.#httpClient.post<Product>(this.apiUrl, product);
  }

  updateProduct(product: Product): Observable<Product> {
    return this.#httpClient.put<Product>(`${this.apiUrl}/${product.id}`, product);
  }

  deleteProduct(id: number): Observable<void> {
    return this.#httpClient.delete<void>(`${this.apiUrl}/${id}`);
  }
}


