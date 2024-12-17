import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ProductState } from "./product.state";

export const selectProductsFeature = createFeatureSelector<ProductState>('Product Store');
export const selectProducts = createSelector(selectProductsFeature, (state: ProductState) => state.products)