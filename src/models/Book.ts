/**
 * Book Model
 * Compliant with ADR-0001: Uses numeric ID
 */
export interface Book {
  id: number;  // ✅ Compliant with ADR-0001: Numeric IDs
  title: string;
  authorId: number;
  isbn: string;
  price: number;
  publishedYear: number;
}

/**
 * Example of a compliant book object
 */
export const exampleBook: Book = {
  id: 1,
  title: "The Great Gatsby",
  authorId: 42,
  isbn: "978-0-7432-7356-5",
  price: 12.99,
  publishedYear: 1925
};
