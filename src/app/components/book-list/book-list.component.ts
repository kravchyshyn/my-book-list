import { Component, computed, inject, OnInit } from '@angular/core';
import { BooksService } from '../../services/books.service';
import { Router } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { IBook } from '../../models/books.model';
import { MatDialog } from '@angular/material/dialog';
import { BookFormComponent } from '../book-form/book-form.component';
import { XmlService } from '../../services/xml.service';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-book-list',
  imports: [MatTableModule, MatButtonModule, MatIconModule, HeaderComponent],
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.css',
})
export class BookListComponent {
  private dialog = inject(MatDialog);
  private booksService = inject(BooksService);
  private xmlService = inject(XmlService);
  private router = inject(Router);

  readonly displayedColumns = ['bookTitle', 'bookAuthor', 'pages', 'actions'];

  readonly books = computed(() => this.booksService.books());

  openEditDialog(book: IBook): void {
    this.dialog.open(BookFormComponent, {
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

  saveBooks() {
    this.xmlService.exportXml(this.books());
  }

  clearList() {
    this.booksService.clearBooksList();
  }

  importBooks(event: Event) {
    this.xmlService.importXml(event)
  }
}
