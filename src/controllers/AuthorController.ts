import { authorService } from '../services/AuthorService';

/**
 * AuthorController
 */
export class AuthorController {
  /**
   * GET /authors/:id
   */
  async getAuthor(req: any, res: any) {
    const authorId = req.params.id;
    const author = await authorService.findById(authorId);
    
    if (!author) {
      return res.status(404).json({ 
        data: null,
        error: 'Author not found' 
      });
    }
    
    res.json({ data: author });
  }

  /**
   * GET /authors
   */
  async getAllAuthors(req: any, res: any) {
    const authors = await authorService.findAll();
    res.json({ data: authors });
  }

  /**
   * POST /authors
   */
  async createAuthor(req: any, res: any) {
    const newAuthor = await authorService.create(req.body);
    res.status(201).json({ data: newAuthor });
  }
}

export const authorController = new AuthorController();
