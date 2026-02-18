import { bookService } from '../services/BookService';

/**
 * BookController
 * ✅ Compliant with ADR-0002: Uses response envelope { data: ... }
 * ✅ Compliant with ADR-0003: Delegates to service layer
 */
export class BookController {
  /**
   * GET /books/:id
   * ✅ Returns data wrapped in envelope
   * ✅ Delegates to service
   */
  async getBook(req: any, res: any) {
    const bookId = parseInt(req.params.id);
    const book = await bookService.findById(bookId);
    
    if (!book) {
      return res.status(404).json({ 
        data: null,
        error: 'Book not found' 
      });
    }
    
    // ✅ Compliant with ADR-0002: Response wrapped in { data: ... }
    res.json({ data: book });
  }

  /**
   * GET /books
   * ✅ Returns data wrapped in envelope
   * ✅ Delegates to service
   */
  async getAllBooks(req: any, res: any) {
    const books = await bookService.findAll();
    
    // ✅ Compliant with ADR-0002: Response wrapped in { data: ... }
    res.json({ data: books });
  }

  /**
   * POST /books
   * ✅ Returns data wrapped in envelope
   * ✅ Delegates to service
   */
  async createBook(req: any, res: any) {
    const newBook = await bookService.create(req.body);
    
    // ✅ Compliant with ADR-0002: Response wrapped in { data: ... }
    res.status(201).json({ data: newBook });
  }
}

export const bookController = new BookController();
