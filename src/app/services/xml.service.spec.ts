import { TestBed } from '@angular/core/testing';
import { describe, beforeEach, afterEach, expect, it, vi } from 'vitest';

import { XmlService } from './xml.service';
import { BooksService } from './books.service';
import { IBook } from '../models/books.model';

describe('XmlService', () => {
  let service: XmlService;

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
    vi.restoreAllMocks();

    TestBed.configureTestingModule({});

    service = TestBed.inject(XmlService);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  it('should generate xml', () => {
    const xml = service.generateXml(books);

    expect(xml).toContain('<?xml version="1.0" encoding="UTF-8"?>');
    expect(xml).toContain('<books>');
    expect(xml).toContain('<book id="1">');
    expect(xml).toContain('<title>The Shining</title>');
    expect(xml).toContain('<author>Stephen King</author>');
    expect(xml).toContain('<pages>447</pages>');
  });

  it('should escape xml special characters', () => {
    const xml = service.generateXml([
      {
        id: '1',
        bookTitle: 'A&B <Test>',
        bookAuthor: '"John"',
        pages: 100,
      },
    ]);

    expect(xml).toContain('A&amp;B &lt;Test&gt;');
    expect(xml).toContain('&quot;John&quot;');
  });
});
