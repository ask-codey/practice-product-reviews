import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductReviews } from './product-reviews/product-reviews';
import { ReviewForm } from './review-form/review-form';
import { ReviewList } from './review-list/review-list';
import { StarRating } from './star-rating/star-rating';

// These tests use the components the way the page does: giving them inputs, clicking, typing, and listening
// to their outputs. Run them with: npm test. You don't need to change this file.

// Listens to a component's output, if it has one, and collects what it sends.
function listen(fixture: ComponentFixture<unknown>, name: string): unknown[] {
  const output = (fixture.componentInstance as Record<string, any>)[name];
  expect(output?.subscribe, `the component should have an output called ${name}`).toBeTypeOf('function');
  const sent: unknown[] = [];
  output.subscribe((value: unknown) => sent.push(value));
  return sent;
}

const stars = (el: Element) => [...el.querySelectorAll('button.star')] as HTMLButtonElement[];
const filled = (el: Element) => stars(el).filter(s => s.classList.contains('on')).length;

describe('StarRating', () => {
  async function create(rating: number, editable?: boolean) {
    const fixture = TestBed.createComponent(StarRating);
    fixture.componentRef.setInput('rating', rating);
    if (editable !== undefined) {
      fixture.componentRef.setInput('editable', editable);
    }
    await fixture.whenStable();
    return fixture;
  }

  it('fills in as many stars as the rating', async () => {
    const fixture = await create(3);
    const el = fixture.nativeElement as HTMLElement;
    expect(stars(el)).toHaveLength(5);
    expect(filled(el)).toBe(3);
    expect(stars(el).map(s => s.textContent?.trim()).join('')).toBe('★★★☆☆');
  });

  it('rounds a rating to the nearest whole star', async () => {
    expect(filled((await create(4.4)).nativeElement)).toBe(4);
    expect(filled((await create(4.5)).nativeElement)).toBe(5);
  });

  it('when editable, sends the star clicked', async () => {
    const fixture = await create(0, true);
    const sent = listen(fixture, 'rated');
    stars(fixture.nativeElement)[3].click();
    expect(sent).toEqual([4]);
  });

  it("isn't editable unless it's told to be", async () => {
    const fixture = await create(2);
    expect(stars(fixture.nativeElement)).toHaveLength(5);
    expect(stars(fixture.nativeElement).every(s => s.disabled)).toBe(true);
  });
});

describe('ReviewList', () => {
  it('shows each review with its name, stars and comment', async () => {
    const fixture = TestBed.createComponent(ReviewList);
    fixture.componentRef.setInput('reviews', [
      { reviewer: 'Ada', rating: 5, comment: 'Lovely.' },
      { reviewer: 'Linus', rating: 2, comment: 'Not for me.' }
    ]);
    await fixture.whenStable();
    const items = [...(fixture.nativeElement as HTMLElement).querySelectorAll('li.review')];
    expect(items.map(li => li.querySelector('strong')?.textContent?.trim())).toEqual(['Ada', 'Linus']);
    expect(items.map(li => li.querySelector('p')?.textContent?.trim())).toEqual(['Lovely.', 'Not for me.']);
    expect(items.map(li => filled(li))).toEqual([5, 2]);
  });

  it('says so when there are no reviews', async () => {
    const fixture = TestBed.createComponent(ReviewList);
    fixture.componentRef.setInput('reviews', []);
    await fixture.whenStable();
    expect((fixture.nativeElement as HTMLElement).querySelector('li.no-reviews')?.textContent?.trim()).toBe('No reviews yet');
  });
});

describe('ReviewForm', () => {
  let fixture: ComponentFixture<ReviewForm>;
  let el: HTMLElement;
  let sent: unknown[];

  beforeEach(async () => {
    fixture = TestBed.createComponent(ReviewForm);
    el = fixture.nativeElement as HTMLElement;
    await fixture.whenStable();
    sent = listen(fixture, 'submitted');
  });

  async function fill(name: string, comment: string, rating: number) {
    const reviewer = el.querySelector('#reviewer') as HTMLInputElement;
    const text = el.querySelector('#comment') as HTMLTextAreaElement;
    expect(reviewer, 'a text box with the id reviewer').toBeTruthy();
    expect(text, 'a textarea with the id comment').toBeTruthy();
    reviewer.value = name;
    reviewer.dispatchEvent(new Event('input'));
    text.value = comment;
    text.dispatchEvent(new Event('input'));
    if (rating > 0) {
      stars(el)[rating - 1].click();
    }
    await fixture.whenStable();
  }

  async function submit() {
    const button = el.querySelector('#submit-review') as HTMLButtonElement;
    expect(button, 'a button with the id submit-review').toBeTruthy();
    button.click();
    await fixture.whenStable();
  }

  it('sends the review, trimmed', async () => {
    await fill('  Grace ', ' Smooth and warm. ', 4);
    await submit();
    expect(sent).toEqual([{ reviewer: 'Grace', rating: 4, comment: 'Smooth and warm.' }]);
  });

  it('empties the form after sending', async () => {
    await fill('Grace', 'Smooth.', 4);
    await submit();
    expect((el.querySelector('#reviewer') as HTMLInputElement).value).toBe('');
    expect((el.querySelector('#comment') as HTMLTextAreaElement).value).toBe('');
    expect(filled(el)).toBe(0);
    expect(el.querySelector('.error')).toBeNull();
  });

  it('refuses a review without a rating, or without a name', async () => {
    await fill('Grace', 'No stars', 0);
    await submit();
    expect(el.querySelector('.error')?.textContent?.trim()).toBe('Please give your name and a rating');
    await fill('   ', 'No name', 3);
    await submit();
    expect(sent).toEqual([]);
  });
});

describe('ProductReviews', () => {
  let fixture: ComponentFixture<ProductReviews>;
  let el: HTMLElement;

  beforeEach(async () => {
    fixture = TestBed.createComponent(ProductReviews);
    el = fixture.nativeElement as HTMLElement;
    await fixture.whenStable();
  });

  it('shows the reviews, their summary, and the average in stars', () => {
    expect(el.querySelector('#summary')?.textContent?.trim()).toBe('2 reviews, average 4.0');
    expect(filled(el.querySelector('#average')!)).toBe(4);
    expect([...el.querySelectorAll('li.review strong')].map(s => s.textContent?.trim())).toEqual(['Ada', 'Grace']);
  });

  it('adds a review written in the form', async () => {
    const reviewer = el.querySelector('app-review-form #reviewer') as HTMLInputElement;
    expect(reviewer, 'an <app-review-form> on the page').toBeTruthy();
    reviewer.value = 'Linus';
    reviewer.dispatchEvent(new Event('input'));
    stars(el.querySelector('app-review-form')!)[2].click();
    await fixture.whenStable();
    (el.querySelector('#submit-review') as HTMLButtonElement).click();
    await fixture.whenStable();
    expect([...el.querySelectorAll('li.review strong')].map(s => s.textContent?.trim())).toEqual(['Ada', 'Grace', 'Linus']);
    expect(el.querySelector('#summary')?.textContent?.trim()).toBe('3 reviews, average 3.7');
  });
});
