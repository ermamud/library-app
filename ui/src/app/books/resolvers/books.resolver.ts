import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { Book } from 'src/app/types';
import { BookService } from '../book.service';

@Injectable()
export class BooksResolver implements Resolve<Book> {
  constructor(private bookService: BookService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Book> {
    const id = route.paramMap.get('id');
    return this.bookService.getBook(id);
  }
}
