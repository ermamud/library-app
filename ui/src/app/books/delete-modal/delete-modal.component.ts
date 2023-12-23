import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Book } from 'src/app/types';

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.scss'],
})
export class DeleteModalComponent {
  @Input()
  book: Book;

  @Output()
  deleteEvent = new EventEmitter<boolean>();

  constructor(public activeModal: NgbActiveModal) {}

  clickEvent(confirmDelete: boolean) {
    this.deleteEvent.emit(confirmDelete);
    this.activeModal.close();
  }
}
