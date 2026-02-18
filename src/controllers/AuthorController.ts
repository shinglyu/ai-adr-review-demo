import { authorService } from '../services/AuthorService';

/**
 * AuthorController
 * ✅ Compliant with ADR-0002: Uses response envelope { data: ... }
 * ✅ Compliant with ADR-0003: Delegates to service layer
 */
export class AuthorController {
  /**
   * GET /authors/:id
   * ✅ Returns data wrapped in envelope
   * ✅ Delegates to service
   */
  async getAuthor(req: any, res: any) {
    const authorId = req.params.id;  // Now using UUID strings
    const author = await authorService.findById(authorId);
    
    if (!author) {
      return res.status(404).json({ 
        data: null,
        error: 'Author not found' 
      });
    }
    
    // ✅ Compliant with ADR-0002: Response wrapped in { data: ... }
    res.json({ data: author });
  }

  /**
   * GET /authors
   * ✅ Returns data wrapped in envelope
   * ✅ Delegates to service
   */
  async getAllAuthors(req: any, res: any) {
    const authors = await authorService.findAll();
    
    // ✅ Compliant with ADR-0002: Response wrapped in { data: ... }
    res.json({ data: authors });
  }

  /**
   * POST /authors
   * ✅ Returns data wrapped in envelope
   * ✅ Delegates to service
   */
  async createAuthor(req: any, res: any) {
    const newAuthor = await authorService.create(req.body);
    
    // ✅ Compliant with ADR-0002: Response wrapped in { data: ... }
    res.status(201).json({ data: newAuthor });
  }
}

export const authorController = new AuthorController();
