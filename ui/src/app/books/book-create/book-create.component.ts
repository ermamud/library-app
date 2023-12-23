import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, of, tap } from 'rxjs';
import { Book } from 'src/app/types';
import { BookService } from '../book.service';

@Component({
  selector: 'app-book-create',
  templateUrl: './book-create.component.html',
  styleUrls: ['./book-create.component.scss'],
})
export class BookCreateComponent implements OnInit {
  book?: Book;
  bookFormGroup: FormGroup;
  isNew = true;
  errorMessages: string[] = [];

  constructor(
    private bookService: BookService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.book = this.route.snapshot.data.book;
    this.isNew = !this.book;
    this.bookFormGroup = new FormGroup({
      title: new FormControl(this.book?.title || '', [Validators.required]),
      description: new FormControl(this.book?.description || '', [
        Validators.required,
      ]),
      author: new FormControl(this.book?.author || '', [Validators.required]),
    });
  }

  goToList(): void {
    this.router.navigate(['/books']);
  }

  onSubmit(): void {
    if (!this.bookFormGroup.valid) {
      return;
    }

    if (this.isNew) {
      this.createBook();
    } else {
      this.editBook();
    }
  }

  createBook(): void {
    this.bookService
      .createBook({
        title: this.bookFormGroup.value.title,
        description: this.bookFormGroup.value.description,
        author: this.bookFormGroup.value.author,
      })
      .pipe(
        tap(() => {
          this.bookFormGroup.reset();
          this.router.navigate(['/books']);
        }),
        catchError((err: HttpErrorResponse) => {
          if (err.error.message) {
            this.errorMessages = err.error.message;
          } else {
            this.errorMessages = [
              'There was an unknown error. Please try again.',
            ];
          }

          return of({});
        })
      )
      .subscribe();
  }

  editBook(): void {
    if (!this.book) {
      return;
    }

    this.bookService
      .editBook(this.book._id, {
        title: this.bookFormGroup.value.title,
        description: this.bookFormGroup.value.description,
        author: this.bookFormGroup.value.author,
      })
      .pipe(
        tap(() => {
          this.bookFormGroup.reset();
          this.router.navigate(['/books']);
        }),
        catchError((err: HttpErrorResponse) => {
          if (err.error.message) {
            this.errorMessages = err.error.message;
          } else {
            this.errorMessages = [
              'There was an unknown error. Please try again.',
            ];
          }

          return of({});
        })
      )
      .subscribe();
  }
}
