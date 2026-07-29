import { inject, Injectable } from '@angular/core';
import { IBook } from '../models/books.model';
import { BooksService } from './books.service';

@Injectable({
  providedIn: 'root',
})
export class XmlService {
  booksService = inject(BooksService);

  exportXml(books: IBook[]) {
    const xml = this.generateXml(books);
    const blob = new Blob([xml], {
      type: 'application/xml',
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = 'books.xml';
    link.click();

    URL.revokeObjectURL(url);
  }

  importXml(event: Event) {
    const input = event.target as HTMLInputElement;

    if (!input.files?.length) {
      return;
    }

    const file = input.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      const xml = reader.result as string;

      const books = this.parseXml(xml);

      this.booksService.setBooks(books); // або this.books.set(books)
    };

    reader.readAsText(file);

    input.value = '';
  }

  generateXml(books: IBook[]): string {
    const booksXml = books
      .map(
        (book) => `
        <book id="${book.id}">
          <title>${escapeText(book.bookTitle)}</title>
          <author>${escapeText(book.bookAuthor)}</author>
          <pages>${book.pages}</pages>
        </book>`,
      )
      .join('');

    return `<?xml version="1.0" encoding="UTF-8"?><books>${booksXml}</books>`;
  }

  private parseXml(xml: string): IBook[] {
    const parser = new DOMParser();
    const document = parser.parseFromString(xml, 'application/xml');

    const parserError = document.querySelector('parsererror');

    if (parserError) {
      throw new Error('Invalid XML');
    }

    return Array.from(document.getElementsByTagName('book')).map(book => ({
      id: book.getAttribute('id') ?? crypto.randomUUID(),
      bookTitle: book.querySelector('title')?.textContent ?? '',
      bookAuthor: book.querySelector('author')?.textContent ?? '',
      pages: Number(book.querySelector('pages')?.textContent ?? 0),
    }));
  }
}

function escapeText(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}
