import { createFeature, createReducer, on } from "@ngrx/store";
import { productActions } from "./product.actions";
import { initialState } from "./product.state";


export const productFeature = createFeature({
  name: 'Product Store',
  reducer: createReducer(
    initialState,
    on(productActions.loadProducts, (state) => ({ ...state, isLoading: true })),
    on(productActions.loadProductsSuccess, (state, { product }) => ({
      ...state,
      isLoading: false,
      product
    })),
    on(productActions.loadProductsFailure, (state, { error }) => ({
      ...state,
      isLoading: false,
      error,
    })),
    on(productActions.createProduct, (state, { product }) => {
      const products = [...state.products]
      products.push(product)
      return { ...state, products}}),
    on(productActions.createProductSuccess, (state) => ({
      ...state,
      isLoading: false,
    })),
    on(productActions.createProductFailure, (state, { error }) => ({
      ...state,
      isLoading: false,
      error,
    })),
    on(productActions.updateProduct, (state, { product }) => {
      const products = state.products.map(p => p.id === product.id ? product : p);
      return { ...state, products };
    }),
    on(productActions.updateProductSuccess, (state) => ({
      ...state,
      isLoading: false,
    })),
    on(productActions.updateProductFailure, (state, { error }) => ({
      ...state,
      isLoading: false,
      error,
    })),
    on(productActions.deleteProduct, (state, { id }) => {
      const products = state.products.filter(p => p.id !== id);
      return { ...state, products };
    }),
  ),
})

export const {
  name: productFeatureKey,
  reducer: productReducer,
  selectProducts,
} = productFeature