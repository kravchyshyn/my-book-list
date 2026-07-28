import { Injectable, signal } from '@angular/core';
import { IBook, IBookPayload } from '../models/books.model';

@Injectable({
  providedIn: 'root',
})
export class BooksService {
  books = signal<IBook[]>([]);

  setBooks(books: IBook[] = []) {
    this.books.set(books);
  }

  addBook(book: IBookPayload) {
    this.books.update(
      books => [...books, {
        id: crypto.randomUUID(),
        ...book
      }]
    )
  }

  editBook(updatedBook: IBook): void {
    this.books.update(books =>
      books.map(book =>
        book.id === updatedBook.id ? updatedBook : book
      )
    );
  }

  deleteBook(id: string): void {
    this.books.update(books =>
      books.filter(book => book.id !== id)
    );
  }

  clearBooksList(): void {
    this.books.set([]);
  }
}
