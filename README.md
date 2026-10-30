# Exercise: Product Reviews

Exercise code for the lesson **Exercise: Product Reviews** in the C# Full-Stack Bootcamp on [ask-codey.com](https://www.ask-codey.com).

Northwind's customers want to review the products. You'll build the reviews page for Chai out of four components that talk to each other with inputs and outputs: a star rating, a list of reviews, a form, and the page that puts them together.

## What's here

An Angular 22 app, with Bootstrap.

- `src/app/review.ts`: a review. Ready to use.
- `src/app/star-rating/`: five stars for a rating, which can also be clicked to choose one.
- `src/app/review-list/`: the list of reviews.
- `src/app/review-form/`: the form for writing a review.
- `src/app/product-reviews/`: the page, which holds the reviews and puts the others together.
- `src/app/reviews.spec.ts`: tests for all four. You don't need to change these.

Each component's requirements are in the comment at the top of its `.ts` file.

## Getting started

```bash
npm install
npm test
```

## What to do

Finish the four components, in this order: `StarRating`, `ReviewList`, `ReviewForm`, then `ProductReviews`. Run `npm test` as you go. Then run the app with `ng serve` and try it at http://localhost:4200.

## Tips

- `input.required<number>()`, `input(false)` and `output<number>()` declare inputs and outputs; `emit` sends a message.
- A parent passes inputs with `[rating]="..."`, and listens with `(rated)="..."`, where `$event` is what was sent.
- `Math.round` rounds to the nearest whole number, so a `computed` can work out how many stars to fill.
- `@for (star of stars; track star)` over `[1, 2, 3, 4, 5]` draws the stars.
- The `number: '1.1-1'` pipe (`DecimalPipe`, from `@angular/common`) shows a number with one decimal place.
- A component can only use the components in its own `imports`.

## Hand it in

When it works, push your solution to a public repo of your own on GitHub, then paste that repo's address into **Submit your exercise** on the lesson page at [ask-codey.com](https://www.ask-codey.com). That's what completes the lesson. The lesson page shows the Git commands, step by step.
