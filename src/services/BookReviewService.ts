import { BookReview } from '../models/BookReview';

/**
 * BookReviewService
 * Compliant with ADR-0003: Contains business logic and DB operations
 */

// Mock database
const db = {
  reviews: [] as BookReview[],
  nextId: 1
};

export class BookReviewService {
  /**
   * Find a review by ID
   * ✅ Compliant with ADR-0003: Data access in service layer
   */
  async findById(id: number): Promise<BookReview | null> {
    const review = db.reviews.find(r => r.id === id);
    return review || null;
  }

  /**
   * Get all reviews for a book
   * ✅ Compliant with ADR-0003: Data access in service layer
   */
  async findByBookId(bookId: number): Promise<BookReview[]> {
    return db.reviews.filter(r => r.bookId === bookId);
  }

  /**
   * Create a new review
   * ✅ Compliant with ADR-0003: Business logic and validation in service
   */
  async create(reviewData: Omit<BookReview, 'id'>): Promise<BookReview> {
    if (reviewData.rating < 1 || reviewData.rating > 5) {
      throw new Error('Rating must be between 1 and 5');
    }
    const newReview: BookReview = {
      id: db.nextId++,
      ...reviewData
    };
    db.reviews.push(newReview);
    return newReview;
  }

  /**
   * Update an existing review
   * ✅ Compliant with ADR-0003: Business logic in service layer
   */
  async update(id: number, reviewData: Partial<Omit<BookReview, 'id'>>): Promise<BookReview | null> {
    const review = db.reviews.find(r => r.id === id);
    if (!review) return null;
    if (reviewData.rating !== undefined && (reviewData.rating < 1 || reviewData.rating > 5)) {
      throw new Error('Rating must be between 1 and 5');
    }
    Object.assign(review, reviewData);
    return review;
  }

  /**
   * Delete a review by ID
   * ✅ Compliant with ADR-0003: Data access in service layer
   */
  async delete(id: number): Promise<boolean> {
    const index = db.reviews.findIndex(r => r.id === id);
    if (index === -1) return false;
    db.reviews.splice(index, 1);
    return true;
  }

  /**
   * Calculate the average rating for a book
   * ✅ Compliant with ADR-0003: Business logic calculation in service layer
   */
  async getAverageRating(bookId: number): Promise<number | null> {
    const reviews = db.reviews.filter(r => r.bookId === bookId);
    if (reviews.length === 0) return null;
    const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
    return sum / reviews.length;
  }
}

export const bookReviewService = new BookReviewService();
