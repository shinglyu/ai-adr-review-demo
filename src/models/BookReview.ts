/**
 * BookReview Model
 * Compliant with ADR-0001: Uses numeric ID
 */
export interface BookReview {
  id: number;      // ✅ Compliant with ADR-0001: Numeric IDs
  bookId: number;
  rating: number;  // 1-5 stars
  comment: string;
}
