import { randomUUID } from 'crypto';
import { Author } from '../models/Author';

/**
 * AuthorService
 */

// Mock database
const db: { authors: Author[] } = {
  authors: [
    { id: "a1b2c3d4-e5f6-7890-abcd-ef1234567890", name: "F. Scott Fitzgerald", email: "fitzgerald@example.com", bio: "American novelist", birthDate: "1896-09-24", deathDate: "1940-12-21" },
    { id: "b2c3d4e5-f6a7-8901-bcde-f12345678901", name: "Harper Lee", email: "lee@example.com", bio: "American novelist", birthDate: "1926-04-28", deathDate: "2016-02-19" }
  ]
};

export class AuthorService {
  /**
   * Find an author by ID
   */
  async findById(id: string): Promise<Author | null> {
    const author = db.authors.find(a => a.id === id);
    return author || null;
  }

  /**
   * Get all authors
   */
  async findAll(): Promise<Author[]> {
    return db.authors;
  }

  /**
   * Create a new author
   */
  async create(authorData: Omit<Author, 'id'>): Promise<Author> {
    const newAuthor: Author = {
      id: randomUUID(),
      ...authorData
    };
    db.authors.push(newAuthor);
    return newAuthor;
  }
}

export const authorService = new AuthorService();
