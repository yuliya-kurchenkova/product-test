import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, mergeMap, of, switchMap } from "rxjs";
import { productActions } from "./product.actions";
import { ProductService } from "../core/services/product/product.service";


@Injectable()
export class ProductEffects {
  actions$ = inject(Actions)
  productService = inject(ProductService);

  loadProducts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(productActions.loadProducts),
      switchMap(() => {
        return this.productService.getProducts().pipe(
          map(() => {
            return productActions.loadProductsSuccess({product: []})}),
          catchError((error) => of(productActions.loadProductsFailure({ error: error.message })))
        )    
      })
    )
  });

  createProduct$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(productActions.createProduct),
      switchMap((action) => {
        return this.productService.createProduct(action.product).pipe(
          map((product) => productActions.createProductSuccess({ product })),
          catchError((error) => of(productActions.createProductFailure({ error: error.message })))
          )
        })
      )
  });

  updateProduct$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(productActions.updateProduct),
      switchMap((action) => {
        return this.productService.updateProduct(action.product).pipe(
          map((product) => productActions.updateProductSuccess({ product })),
          catchError((error) => of(productActions.updateProductFailure({ error: error.message })))
        );
      })
    );
  });

  deleteProduct$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(productActions.deleteProduct),
      switchMap((action) => {
        return this.productService.deleteProduct(action.id).pipe(
          map(() => productActions.deleteProductSuccess()),
          catchError((error) => of(productActions.deleteProductFailure({ error: error.message })))
        );
      })
    );
  });

}