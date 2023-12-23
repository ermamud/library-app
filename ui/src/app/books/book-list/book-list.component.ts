import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { Book, BookFilter, BookResult } from 'src/app/types';
import { BookService } from '../book.service';
import { DeleteModalComponent } from '../delete-modal/delete-modal.component';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss'],
})
export class BookListComponent implements OnInit {
  books$: Observable<BookResult>;
  sortByField: string = 'createdAt';
  currentFilter: BookFilter = {
    skip: 0,
    take: 10,
    sortField: '',
    search: '',
  };
  page = 1;
  pageSize = 10;
  isAuth$: Observable<boolean>;

  constructor(
    private bookService: BookService,
    private authService: AuthService,
    private modalService: NgbModal,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isAuth$ = this.authService.isAuth;
    this.getBooks();
  }

  getBooks(): void {
    this.books$ = this.bookService.getAllBooks(this.currentFilter);
  }

  onChangeSorting(selected: string): void {
    this.sortByField = selected;
    this.currentFilter.sortField = selected;

    this.getBooks();
  }

  onSubmit(form: NgForm): void {
    const search = form.value.search;
    this.currentFilter.search = search;

    this.getBooks();
  }

  onPageChange(page: number): void {
    this.page = page;

    this.currentFilter.skip = (page - 1) * this.pageSize;
    this.currentFilter.take = this.pageSize;

    this.getBooks();
  }

  onDelete(selectedBook: Book): void {
    const modalRef = this.modalService.open(DeleteModalComponent);
    modalRef.componentInstance.book = selectedBook;

    modalRef.componentInstance.deleteEvent.subscribe((confirmDelete) => {
      if (confirmDelete) {
        this.deleteBook(selectedBook._id);
      }
    });
  }

  deleteBook(id: string): void {
    this.bookService.deleteBook(id).subscribe(() => {
      this.getBooks();
    });
  }

  goToNewBook(): void {
    this.router.navigate(['books/new']);
  }

  goToEditBook(id: string): void {
    this.router.navigate([`books/edit/${id}`]);
  }

  resetFilters(): void {
    this.currentFilter = {
      skip: 0,
      take: 10,
      sortField: 'createdAt',
      search: '',
    };

    this.getBooks();
  }
}
