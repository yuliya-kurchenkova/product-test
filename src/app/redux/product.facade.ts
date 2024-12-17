import { inject, Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { productActions } from "./product.actions";
import { Product } from "../core/models/product.models";
import { selectProducts } from "./product.selectors";

@Injectable({
  providedIn: "root",
})

export class ProductFacadeService {
  readonly #store = inject(Store);
  public products$ = this.#store.select(selectProducts)

  public getProduct(): void {
    this.#store.dispatch(productActions.loadProducts())
  }

  public createProduct(product: Product): void {
    this.#store.dispatch(productActions.createProduct({product}))
  }

  public updateProduct(product: Product): void {
    this.#store.dispatch(productActions.updateProduct({ product }));
  }

  public deleteProduct(id: number): void {
    this.#store.dispatch(productActions.deleteProduct({ id }));
  }
}
