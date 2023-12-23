import { TestBed } from '@angular/core/testing';

import { BooksResolver } from './books.resolver';

describe('BooksResolver', () => {
  let resolver: BooksResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(BooksResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
