import { Component, inject } from '@angular/core';
import { ProductItemComponent } from "../../components/product-item/product-item.component";
import { AsyncPipe, CommonModule } from '@angular/common';
import { FormComponent } from "../../components/form/form.component";
import { Store } from '@ngrx/store';
import { selectProducts } from '../../../redux/product.selectors';
import { ProductFacadeService } from '../../../redux/product.facade';
import { Product } from '../../models/product.models';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ProductItemComponent, AsyncPipe, FormComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  #globalStore = inject(Store);
  #products = inject(ProductFacadeService)
  products$ = this.#globalStore.select(selectProducts);
  productToEdit!: Product | null;

  onEditProduct(product: Product) {
    this.productToEdit = { ...product };
  }

  onCreateNewProduct() {
    this.productToEdit = null;
  }

  onDeleteProduct(id: number) {
    this.#products.deleteProduct(id)
  }
}
