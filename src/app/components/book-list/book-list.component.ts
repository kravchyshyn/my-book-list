import { Component, computed, inject, OnInit } from '@angular/core';
import { BooksService } from '../../services/books.service';
import { Router } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AddBookComponent } from '../add-book/add-book.component';
import { IBook } from '../../models/books.model';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-book-list',
  imports: [MatTableModule, MatButtonModule, MatIconModule],
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.css',
})
export class BookListComponent implements OnInit {
  private dialog = inject(MatDialog);
  private booksService = inject(BooksService);
  private router = inject(Router);

  readonly displayedColumns = ['bookTitle', 'bookAuthor', 'pages', 'actions'];

  readonly books = computed(() => this.booksService.books());

  public ngOnInit() {
    console.log('---------------->', this.booksService.books());
  }

  openAddDialog(): void {
    this.dialog.open(AddBookComponent, {
      width: '500px',
    });
  }

  openEditDialog(book: IBook): void {
    this.dialog.open(AddBookComponent, {
      width: '500px',
      data: book,
    });
  }

  addBook() {
    this.router.navigate(['add-book']);
  }

  deleteBook(id: string) {
    this.booksService.deleteBook(id);
  }

  editBook(id: string) {
    console.log('edit', id);
  }
}
