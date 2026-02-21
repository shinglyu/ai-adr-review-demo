/**
 * Author Model
 */
export interface Author {
  id: string;
  name: string;
  email: string;
  bio?: string;
  birthDate?: string;
  deathDate?: string;
}

export const exampleAuthor: Author = {
  id: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
  name: "F. Scott Fitzgerald",
  email: "fitzgerald@example.com",
  bio: "American novelist and short story writer",
  birthDate: "1896-09-24",
  deathDate: "1940-12-21"
};
