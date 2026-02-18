import { Author } from '../models/Author';

/**
 * AuthorService
 * Compliant with ADR-0003: Contains business logic and DB operations
 */

// Mock database
const db: {
  authors: Author[];
} = {
  authors: [
    { 
      id: "550e8400-e29b-41d4-a716-446655440000", 
      name: "F. Scott Fitzgerald", 
      email: "fitzgerald@example.com", 
      bio: "American novelist",
      born: new Date("1896-09-24"),
      deceased: new Date("1940-12-21")
    },
    { 
      id: "6ba7b810-9dad-11d1-80b4-00c04fd430c8", 
      name: "Harper Lee", 
      email: "lee@example.com", 
      bio: "American novelist",
      born: new Date("1926-04-28"),
      deceased: new Date("2016-02-19")
    }
  ]
};

export class AuthorService {
  /**
   * Find an author by ID
   * ✅ Compliant with ADR-0003: Data access in service layer
   */
  async findById(id: string): Promise<Author | null> {
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
    // Generate a simple UUID (v4-like)
    const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
    
    const newAuthor: Author = {
      id: uuid,
      ...authorData
    };
    db.authors.push(newAuthor);
    return newAuthor;
  }
}

export const authorService = new AuthorService();
