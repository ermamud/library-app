import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Book, BookCRUD, BookFilter, BookResult } from '../types';

@Injectable()
export class BookService {
  constructor(private httpClient: HttpClient) {}

  getAllBooks(filter: BookFilter): Observable<BookResult> {
    let params = new HttpParams();
    params = params.append('skip', filter.skip);
    params = params.append('take', filter.take);
    params = filter.search ? params.append('search', filter.search) : params;
    params = filter.sortField
      ? params.append('sortField', filter.sortField)
      : params;

    return this.httpClient.get<BookResult>('books', { params });
  }

  getBook(id: string): Observable<Book> {
    return this.httpClient.get<Book>(`books/${id}`);
  }

  deleteBook(id: string): Observable<void> {
    return this.httpClient.delete<void>(`books/${id}`);
  }

  createBook(data: BookCRUD): Observable<Book> {
    return this.httpClient.post<Book>('books', {
      title: data.title,
      description: data.description,
      author: data.author,
    });
  }

  editBook(id: string, data: BookCRUD): Observable<Book> {
    return this.httpClient.put<Book>(`books/${id}`, {
      title: data.title,
      description: data.description,
      author: data.author,
    });
  }
}
