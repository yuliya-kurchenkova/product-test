import { ChangeDetectionStrategy, Component, inject, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductFacadeService } from '../../../redux/product.facade';
import { Product } from '../../models/product.models';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormComponent implements OnChanges {
  @Input() productToEdit: Product | null = null;
  #products = inject(ProductFacadeService);
  productWithId!: Product;

  form: FormGroup = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(20)
    ]),
    description: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(20)
    ]),
    price: new FormControl('',  [
      Validators.required,
      Validators.pattern("^[0-9]*$"),
      Validators.maxLength(5)
    ]),
  })

  ngOnChanges(changes: SimpleChanges) { 
    if (changes['productToEdit'] && this.productToEdit) {
      this.initializeForm(this.productToEdit);
    } else if (changes['productToEdit'] && !this.productToEdit) {
      this.form.reset();
    }
  }

  initializeForm(product: Product | undefined) {
    if (product) {
      this.form.patchValue({
        name: product.name,
        description: product.description,
        price: product.price,
      });
    }
  }

  getErrorMessage(controlName: string): string | null {
    const control = this.form.get(controlName);
    if (control?.invalid && (control?.touched || control?.dirty)) {
      if (control.errors?.['required']) {
        return `${controlName.charAt(0).toUpperCase() + controlName.slice(1)} is required.`;
      }
      if (control.errors?.['minlength']) {
        return `Minimum length is ${control.errors['minlength'].requiredLength} characters.`;
      }
      if (control.errors?.['maxlength']) {
        return `Maximum length is ${control.errors['maxlength'].requiredLength} characters.`;
      }
      if (control.errors?.['pattern']) {
        return `${controlName.charAt(0).toUpperCase() + controlName.slice(1)} must be a number.`;
      }
    }
    return null;
  }

  onSubmit() {
    this.#products.products$.subscribe(
      products => {
        this.productWithId = { ...this.form.value, id: products.length + 1 }
      }
    )
    
    if (this.form.valid) {
      if (this.productToEdit) {

        let updateData = {
          ...this.form.value,
          id: this.productToEdit.id
        };
        
        this.#products.updateProduct(updateData);
      } else {
        this.#products.createProduct(this.productWithId)
      }
      this.form.reset();
    }
  }
}
