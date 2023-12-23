export type Book = {
  _id: string;
  title: string;
  description: string;
  author: string;
  createdAt: Date;
};

export type BookResult = {
  books: Book[];
  total: number;
};

export type BookFilter = {
  skip: number;
  take: number;
  sortField?: string;
  search?: string;
};

export type BookCRUD = {
  title: string;
  description: string;
  author: string;
};
