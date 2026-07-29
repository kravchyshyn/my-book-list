import { Component, inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { BooksService } from '../../services/books.service';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { IBook, IBookPayload } from '../../models/books.model';
import { noWhitespaceValidator } from '../../validators/nowhitespace.validator';

@Component({
  selector: 'app-book-form',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './book-form.component.html',
  styleUrl: './book-form.component.css',
})
export class BookFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private booksService = inject(BooksService);
  private dialogRef = inject(MatDialogRef<BookFormComponent>);
  readonly data = inject(MAT_DIALOG_DATA, { optional: true }) as IBook | null;

  form = this.fb.group({
    bookTitle: ['', [Validators.required, Validators.minLength(3), noWhitespaceValidator]],
    bookAuthor: ['', [Validators.required, Validators.minLength(3), noWhitespaceValidator]],
    pages: [1, [Validators.required, Validators.min(1), Validators.pattern(/^\d+$/)]],
  });

  readonly isEditMode = !!this.data;

  public ngOnInit() {
    if (this.data) {
      this.form.patchValue({
        bookTitle: this.data.bookTitle,
        bookAuthor: this.data.bookAuthor,
        pages: this.data.pages,
      });
    }
  }

  save() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const payload: IBookPayload = this.form.value as IBookPayload;

    if (this.isEditMode) {
      this.booksService.editBook({
        ...this.data!,
        ...payload,
      });
    } else {
      this.booksService.addBook(payload);
    }

    this.dialogRef.close(true);
  }


  dismiss() {
    this.dialogRef.close(false);
  }
}
