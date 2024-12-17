import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { Product } from "../core/models/product.models";


export const productActions = createActionGroup({
  source: 'Product Store',
  events: {
    'Load Products': emptyProps(),
    'Load Products Failure': props<{ error: string }>(),
    'Load Products Success': props<{ product: Product[]} >(),
    'Create Product': props<{ product: Product }>(),
    'Create Product Success': props<{ product: Product }>(),
    'Create Product Failure': props<{ error: string }>(),
    'Update Product': props<{ product: Product }>(),
    'Update Product Success': props<{ product: Product }>(),
    'Update Product Failure': props<{ error: string }>(),
    'Delete Product': props<{ id: any }>(),
    'Delete Product Success': emptyProps(),
    'Delete Product Failure': props<{ error: string }>(),
  }
})