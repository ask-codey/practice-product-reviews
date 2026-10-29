import { Component, signal } from '@angular/core';
import { Review } from '../review';

// Chai's reviews: the page that puts the other components together.
//
// Requirements:
// - Under the <h1>, a <div id="average"> holding an <app-star-rating> showing the average rating, then
//   <p id="summary"> saying "2 reviews, average 4.0" (the average with one decimal place).
// - An <app-review-list> showing the reviews.
// - An <app-review-form>. When it submits a review, the review is added to the end of the list, and the
//   average, the summary and the list all update.
@Component({
  imports: [],
  selector: 'app-product-reviews',
  templateUrl: './product-reviews.html',
})
export class ProductReviews {
  protected readonly reviews = signal<Review[]>([
    { reviewer: 'Ada', rating: 5, comment: 'Lovely, spicy chai.' },
    { reviewer: 'Grace', rating: 3, comment: 'A little sweet for me.' }
  ]);

  // TODO: the average, and adding a review.
}
