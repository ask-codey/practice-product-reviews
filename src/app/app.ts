import { Component } from '@angular/core';
import { ProductReviews } from './product-reviews/product-reviews';

@Component({
  imports: [ProductReviews],
  selector: 'app-root',
  template: `
    <main class="container py-4" style="max-width: 40rem;">
      <app-product-reviews />
    </main>
  `,
})
export class App {}
