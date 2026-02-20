import { Author } from '../models/Author';

/**
 * AuthorService
 * Compliant with ADR-0003: Contains business logic and DB operations
 */

// Mock database
const db: { authors: Author[] } = {
  authors: [
    { id: 42, name: "F. Scott Fitzgerald", email: "fitzgerald@example.com", bio: "American novelist", birthDate: "1896-09-24", deathDate: "1940-12-21" },
    { id: 43, name: "Harper Lee", email: "lee@example.com", bio: "American novelist", birthDate: "1926-04-28", deathDate: "2016-02-19" }
  ]
};

export class AuthorService {
  /**
   * Find an author by ID
   * ✅ Compliant with ADR-0003: Data access in service layer
   */
  async findById(id: number): Promise<Author | null> {
    const author = db.authors.find(a => a.id === id);
    return author || null;
  }

  /**
   * Get all authors
   * ✅ Compliant with ADR-0003: Data access in service layer
   */
  async findAll(): Promise<Author[]> {
    return db.authors;
  }

  /**
   * Create a new author
   * ✅ Compliant with ADR-0003: Business logic in service
   */
  async create(authorData: Omit<Author, 'id'>): Promise<Author> {
    const newAuthor: Author = {
      id: db.authors.length + 1,
      ...authorData
    };
    db.authors.push(newAuthor);
    return newAuthor;
  }
}

export const authorService = new AuthorService();
