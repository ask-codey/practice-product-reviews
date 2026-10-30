import { Component } from '@angular/core';

// The form for writing a review.
//
// Requirements:
// - An output, submitted, whose messages carry a Review (from ../review.ts).
// - A text box with the id reviewer for the name, a <textarea> with the id comment, and an
//   <app-star-rating> the reviewer can click to choose a rating (editable; it starts at 0 stars).
// - A button with the id submit-review ("Add review"). Clicking it:
//   - with no name (after trimming the spaces) or no rating, shows <p class="error">Please give your name
//     and a rating</p>, and emits nothing;
//   - otherwise emits the review on submitted (name and comment trimmed), then empties the form: no name,
//     no comment, 0 stars, and no error.
@Component({
  imports: [],
  selector: 'app-review-form',
  templateUrl: './review-form.html',
})
export class ReviewForm {
  // TODO: the output, the form's signals, and submit.
}
