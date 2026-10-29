import { Component } from '@angular/core';

// Five stars, filled in for a rating.
//
// Requirements:
// - A required input, rating: a number from 0 to 5. It can have decimals (an average, say): round it to the
//   nearest whole star, so 4.4 shows 4 stars and 4.5 shows 5.
// - An optional input, editable, false unless it's given.
// - An output, rated, whose messages carry a number from 1 to 5.
// - The template shows five <button type="button" class="star"> elements, one per star. The filled ones get
//   the class on and show ★; the others show ☆.
// - When editable, clicking star number n emits n on rated. When not editable, the buttons are disabled.
@Component({
  imports: [],
  selector: 'app-star-rating',
  styleUrl: './star-rating.css',
  templateUrl: './star-rating.html',
})
export class StarRating {
  // TODO: the inputs, the output, and what the template needs.
}
