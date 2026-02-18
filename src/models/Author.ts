/**
 * Author Model
 * Compliant with ADR-0001: Uses numeric ID
 */
export interface Author {
  id: number;  // ✅ Compliant with ADR-0001: Numeric IDs
  name: string;
  email: string;
  bio?: string;
}

/**
 * Example of a compliant author object
 */
export const exampleAuthor: Author = {
  id: 42,
  name: "F. Scott Fitzgerald",
  email: "fitzgerald@example.com",
  bio: "American novelist and short story writer"
};
