import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { BooksService } from '../../services/books.service';
import { IBookPayload } from '../../models/books.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-book',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './add-book.component.html',
  styleUrl: './add-book.component.css',
})
export class AddBookComponent {
  private fb = inject(FormBuilder);
  private booksService = inject(BooksService);
  private router = inject(Router)

  form = this.fb.group({
    bookTitle: ['', [Validators.required, Validators.minLength(3)]],
    bookAuthor: ['', [Validators.required, Validators.minLength(3)]],
    pages: [1, [Validators.required, Validators.min(1), Validators.pattern(/^\d+$/)]],
  });

  onSave() {
    console.log(this.form.value);

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.booksService.addBook(this.form.value as IBookPayload);
    this.router.navigate(['/book-list']);



    // this.form.reset({
    //   bookTitle: '',
    //   bookAuthor: '',
    //   pages: 1
    // })
  }
}
