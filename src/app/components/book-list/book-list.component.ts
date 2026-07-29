import { Component, computed, effect, inject, viewChild } from '@angular/core';
import { BooksService } from '../../services/books.service';
import { Router } from '@angular/router';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { IBook } from '../../models/books.model';
import { MatDialog } from '@angular/material/dialog';
import { BookFormComponent } from '../book-form/book-form.component';
import { XmlService } from '../../services/xml.service';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-book-list',
  imports: [
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
  ],
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

  readonly dataSource = new MatTableDataSource<IBook>();
  readonly sort = viewChild(MatSort);

  constructor() {
    effect(() => {
      this.dataSource.data = this.booksService.books();
    });

    effect(() => {
      const sort = this.sort();

      if (sort) {
        this.dataSource.sort = sort;
      }
    });

    this.dataSource.sortData = this.sortBooks.bind(this);

    this.dataSource.filterPredicate = (book, filter) =>
      book.bookTitle.toLowerCase().includes(filter);
  }

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
    this.xmlService.importXml(event);
  }

  searchBooks(value: string): void {
    this.dataSource.filter = value.trim().toLowerCase();
  }

  private sortBooks(data: IBook[], sort: Sort): IBook[] {
    if (sort.active !== 'bookAuthor' || !sort.direction) {
      return [...data];
    }

    const direction: 1 | -1 = sort.direction === 'asc' ? 1 : -1;

    return [...data].sort((a, b) => this.compareBooks(a, b, direction));
  }

  private compareBooks(a: IBook, b: IBook, direction: 1 | -1): number {
    const author = a.bookAuthor.localeCompare(b.bookAuthor, undefined, { sensitivity: 'base' });

    if (author !== 0) {
      return author * direction;
    }

    return a.bookTitle.localeCompare(b.bookTitle, undefined, { sensitivity: 'base' }) * direction;
  }
}
