export interface IBook {
  id: string;
  bookTitle: string;
  bookAuthor: string;
  pages: number;
}

export type IBookPayload = Omit<IBook, 'id'>;
