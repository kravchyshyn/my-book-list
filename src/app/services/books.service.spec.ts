import { TestBed } from '@angular/core/testing';
import { describe, beforeEach, expect, it } from 'vitest';
import { BooksService } from './books.service';
import { IBook } from '../models/books.model';

describe('BooksService', () => {
  let service: BooksService;
  const books: IBook[] = [
    {
      id: '1',
      bookTitle: 'The Shining',
      bookAuthor: 'Stephen King',
      pages: 447,
    },
    {
      id: '2',
      bookTitle: '1984',
      bookAuthor: 'George Orwell',
      pages: 328,
    },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({});

    service = TestBed.inject(BooksService);
  });

  it('should create service', () => {
    expect(service).toBeTruthy();
  });

  it('should set books into array', () => {
    service.setBooks(books);

    expect(service.books()).toEqual(books);
  });

  it('should edit existing book', () => {
    service.setBooks(books);

    service.editBook({
      id: '1',
      bookTitle: 'The Shining (Updated)',
      bookAuthor: 'Stephen King',
      pages: 500,
    });

    expect(service.books()[0]).toEqual({
      id: '1',
      bookTitle: 'The Shining (Updated)',
      bookAuthor: 'Stephen King',
      pages: 500,
    });

    expect(service.books()[1]).toEqual(books[1]);
  });

  it('should delete a book', () => {
    service.setBooks(books);
    service.deleteBook('1');

    expect(service.books()).toEqual([books[1]]);
  });

  it('should clear books list', () => {
    service.setBooks(books);
    service.clearBooksList();

    expect(service.books()).toEqual([]);
  });

  it('should not edit book when id does not exist', () => {
    service.setBooks(books);
    service.editBook({
      id: '999',
      bookTitle: 'Unknown',
      bookAuthor: 'Unknown',
      pages: 1,
    });

    expect(service.books()).toEqual(books);
  });

  it('should not delete book when id does not exist', () => {
    service.setBooks(books);
    service.deleteBook('999');

    expect(service.books()).toEqual(books);
  });
});
