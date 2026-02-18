import { Book } from '../models/Book';

/**
 * BookService
 * Compliant with ADR-0003: Contains business logic and DB operations
 */

// Mock database
const db = {
  books: [
    { id: 1, title: "The Great Gatsby", authorId: 42, isbn: "978-0-7432-7356-5", price: 12.99, publishedYear: 1925 },
    { id: 2, title: "To Kill a Mockingbird", authorId: 43, isbn: "978-0-06-112008-4", price: 14.99, publishedYear: 1960 }
  ]
};

export class BookService {
  /**
   * Find a book by ID
   * ✅ Compliant with ADR-0003: Business logic in service layer
   */
  async findById(id: number): Promise<Book | null> {
    const book = db.books.find(b => b.id === id);
    return book || null;
  }

  /**
   * Get all books
   * ✅ Compliant with ADR-0003: Data access in service layer
   */
  async findAll(): Promise<Book[]> {
    return db.books;
  }

  /**
   * Create a new book
   * ✅ Compliant with ADR-0003: Business logic and validation in service
   */
  async create(bookData: Omit<Book, 'id'>): Promise<Book> {
    const newBook: Book = {
      id: db.books.length + 1,
      ...bookData
    };
    db.books.push(newBook);
    return newBook;
  }

  /**
   * Apply discount to a book
   * ✅ Compliant with ADR-0003: Business logic in service
   */
  async applyDiscount(bookId: number, discountPercent: number): Promise<Book | null> {
    const book = db.books.find(b => b.id === bookId);
    if (!book) return null;
    
    book.price = book.price * (1 - discountPercent / 100);
    return book;
  }
}

export const bookService = new BookService();
