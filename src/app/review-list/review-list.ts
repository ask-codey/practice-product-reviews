import { Component } from '@angular/core';

// The list of reviews.
//
// Requirements:
// - A required input, reviews: the Review[] to show (Review is in ../review.ts).
// - One <li class="review"> per review, in order, holding the reviewer's name in a <strong>, an
//   <app-star-rating> showing the review's rating (not editable), and the comment in a <p>.
// - With no reviews, one <li class="no-reviews"> saying "No reviews yet".
@Component({
  imports: [],
  selector: 'app-review-list',
  templateUrl: './review-list.html',
})
export class ReviewList {
  // TODO: the input.
}
