import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./components/home/home.component').then(m => m.HomeComponent),
  },
  {
    path: 'book-list',
    loadComponent: () =>
      import('./components/book-list/book-list.component').then(m => m.BookListComponent),
  },
  {
    path: 'add-book',
    loadComponent: () =>
      import('./components/add-book/add-book.component').then(m => m.AddBookComponent),
  },
  {
    path: 'edit-book',
    loadComponent: () =>
      import('./components/edit-book/edit-book.component').then(m => m.EditBookComponent),
  },
];
