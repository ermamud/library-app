import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BookCreateComponent } from './book-create/book-create.component';
import { BookListComponent } from './book-list/book-list.component';
import { BookRoutingModule } from './book-routing.module';
import { BookService } from './book.service';
import { DeleteModalComponent } from './delete-modal/delete-modal.component';
import { BooksResolver } from './resolvers/books.resolver';

@NgModule({
  imports: [
    CommonModule,
    BookRoutingModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
  ],
  declarations: [BookListComponent, BookCreateComponent, DeleteModalComponent],
  providers: [BookService, BooksResolver],
})
export class BooksModule {}
