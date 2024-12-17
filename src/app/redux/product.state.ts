import { products } from "../core/mock-data/product-data";
import { Product } from "../core/models/product.models";

export interface ProductState {
  products: Product[];
  isLoading: boolean;
  error: string | null;
}

export const initialState: ProductState = {
  products: products,
  isLoading: false,
  error: null,
};