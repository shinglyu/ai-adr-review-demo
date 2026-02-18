/**
 * Author Model
 * Uses UUID for better scalability
 */
export interface Author {
  id: string;  // UUID for unique identification
  name: string;
  email: string;
  bio?: string;
  born?: Date;
  deceased?: Date;
}

/**
 * Example of an author object
 */
export const exampleAuthor: Author = {
  id: "550e8400-e29b-41d4-a716-446655440000",
  name: "F. Scott Fitzgerald",
  email: "fitzgerald@example.com",
  bio: "American novelist and short story writer",
  born: new Date("1896-09-24"),
  deceased: new Date("1940-12-21")
};
