import { HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest, HttpResponse } from "@angular/common/http";
import { delay, Observable, of } from "rxjs";
import { products } from "../mock-data/product-data";
import { Product } from "../models/product.models";

export const mockBackendInterceptor: HttpInterceptorFn = 
  (req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> => {
   
    if (req.url.includes('api/products')) {
      switch (req.method) {
        case 'GET':
          return of(new HttpResponse({ status: 200, body: products })).pipe(delay(500));

        case 'POST':
          let product = req.body as Product;
          let arr = [...products];
          arr.push(product);
          return of(new HttpResponse({ status: 201, body: arr })).pipe(delay(500));

        case 'PUT':
          const updatedProduct = req.body as Product;
          const index = products.findIndex(p => p.id === updatedProduct.id);

          if (index !== -1) {
            products[index] = updatedProduct;
            return of(new HttpResponse({ status: 200, body: updatedProduct })).pipe(delay(500));
          } else {
            return of(new HttpResponse({ status: 404 })).pipe(delay(500));
          }

        case 'DELETE':
          const indexToDelete: number = products.findIndex(p => p.id === Number(req.url.split('/').pop()));

          if (indexToDelete !== -1) {
            products.splice(indexToDelete, 1);
            return of(new HttpResponse({ status: 204 })).pipe(delay(500));
          } else {
            return of(new HttpResponse({ status: 404 })).pipe(delay(500));
          }
      }
    }
  return next(req)
}